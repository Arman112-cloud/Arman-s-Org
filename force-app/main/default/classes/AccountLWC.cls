public with sharing class AccountLWC {
    @AuraEnabled(cacheable = true)
    public static list<Account> AccountLWC(){
        return [select Id, Name, Type, Rating, Phone, Website, AnnualRevenue from Account limit 5];
}

}