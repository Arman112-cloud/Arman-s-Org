import { LightningElement } from 'lwc';

export default class PurchaseOrderGenerator extends LightningElement {
    // Static data
    opList = [
        {
            CG_Number__c: 'PO123456',
            Client_Item_No_Sku__c: 'C12345',
            Factory__r: { Name: 'FactoryName' },
            City_Of_Origin__c: 'New York'
        }
    ];

    connectedCallback() {
        this.generateExcel();
    }

    generateExcel() {
        let doc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
        doc += '<head>';
        doc += '<meta charset="UTF-8" />';
        doc += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        doc += '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />';
        doc += '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet1</x:Name><x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->';
        doc += '</head>';
        
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td { border: 1px solid black; font-family: Times New Roman; border-collapse: collapse; }';
        doc += 'td { width: 100px; height: 21px; text-align: center; vertical-align: middle; }';
        doc += '</style>';

        doc += '<body>';
        
        // Begin table construction
        doc += '<table>';

        let GeneratePOExcelImageUrl = 'https://cityglobal--sandbox.sandbox.my.site.com/GeneratePOImg/file-asset/TEMPLATE_1096x375?v=1';

        // Add image row
        doc += '<tr>';
        doc += '<td colspan="9" style="height: 376px;"><img src="' + GeneratePOExcelImageUrl + '" alt="My Image" /></td>';
        doc += '</tr>';

        // Add purchase order details
        doc += '<tr>';
        doc += '<td><b>PURCHASE ORDER NO.</b></td>';
        doc += '<td>' + this.opList[0].CG_Number__c + '</td>';
        doc += '<td colspan="7"></td>';
        doc += '</tr>';

        doc += '<tr>';
        doc += '<td><b>CLIENT REFERENCE NO.</b></td>';
        doc += '<td>' + this.opList[0].Client_Item_No_Sku__c + '</td>';
        doc += '<td colspan="7"></td>';
        doc += '</tr>';

        // Date formatting
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        // Add date
        doc += '<tr>';
        doc += '<td><b>DATE</b></td>';
        doc += '<td>' + formattedDate + '</td>';
        doc += '<td colspan="7"></td>';
        doc += '</tr>';

        // Add more fields like ISSUED TO, CITY OF ORIGIN, etc.
        doc += '<tr>';
        doc += '<td><b>ISSUED TO</b></td>';
        doc += '<td>' + this.opList[0].Factory__r?.Name + '</td>';
        doc += '<td colspan="7"></td>';
        doc += '</tr>';

        doc += '<tr>';
        doc += '<td><b>CITY OF ORIGIN</b></td>';
        doc += '<td>' + this.opList[0].City_Of_Origin__c + '</td>';
        doc += '<td colspan="7"></td>';
        doc += '</tr>';

        doc += '</table>';
        doc += '</body>';
        doc += '</html>';

        // Convert the content into a Blob and trigger download
        let blob = new Blob([doc], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });

        // Create a download link and click it
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'PurchaseOrder.xls';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
