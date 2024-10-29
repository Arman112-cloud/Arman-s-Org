public class jobEmailController {
    
    @AuraEnabled
    public static void sendEmail(String email, String subject, String contentDocumentId) {
        try {
            // Create an Email Message
            OrgWideEmailAddress owea;
            
            List<OrgWideEmailAddress> oweaList = [
                SELECT Id, Address, DisplayName 
                FROM OrgWideEmailAddress 
                WHERE DisplayName = 'Arman Gadhiya'
                LIMIT 1
            ];
            
            // Check if the query returned any results
            if (!oweaList.isEmpty()) {
                owea = oweaList[0];
            } else {
                owea = null;
            }
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            
            if (owea != null) {
                mail.setOrgWideEmailAddressId(owea.Id);
            }
            //Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String emailBody = 
                '<html>' +
                '<body>' +
                '<p>Dear,</p>' +
                
                '<p>I am writing to express my interest in the Salesforce Developer position at your company as advertised. With 2 years of hands-on experience in developing and implementing Salesforce solutions, I am confident in my ability to contribute effectively to your team.</p>' +
                
                '<p>In my current role at NSIQ Infotech Pvt. Ltd., I have honed my skills in Salesforce development, focusing on customizing Salesforce platforms to meet the specific needs of our clients. My experience includes creating custom objects, Lightning Flow, Apex classes, triggers, Visualforce pages, Lightning web components, Sales Cloud, Service Cloud  as well as integrating Salesforce with other applications. Additionally, I have a strong understanding of Salesforce best practices and am adept at ensuring data integrity, security, and scalability.</p>' +
                
                '<p>Some highlights of my experience include:</p>' +
                '<ul>' +
                '<li>Successfully leading a project to automate complex business processes, resulting in a 30% increase in efficiency.</li>' +
                '<li>Developing and deploying custom Lightning components that enhanced user experience and increased adoption across the organization.</li>' +
                '<li>Collaborating with cross-functional teams to gather requirements and deliver solutions that align with business objectives.</li>' +
                '</ul>' +
                
                '<p>I am particularly excited about the opportunity to work at your company. I am eager to bring my technical expertise and problem-solving skills to your team and contribute to the continued success of your Salesforce initiatives.</p>' +
                
                '<p>Enclosed is my resume, which provides further details about my professional journey. I would welcome the opportunity to discuss how my background, skills, and certifications align with the needs of your team. Thank you for considering my application. I look forward to the possibility of contributing to the company and I am available at your earliest convenience for an interview.</p>' +
                
                '<p>Sincerely,<br>Arman Gadhiya<br>+91 8200215935</p>' +
                '</body>' +
                '</html>';
            
            mail.setToAddresses(new String[] { email });
            mail.setSubject(subject);
            mail.setHtmlBody(emailBody);
            
            // Add the attachment (ContentDocument)
            List<Messaging.EmailFileAttachment> attachments = new List<Messaging.EmailFileAttachment>();
            ContentVersion contentVersion = [SELECT VersionData, Title FROM ContentVersion WHERE ContentDocumentId = :contentDocumentId ORDER BY VersionNumber DESC LIMIT 1];
            
            if (contentVersion != null) {
                Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
                attachment.setFileName(contentVersion.Title);
                attachment.setBody(contentVersion.VersionData);
                attachment.setContentType('application/pdf');
                attachments.add(attachment);
            }
            mail.setFileAttachments(attachments);
            
            // Send Email
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            
        } catch (Exception ex) {
            throw new AuraHandledException('Error while sending email: ' + ex.getMessage());
        }
    }
}