public with sharing class AccountController {
    @auraEnabled(cacheable=true)
    public static list<Account> getAccList(){
        return[select Id, Name, Phone FROM Account order by CreatedDate desc Limit 10];
    } 
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccountList(String keyword){
        String key='%'+keyword+'%';
        return [select Id, Name,Phone FROM ACCOUNT WHERE Name LIKE:keyword ORDER BY CreatedDate desc Limit 10];
    }
    @AuraEnabled(cacheable=true)
    public static  Account getSingleAccount(){
        return [select Id, Name,Phone FROM ACCOUNT ORDER BY CreatedDate desc Limit 1];
    }

    @AuraEnabled
    public static List<Account> getAccountLists() {
        return [SELECT Id, Name, Phone FROM Account WHERE Phone != null LIMIT 10];
    }

    // Method to get a list of Contacts with non-null Phone numbers and Email addresses
    @AuraEnabled
    public static List<Contact> getContactLists() {
        return [SELECT Id, Name, Phone, Email FROM Contact WHERE Phone != null AND Email != null LIMIT 10];
    }
        
}
