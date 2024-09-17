public with sharing class SFDX {
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountlist(){
            return [select Id, Name, Phone from account];
        }
    
}