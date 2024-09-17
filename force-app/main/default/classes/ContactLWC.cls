public with sharing class ContactLWC {
    @AuraEnabled
    public static list<Contact> ContactLWC() {
        return[SELECT Id, Name, Email, AccountId FROM Contact];
    }
}