public with sharing class GenrateOpportunityToExcelController {
    @AuraEnabled
    public static List<Opportunity> getopportunity( Id recordId){

        System.debug('recordId-->'+recordId);
        List<Opportunity> lstOpportunity = [SELECT id ,name,Account.Name 
                                            FROM Opportunity 
                                            WHERE Id =: recordId];
        System.debug('lstOpportunity-->'+lstOpportunity);
        return lstOpportunity;
    }

    @AuraEnabled
    public static String insertexcel(String xlsdata,String recordId, String filename) {
        system.debug('xlsdata---'+xlsdata);
        system.debug('filename---'+filename);
        system.debug('recordId---'+recordId);
        
        Integer Count = [SELECT count() FROM ContentDocumentLink WHERE LinkedEntityId =:recordId];
        system.debug('Count--'+Count);
        Count++;
        filename = filename + ' Version '+ Count;   
        system.debug('filename--'+filename);
        ContentVersion cv = createContentVersion(xlsdata, filename);
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cv == null || cdl == null) { return null; }
        system.debug('cdl.Id--'+cdl.Id);
        return cdl.Id;
    }

    public static ContentVersion createContentVersion(String base64, String filename) {
        //PageReference FA_page = new PageReference('/apex/GenerateQuoteXLS');
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64);
        cv.Title = filename;    
        cv.Description = 'Architect Files';
        cv.PathOnClient = 'Opprtunity.xls';
        try {
            insert cv;
            return cv;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
    public static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { return null; }
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =: contentVersionId].ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        cdl.ShareType = 'V';
        try {
            insert cdl;
            return cdl;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
}