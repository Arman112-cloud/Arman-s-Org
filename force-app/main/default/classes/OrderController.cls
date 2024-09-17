global with sharing class OrderController {
	@AuraEnabled
	public static String getCalloutResponseContents() {

    String endpoint = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';
    String clientId = 'AfJUVsTuwJupgv-Eo_BTrxbNgYVbPs3d3xbcI7qjxiJpRWlEk1SffKXeYjojI-xYtNmXQElK0kwDyK9X'; // Replace with your actual client ID
    String clientSecret = 'EPXcophfcQxI2yDJ8BJFWavqLBcoZpAw9DyawNIF7IJCt-zId9P4F_TFHlPN5PJUqtnksZIY2VZ156TV'; // Replace with your actual client secret

    // Prepare the request body
    String requestBody = '{"intent":"CAPTURE","purchase_units":[{"amount":{"currency_code":"USD","value":"100.00"}}]}';

    // Encode client ID and secret for Basic Auth
    String auth = EncodingUtil.base64Encode(Blob.valueOf(clientId + ':' + clientSecret));

     // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
    HttpRequest req = new HttpRequest();
    req.setEndpoint('https://api-m.sandbox.paypal.com/v2/checkout/orders');
	req.setMethod('POST');
    req.setHeader('Authorization', 'Basic ' + auth);
    req.setHeader('Content-Type', 'application/json');
    req.setBody(requestBody);
        
    // Send the request, and return a response
    Http http = new Http();
        HttpResponse res;
        try {
            res = http.send(req);
            if (res.getStatusCode() == 201) {
                system.debug('Order created successfully: ' + res.getBody());
            } else {
                system.debug('Error creating order: ' + res.getBody());
            }
        } catch (Exception e) {
            system.debug('Error creating order: ' + e.getMessage());
        }
        
    return null;    
  }    
}