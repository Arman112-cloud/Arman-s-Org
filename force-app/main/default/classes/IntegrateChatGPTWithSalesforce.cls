public with sharing class IntegrateChatGPTWithSalesforce {
    @AuraEnabled
    public static String getOpenAIResponse(String messageBody) {
    // to get the endpoint url and Access Token From Custom Meta Data
    IntegrateChatGPTWithSalesforce__mdt newIntegrateChatGPTWithSalesforce = [SELECT URL__c FROM IntegrateChatGPTWithSalesforce__mdt WHERE Label = 'endPoint' limit 1];
    
    System.debug('newIntegrateChatGPTWithSalesforce------------------------>'+ newIntegrateChatGPTWithSalesforce);
    
    String endPointUrl = newIntegrateChatGPTWithSalesforce.URL__c;
    String accessToken = getAccessToken(); // Retrieve access token securely
    
    System.debug('endPointUrl------------------>'+ endPointUrl);
    System.debug('accessToken------------------>'+ accessToken);

    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint(endPointUrl);
    request.setHeader('Content-Type', 'application/json');
    request.setHeader('Accept', 'application/json');
    request.setHeader('Authorization', 'Bearer' + accessToken);
    request.setMethod('POST');
    
    System.debug('http----------------------------->' + http);
    System.debug('request----------------------------->' + request);

    Map<String, Object> requestBody = new Map<String, Object>();
    // set this body to get the Response for the Question to Open AI

    requestBody.put('model', 'gpt-3.5-turbo');

    List<Map<String, Object>> messages = new List<Map<String, Object>>();

    Map<String, Object> message = new Map<String, Object>();
    message.put('role', 'user');
    //This is the Question to the Open Ai

    message.put('content', messageBody);
    messages.add(message);
    requestBody.put('messages', messages);

    System.debug('message-------------------------->'+message);

    String requestBodyJson = JSON.serialize(requestBody);
    request.setBody(requestBodyJson);

    HttpResponse response;

    System.debug('response---------------->'+ response);

    try {

        response = http.send(request);

        System.debug('request------------------------->'+request);

        if (response.getStatusCode() == 200) {
            FromJSON data = (FromJSON) JSON.deserialize(response.getBody(), FromJSON.class);

            System.debug('data---------------------->'+ data);

        if (data.choices != null && data.choices.size() > 0) {
            String content = data.choices[0].message.content;
            system.debug('content:' + content);
            return content;
        } else {
            return null;
        }
        } else {
            return null;
        }

        } catch (Exception ex) {
            System.debug('Exception:' + ex.getMessage());
        
        throw ex;
    }
}

    // Method to retrieve access token securely
    private static String getAccessToken() {
        IntegrateChatGPTWithSalesforce__mdt newIntegrateChatGPTWithSalesforce = [SELECT Access_token__c FROM IntegrateChatGPTWithSalesforce__mdt WHERE Label = 'endPoint' ];
        return newIntegrateChatGPTWithSalesforce.Access_token__c;
    }

    //Wrapper to handle the Api response from the Open Ai Tool

        public class FromJSON {
            public String id;
            public Integer created;
            public String model;
            public List<ClsChoices> choices;
            public ClsUsage usage;
        }

        public class ClsChoices {
            public Integer index;
            public ClsMessage message;
            public String finish_reason;
        }

        public class ClsMessage {
            public String role;
            public String content;
        }

        public class ClsUsage {
            public Integer prompt_tokens;
            public Integer completion_tokens;
            public Integer total_tokens;
        }

}