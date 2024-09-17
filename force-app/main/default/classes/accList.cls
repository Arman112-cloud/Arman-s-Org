public with sharing class accList {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts() {
        return [Select Id, Name, Industry, Phone from Account Limit 10];
    }
}