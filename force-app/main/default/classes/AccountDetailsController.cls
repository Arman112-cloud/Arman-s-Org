public with sharing class AccountDetailsController {
    
    @AuraEnabled
    public static List<OpportunityWrapper> getOpportunities(Id accountId) {
        list<Opportunity> Opportunities = [SELECT Id, Name FROM Opportunity WHERE AccountId = :accountId ];
        Set<Id> OppIds = new Set<Id>();
        for (Opportunity opp : Opportunities) {
            OppIds.add(opp.Id);
        }
        List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId IN: OppIds ];
            List<ID> fileIDs = new List<ID>();
            for (ContentDocumentLink docLink : files) {
                fileIDs.add(docLink.ContentDocumentId);
            }

            List<ContentDocumentLink> docs = [SELECT ContentDocumentId, ContentDocument.FileType, LinkedEntityId, ContentDocument.Title 
                 FROM ContentDocumentLink WHERE ContentDocumentId IN : fileIDs ];

            Map<ID, List<ContentDocumentLink>> mapIdTitle = new Map<ID, List<ContentDocumentLink>>();
            for (ContentDocumentLink docLink : docs) {
                    if (mapIdTitle.containsKey(docLink.LinkedEntityId)) {
                        List<ContentDocumentLink> cvList = mapIdTitle.get(docLink.LinkedEntityId);
    
                        cvList.add(docLink);
                        mapIdTitle.put(docLink.LinkedEntityId, cvList);
                        
                    }
                    else {
                        mapIdTitle.put(docLink.LinkedEntityId, new List<ContentDocumentLink> { docLink });
                    }
                } 
 
            List<OpportunityWrapper> OpportunityWrapperList = new List<OpportunityWrapper>();
            for(Opportunity opp : Opportunities){
                OpportunityWrapper OppWrap = new OpportunityWrapper();
                 OppWrap.opportunityId = opp.Id;
                 OppWrap.opportunityName = opp.Name;

                if(mapIdTitle.get(opp.Id) != null){
                    OppWrap.relatedFiles = mapIdTitle.get(opp.Id);

                    if(OppWrap.relatedFiles.size() > 4){OppWrap.viewAll = true;}
                    else{OppWrap.viewAll = false;}

                }    
                else {
                    OppWrap.relatedFiles = new List<ContentDocumentLink>();
                }
                OpportunityWrapperList.add(OppWrap);
            }
        return OpportunityWrapperList;
    }

    public class OpportunityWrapper {
        @AuraEnabled
        public Id opportunityId { get; set; }
        @AuraEnabled
        public String opportunityName { get; set; }
        @AuraEnabled
        public Boolean viewAll { get; set; }
        @AuraEnabled
        public List<ContentDocumentLink> relatedFiles { get; set; }
    }
}
