public with sharing class AccountAddrs {
    @AuraEnabled (cacheable=true)
    public static void AccountAddrs() {
        list<Account> adrsList = [SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry 
        FROM Account] ;
    }
}