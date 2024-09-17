public with sharing class wrapperTable {
    public wrapperTable() {

    }
    @AuraEnabled
    public static list<contactWrap> getContacts(){
        system.debug('method callled');
        Integer rowIndex = 0;
        list<contactWrap> conWrapList = new list<contactWrap>();
        try {
            list<Contact> conList = [select Id, lastName, Email, Phone from contact];
            system.debug('conList--------'+conList);
            //Database.update(conList);
            //system.debug('conlist'+conList);
            for (Contact c : conList) {
                conWrapList.add(new contactWrap(c.Id,c.lastName,c.Email,c.Phone,rowIndex));
                rowIndex++;
            }
            return conWrapList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static list<contactWrap> updateContacts(string contactId, string contactName, string contactEmail, string contactPhone) {
        list<contact> updateContactList = [select Id, lastName, Email, Phone from contact where Id = :contactId];
        List<Contact> finalUpdateList = new List<contact>();
        if (contactId != Null) {
            for(Contact conobj : updateContactList){
                // conobj.lastName = contactName;
                // conobj.Email = contactEmail;
                // conobj.Phone = contactPhone;

                if(contactName != null){
                    conobj.lastName = contactName;
                }
                if(contactEmail != null){
                    conobj.Email = contactEmail;
                }
                if(contactPhone != null){
                    conobj.Phone = contactPhone;
                }
            finalUpdateList.add(conobj);
            }
        }

        if(!finalUpdateList.isEmpty()){
            update finalUpdateList;
            system.debug('method callled');
            Integer rowIndex = 0;
            list<contactWrap> conWrapList = new list<contactWrap>();
          
                list<Contact> conList = [select Id, lastName, Email, Phone from contact];
                system.debug('conList--------'+conList);
                //Database.update(conList);
                //system.debug('conlist'+conList);
                for (Contact c : conList) {
                    conWrapList.add(new contactWrap(c.Id,c.lastName,c.Email,c.Phone,rowIndex));
                    rowIndex++;
                }
                return conWrapList;
            }
        
        return null;
    }
 
    

    public class contactWrap{
        @AuraEnabled
        public string Id {get;set;}
        @AuraEnabled
        public string lastName {get;set;}
        @AuraEnabled
        public string Email {get;set;}
        @AuraEnabled
        public string Phone {get;set;}
        @AuraEnabled
        public Boolean isEdited {get;set;}
        
        
        @AuraEnabled
        public Integer index {get;set;}
        public contactWrap(string Id, string lastName, string Email, string Phone, Integer index){
            this.Id = Id;
            this.lastName = lastName;
            this.Email = Email;
            this.Phone = Phone;
            this.isEdited = false;
            this.index = index;
        }
    }
}