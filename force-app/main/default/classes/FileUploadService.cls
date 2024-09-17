public with sharing class FileUploadService {
    public class ChunkData {
        @AuraEnabled public String parentId;
        @AuraEnabled public String fileName;
        @AuraEnabled public String base64Data;
        @AuraEnabled public String contentType;
        @AuraEnabled public String fileId;
    }

    @AuraEnabled
    public static String saveTheChunkFile(ChunkData chunk) {
        Blob fileBlob = EncodingUtil.base64Decode(chunk.base64Data);
        ContentVersion contentVersion = new ContentVersion();
        
        contentVersion.Title = chunk.fileName;
        contentVersion.VersionData = fileBlob;
        contentVersion.PathOnClient = chunk.fileName;
        contentVersion.FirstPublishLocationId = chunk.parentId;
        contentVersion.ContentLocation = 'S';

        insert contentVersion;

        return contentVersion.Id;
    }
}
