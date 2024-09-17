import { LightningElement, track } from "lwc";
//import getContactLists from "@salesforce/apex/ContactController.getContactLists";
//import getAccountLists from "@salesforce/apex/AccountController.getAccountLists";
import SheetJS from '@salesforce/resourceUrl/SheetJS'; // The static resource for SheetJS
export default class XlsxDemo extends LightningElement {
  @track xlsHeader = []; // store all the headers of the the tables
  @track workSheetNameList = []; // store all the sheets name of the the tables
  @track xlsData = []; // store all tables data
  @track filename = "nikhil_demo.xlsx"; // Name of the file
  @track accountData = []; // used only for storing account table
  @track contactData = []; // used only for storing contact table

  async connectedCallback() {
    await loadScript(this, SheetJS); // load the library
    // At this point, the library is accessible with the `XLSX` variable
    this.version = XLSX.version;
    console.log('version: '+this.version);      
    }
    exportToExcel() {
    // Sample table data for demonstration purposes
    let doc = '<head>';
    doc += '<meta charset="UTF-8" />'
    doc += '<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>'
    doc += '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'
    
    doc += '</head>';
    // Add styles for the table
    doc += '<style>';
    doc += 'table, th, td {';
    doc += 'border-color: #D3D3D3; font-family: Times New Roman;';
    doc += 'border-collapse: collapse;';
    doc += '}';
    doc += 'td {';
    doc += 'width: 100px; height: 21px;';
    doc += '}';

    doc += 'body {';
        doc += 'font-family: Time New Roman;';
        doc += '}';

    doc += 'a:link {';
    doc += 'color: red;';
    doc += 'font-family: Arial; ';
    doc += 'font-size: 10px;';
    doc += '}';
    
    doc += '</style>';

    doc += '<table border="1">';

    //var GeneratePOExcelImageUrl = GeneratePOExcel; //'https://cityglobal--sandbox.sandbox.my.site.com/GeneratePOImg/file-asset/GeneratePOExcel?v=1';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td colspan="9" style="height: 310px;">';
    //doc += '';
    //doc += `<img src="${GeneratePOExcelImageUrl}" alt="My Image" />`;
    doc += '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt; height: 15px;">';
    doc += '<td style="width: 180px;"><b>' + 'PURCHASE NO.' + '</b></td>';
    doc += '<td style="width: 95px; text-align: left;">' + 'this.opList[0].CG_Number__c ' + '</td>';
    doc += '<td style="width: 95px;">' + '' + '</td><td style="width: 95px;">' + '' + '</td><td style="width: 95px;">' + '' + '</td><td style="width: 95px;">' + '' + '</td><td style="width: 95px;">' + '' + '</td><td style="width: 95px;">' + '' + '</td><td style="width: 95px;">' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td style="text-align: left;"><b>' + 'CLIENT REF NO.' + '</b></td>';
    doc += '<td style="text-align: left;">' + `(this.opList[0].Client_Item_No_Sku__c !== undefined && this.opList[0].Client_Item_No_Sku__c !== null && !isNaN(this.opList[0].Client_Item_No_Sku__c) && this.opList[0].Client_Item_No_Sku__c !== '' ? this.opList[0].Client_Item_No_Sku__c : '')` + '</td>';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    var months = [
        "01", "02", "03", "04",
        "05", "06", "07", "08", "09",
        "10", "11", "12"
    ];

    // Array of day names
    var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    
    // Get the current date
    var currentDate = new Date();
    console.log('currentDate:', currentDate);

    // Extract components from the date
    var dayOfWeek = days[currentDate.getDay()];
    var day = currentDate.getDate();
    var monthName = months[currentDate.getMonth()];
    var year = currentDate.getFullYear();
    
    // Format the date
    var formattedDate = dayOfWeek + ' ' + monthName + '/' + day + '/' + year;

    doc += '<tr  style="font-size: 8pt; height: 15px;">';
    doc += '<td><b>' + 'DATE' + '</b></td>';
    doc += '<td style="text-align: left;">' + formattedDate + '</td>';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td><b>' + 'ISSUED TO:' + '</b></td>';
    doc += '<td style="text-align: left;">' + `(this.opList[0].Factory__r && this.opList[0].Factory__r.Name !== undefined && this.opList[0].Factory__r.Name !== null && this.opList[0].Factory__r.Name !== '' ? this.opList[0].Factory__r.Name : '')` + '</td>';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td><b>' + 'FACTORY COMPLETION DATE' + '</b></td>';
    doc += '<td style="text-align: left;">' + `(this.opList[0].Vendor_Mass_Prod_Days__c !== undefined && this.opList[0].Vendor_Mass_Prod_Days__c !== null && !isNaN(this.opList[0].Vendor_Mass_Prod_Days__c) && this.opList[0].Vendor_Mass_Prod_Days__c !== '' ? this.opList[0].Vendor_Mass_Prod_Days__c + ' DAYS' : '')` + '</td>';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';
    
    /*currentDate.setDate(currentDate.getDate() + parseInt(this.opList[0].Vendor_Mass_Prod_Days__c));
    console.log('updated date: ', currentDate);

    var formattedVendorMassProdDays = 
    days[currentDate.getDay()] + ' ' + 
    String(currentDate.getMonth() + 1).padStart(2, '0') + '/' + 
    String(currentDate.getDate()).padStart(2, '0') + '/' + 
    currentDate.getFullYear();

    console.log('formattedVendorMassProdDays:', formattedVendorMassProdDays);*/


    doc += '<tr style="font-size: 8pt; height: 15px;">';
    doc += '<td><b>' + 'MASS PRODUCTION' + '</b></td>';
    doc += '<td style="text-align: left;">' + 'formattedVendorMassProdDays' + '</td>';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td style="text-align: left;"><b>' + 'FACTORY PAYMENT TERMS' + '</b></td>';
    doc += '<td style="text-align: left;">' + `(this.opList[0].Factory_Terms__c ? this.opList[0].Factory_Terms__c : '')` + '</td>';
    
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td><b>' + 'DESCRIPTION:' + '</b></td>';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '<td><b>' + 'UNIT' + '</b></td>';
    doc += '<td><b>' + 'QTY' + '</b></td>';
    doc += '<td style="text-align: left;"><b>' + 'TOTAL' + '</b></td>';
    doc += '</tr>';

    var FINAL_FACTORY_UNIT_COST = `(this.opList[ 0 ].Final_Factory_Unit_Cost__c !== undefined ? this.opList[ 0 ].Final_Factory_Unit_Cost__c : 0.000) * (this.opList[ 0 ].Final_Factory_Unit_Cost__c !== undefined ? this.opList[ 0 ].Final_Factory_Unit_Cost__c : 0.000)`;
    var FINAL_FACTORY_TOTAL_COST = `(this.opList[ 0 ].Final_Factory_Total_Cost__c !== undefined ? this.opList[ 0 ].Final_Factory_Total_Cost__c : 0.000) * (this.opList[ 0 ].Final_Factory_Total_Cost__c !== undefined ? this.opList[ 0 ].Final_Factory_Total_Cost__c : 0.000)`;
    var FACTORY_DEPOSIT_AMOUNT = `(this.opList[ 0 ].Factory_Deposit_Amount__c !== undefined ? this.opList[ 0 ].Factory_Deposit_Amount__c : 0.000) * (this.opList[ 0 ].Factory_Deposit_Amount__c !== undefined ? this.opList[ 0 ].Factory_Deposit_Amount__c : 0.000)`;
    var FACTORY_BALANCE_AMOUNT = `(this.opList[ 0 ].Factory_Balance_Amount__c !== undefined ? this.opList[ 0 ].Factory_Balance_Amount__c : 0.000) * (this.opList[ 0 ].Factory_Balance_Amount__c !== undefined ? this.opList[ 0 ].Factory_Balance_Amount__c : 0.000)`;

    doc += '<tr style="font-size: 8pt; height: 15px;">';
    doc += '<td>' + `(this.opList[0].Item_Name__c !== undefined && this.opList[0].Item_Name__c !== null && this.opList[0].Item_Name__c !== '' ? this.opList[0].Item_Name__c : '')` + '</td>';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>';
    doc += '<td>' + '$' + FINAL_FACTORY_UNIT_COST + '</td>';
    doc += '<td style="text-align: left;">' + `(this.opList[0].TotalOpportunityQuantity !== undefined && this.opList[0].TotalOpportunityQuantity !== null && !isNaN(this.opList[0].TotalOpportunityQuantity) ? Math.round(this.opList[0].TotalOpportunityQuantity) : '')` + '</td>';
    doc += '<td style="text-align: left;">' + '$' + FINAL_FACTORY_TOTAL_COST + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt; height: 15px;">';
    doc += '<td>' + '' + '</td><td>' + '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '<td>' + '' + '</td>';
    doc += '<td>' + 'SUB TOTAL' + '</td>';
    doc += '<td style="text-align: left;">' + '$' + FINAL_FACTORY_TOTAL_COST + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '<td>' + '' + '</td>';
    doc += '<td>' + 'TAX' + '</td>';
    doc += '<td style="text-align: left;">' + '$0.000' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt; height: 15px;">';
    doc += '<td>' + '' + '</td><td>' + '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '<td>' + '' + '</td>';
    doc += '<td><b>' + 'TOTAL' + '</b></td>';
    doc += '<td style="text-align: left;"><b>' + '$' + FINAL_FACTORY_TOTAL_COST + '</b></td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt; height: 15px;">';
    doc += '<td>' + '' + '</td><td>' + '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '<td>' + '' + '</td>';
    doc += '<td>' + 'DEPOSIT' + '</td>';
    doc += '<td style="text-align: left;">' + '$' + FACTORY_DEPOSIT_AMOUNT + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt; height: 15px;">';
    doc += '<td>' + '' + '</td><td>' + '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '<td>' + '' + '</td>';
    doc += '<td>' + 'BALANCE' + '</td>';
    doc += '<td style="text-align: left;">' + '$' + FACTORY_BALANCE_AMOUNT + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 8pt;">';
    doc += '<td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td><td>' + '' + '</td>' + '</td><td>' + '' + '</td>';
    doc += '</tr>';

    doc += '<tr style="font-size: 7pt; text-align: center;">';
    doc += '<td colspan="9"><b>EMAIL</b>&nbsp;&nbsp;FINANCE@CITYGLOBAL.EARTH&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<b>PHONE</b>&nbsp;&nbsp;(310) 310-3387 HQ&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<b>MAILING ADDRESS</b>&nbsp;&nbsp;9800 WILSHIRE BLVD, SUITE 205, BEVERLY HILLS, CA 90212</td>';
    doc += '</tr>';

    doc += '</table>';

    const filename = 'ExportToExcel.xlsx';
    const workbook = XLSX.utils.book_new();
    const headers = [];
    const worksheetData = [];

    for (const record of doc) {
        worksheetData.push({
            "Name": record[0],
            "Age": record[1],
            "Email":record[2]
        
        });
    }
    const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: headers });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ExportToExcel');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a download link and click it programmatically to initiate the download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    // Release the object URL to free up memory
    URL.revokeObjectURL(a.href);
    }
}