public with sharing class generatePDFfromVF {
    @AuraEnabled
    public static void generatePDFMethod(String recordId) {
        System.debug('recordId--------->'+ recordId);
        PageReference pdfPage = new PageReference('/apex/GenerateDeck?id=' + recordId);
        System.debug('pdfPage----------->' + pdfPage);
        Blob pdfBlob;
        pdfBlob = pdfPage.getContentAsPDF();
        System.debug('pdfBlob---------------->' + pdfBlob);
        
        ContentVersion cont = new ContentVersion();
        cont.Title = 'GeneratedPDF';
        cont.PathOnClient = 'GeneratedPDF.pdf';
        cont.FirstPublishLocationId = recordId;
        cont.VersionData = pdfBlob;
        cont.Origin = 'H';
        insert cont;


    }
}