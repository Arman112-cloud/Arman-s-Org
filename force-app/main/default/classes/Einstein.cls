@isTest
public class TestOpportunityUpdate {
    
    @testSetup
    static void setup(){
        Account acc = new Account();
        acc.Name = 'Test Account';
        acc.Status__c = 'Prospect';
        insert acc;
        
        Opportunity opp = new Opportunity();
        opp.Name = 'Test Opportunity';
        opp.StageName = 'Prospecting';
        opp.CloseDate = Date.today().addDays(7);
        opp.AccountId = acc.Id;
        insert opp;
    }
    
    @isTest
    static void testUpdateStatusToClosedWon() {
        Opportunity opp = [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Prospecting' LIMIT 1];
        opp.StageName = 'Closed-Won';
        update opp;
        
        Account acc = [SELECT Id, Status__c FROM Account WHERE Name = 'Test Account' LIMIT 1];
        System.assertEquals('Active', acc.Status__c);
    }
    
    @isTest
    static void testUpdateStatusNoChange() {
        Opportunity opp = [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Prospecting' LIMIT 1];
        opp.StageName = 'Closed-Won';
        update opp;
        
        Opportunity opp2 = [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Closed-Won' LIMIT 1];
        opp2.StageName = 'Prospecting';
        update opp2;
        
        Account acc = [SELECT Id, Status__c FROM Account WHERE Name = 'Test Account' LIMIT 1];
        System.assertEquals('Prospect', acc.Status__c);
    }
    
    @isTest
    static void testUpdateStatusNotClosedWon() {
        Opportunity opp = [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Prospecting' LIMIT 1];
        opp.StageName = 'Closed-Lost';
        update opp;
        
        Account acc = [SELECT Id, Status__c FROM Account WHERE Name = 'Test Account' LIMIT 1];
        System.assertEquals('Prospect', acc.Status__c);
    }
    
    @isTest
    static void testUpdateBulkStatus() {
        List<Opportunity> opps = new List<Opportunity>();
        List<Account> accs = [SELECT Id, Status__c FROM Account WHERE Name = 'Test Account'];
        
        for(Account acc : accs){
            Opportunity opp = new Opportunity();
            opp.Name = 'Test Opportunity';
            opp.StageName = 'Prospecting';
            opp.CloseDate = Date.today().addDays(7);
            opp.AccountId = acc.Id;
            opps.add(opp);
        }
        
        insert opps;
        
        for(Opportunity opp : opps){
            opp.StageName = 'Closed-Won';
        }
        
        update opps;
        
        for(Account acc : accs){
            System.assertEquals('Active', acc.Status__c);
        }
    }
}