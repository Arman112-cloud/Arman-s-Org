import { LightningElement, api } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import workbook from "@salesforce/resourceUrl/xlsx";
export default class XlsxMain extends LightningElement {
  @api headerList;
  @api filename;
  @api worksheetNameList;
  @api sheetData;
  librariesLoaded = false;
  renderedCallback() {
    console.log("renderedCallback xlsx");
    if (this.librariesLoaded) return;
    this.librariesLoaded = true;
    Promise.all([loadScript(this, workbook + "/xlsx/xlsx.full.min.js")])
      .then(() => {
        console.log("success");
      })
      .catch(error => {
        console.log("failure");
      });
  }
  @api download() {
    console.log('download called');
    console.log('this.headerList:', this.headerList);
    console.log('this.filename:', this.filename);
    console.log('this.worksheetNameList:', this.worksheetNameList);
    
    const XLSX = window.XLSX;
    let xlsData = this.sheetData;
    let xlsHeader = this.headerList;
    let ws_name = this.worksheetNameList;
    let createXLSLFormatObj = Array(xlsData.length).fill([]);
    
    console.log('Initial createXLSLFormatObj:', createXLSLFormatObj);

    /* form header list */
    xlsHeader.forEach((item, index) => {
        console.log(`Header ${index}:`, item);
        createXLSLFormatObj[index] = [item];
    });

    console.log('createXLSLFormatObj after adding headers:', createXLSLFormatObj);

    /* form data key list */
    xlsData.forEach((item, selectedRowIndex) => {
        console.log(`Processing data row ${selectedRowIndex}:`, item);
        let xlsRowKey = Object.keys(item[0]);
        console.log(`xlsRowKey for row ${selectedRowIndex}:`, xlsRowKey);

        item.forEach((value, index) => {
            var innerRowData = [];
            console.log(`Processing sub-row ${index} of row ${selectedRowIndex}:`, value);
            
            xlsRowKey.forEach(item => {
                console.log(`Pushing value for key ${item}:`, value[item]);
                innerRowData.push(value[item]);
            });

            createXLSLFormatObj[selectedRowIndex].push(innerRowData);
            console.log(`Updated createXLSLFormatObj[${selectedRowIndex}]:`, createXLSLFormatObj[selectedRowIndex]);
        });
    });

    console.log('Final createXLSLFormatObj:', createXLSLFormatObj);

    /* creating new Excel */
    var wb = XLSX.utils.book_new();
    console.log('New workbook created:', wb);

    /* creating new worksheet */
    var ws = Array(createXLSLFormatObj.length).fill([]);
    for (let i = 0; i < ws.length; i++) {
        console.log(`Creating worksheet for index ${i}`);
        
        /* converting data to excel format and pushing to worksheet */
        let data = XLSX.utils.aoa_to_sheet(createXLSLFormatObj[i]);
        console.log(`Converted data for worksheet ${i}:`, data);
        
        ws[i] = [...ws[i], data];
        console.log(`Worksheet ${i} after adding data:`, ws[i]);

        /* Add worksheet to Excel */
        XLSX.utils.book_append_sheet(wb, ws[i][0], ws_name[i]);
        console.log(`Worksheet ${ws_name[i]} added to workbook`);
    }

    console.log('Workbook before writing file:', wb);

    /* Write Excel and Download */
    XLSX.writeFile(wb, this.filename);
    console.log(`File ${this.filename} has been written and downloaded.`);
    }

}