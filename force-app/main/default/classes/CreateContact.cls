public with sharing class CreateContact {
    @AuraEnabled
    public static void CreateContact(String Name, String Phone, String objId) {
        Contact con = new Contact();
        System.debug('Name---------->'+ Name);
        System.debug('Phone---------->'+ Phone);
        con.LastName = Name;
        con.Phone = Phone;
        con.AccountId = objId;
        insert con;
    }    
}