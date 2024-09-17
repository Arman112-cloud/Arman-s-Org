public with sharing class ApexHourWrapperClass {
    @AuraEnabled
    public static list<AccountListWrapper> getAccounts(){
        list<AccountListWrapper> acwrplst = new list<AccountListWrapper>();
        list<Account> aclst = [select name, phone from account limit 10];

        if(!aclst.isEmpty()){
            for(Account acc : aclst){
                AccountListWrapper acwrapper = new AccountListWrapper();
                acwrapper.accRecord = acc;
                acwrplst.add(acwrapper);
            }
        }
        return acwrplst;
    }
    public class AccountListWrapper{
        @AuraEnabled
        public Account accRecord {get;set;}
    }
}


