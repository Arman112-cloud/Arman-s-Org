public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static list<Account> AccountHelper() {
        return [select Id, Name, Type, Rating, Phone, Website, AnnualRevenue from account order by createddate desc limit 10];
    }
}