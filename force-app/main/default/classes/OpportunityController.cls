public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [SELECT Id, Name, Amount, Account.Name, Account.Id FROM Opportunity];
    }
}