public with sharing class GenerateTemplatePDF {
    public ApexPages.StandardController controller { get; set; }

    public GenerateTemplatePDF(ApexPages.StandardController controller) {
        this.controller = controller;
    }
    @AuraEnabled
    public static List<OpportunityListWrapper> getAllOpportunities(string recordId){
        System.debug('recordId--------------->'+recordId);
        List<OpportunityListWrapper> oppWrapperList = new List<OpportunityListWrapper>();
        List<Opportunity> oppList = [select Id, name, Account.name from Opportunity where Id = :recordId];

        
            for(Opportunity opp : oppList){
                OpportunityListWrapper oppWrapper = new OpportunityListWrapper();
                oppWrapper.oppRecord = opp;
                oppWrapper.Name = opp.Name;

                oppWrapperList.add(oppWrapper);
            }
        
        return oppWrapperList;
    }
   
    public class OpportunityListWrapper{
        @AuraEnabled
        public Opportunity oppRecord{get;set;}
        @AuraEnabled
        public string Name{get;set;}
    }
}