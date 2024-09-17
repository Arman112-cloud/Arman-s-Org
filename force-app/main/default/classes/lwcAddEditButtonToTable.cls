public with sharing class lwcAddEditButtonToTable {
    @AuraEnabled(cacheable=true)
    public static list<Contact> lwcAddEditButtonToTable() {
        return [select name, AccountId, Phone, Email from contact];
    }
}