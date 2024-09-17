public with sharing class updateContacts {
    @AuraEnabled
    public static list<Contact> updateContacts(string Id, string contactName, string contactEmail, string AccountName) {
        list<contact> updateContactList = new list<contact>();

        if (Id != Null) {
            contact conobj = new contact();
            conobj.Id = Id;
            conobj.Name = contactName;
            conobj.Email = contactEmail;
            conobj.Account.Name = AccountName;
            updateContactList.add(conobj);
        }

        if(!updateContactList.isEmpty()){
            update updateContactList;
            return updateContactList;
        }
    }
}