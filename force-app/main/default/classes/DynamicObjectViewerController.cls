public with sharing class DynamicObjectViewerController {

    @AuraEnabled(cacheable=true)
    public static List<ObjectFieldOption> getObjectOptions() {
        List<ObjectFieldOption> options = new List<ObjectFieldOption>();
        for (Schema.SObjectType obj : Schema.getGlobalDescribe().values()) {
            Schema.DescribeSObjectResult objDesc = obj.getDescribe();
            if (objDesc.isCustom() || objDesc.isAccessible()) {
                options.add(new ObjectFieldOption(objDesc.getLabel(), objDesc.getName()));
            }
        }
        return options;
    }

    @AuraEnabled(cacheable=true)
    public static List<ObjectFieldOption> getFieldOptions(String objectName) {
        if (String.isEmpty(objectName)) {
            throw new AuraHandledException('Object name is required.');
        }
        
        List<ObjectFieldOption> options = new List<ObjectFieldOption>();
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objectName);
        if (sObjectType == null) {
            throw new AuraHandledException('Invalid object name.');
        }

        Map<String, Schema.SObjectField> fields = sObjectType.getDescribe().fields.getMap();
        for (String fieldName : fields.keySet()) {
            Schema.DescribeFieldResult fieldDesc = fields.get(fieldName).getDescribe();
            if (fieldDesc.isAccessible()) {
                options.add(new ObjectFieldOption(fieldDesc.getLabel(), fieldDesc.getName()));
            }
        }
        return options;
    }

    @AuraEnabled(cacheable=true)
    public static List<SObject> fetchData(String objectName, String fields) {
        if (String.isEmpty(objectName) || String.isEmpty(fields)) {
            throw new AuraHandledException('Object name and fields are required.');
        }
        
        String query = 'SELECT ' + fields + ' FROM ' + objectName + ' LIMIT 10';
        try {
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching data: ' + e.getMessage());
        }
    }
}
