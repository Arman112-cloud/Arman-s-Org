import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import workbook from '@salesforce/resourceUrl/ravi'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FullProfileDetailTab extends LightningElement {

     connectedCallback() {

        
        Promise.all([loadScript(this, workbook )])
            .then(() => {
                console.log('result loaded ->> ');
            }).catch(error => {
                console.log('apex eeror: ' + JSON.stringify(error));
            });
    }

    // Error Toast Msg   
    toastMsg(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'sticky'
        });
        this.dispatchEvent(evt);
    }

    exportExcelData() {
        const workbook = new ExcelJS.Workbook();

        console.log('workbook: ' + workbook);

        const headerrows = [
            ['Multiple Sheet'],
            ['']
        ];

        const Tab = [
            ['Index'],
            ['Sheet 1'],
            ['Sheet 2'],
            ['Sheet 3']
        ];

        for (let i = 0; i < Tab.length; i++) {
            const worksheet = workbook.addWorksheet(`${Tab[i]}`);
            const profileOverviewHeader = {
                font: { bold: true, color: { argb: 'FFFFFF' } },
                alignment: { wrapText: true },
                border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            };

            const profileOverviewHeader1 = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '1a4876' },
            };

            const ProfileOverViewData = {
                font: { bold: true, color: { argb: '000000' } },
                alignment: { wrapText: true, horizontal: 'left' },
                border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
            };

            const ProfileOverViewData1 = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'c6c6c6' },
            };

            const headerCellStyle = {
                font: { bold: true, color: { argb: 'FFFFFF' } },
                alignment: {
                    vertical: 'middle',
                    horizontal: 'center',
                    wrapText: true
                },
                border: {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                },
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '1a4876' }
                }
            };

            if (Tab[i][0] === 'Index') {
                worksheet.getColumn('A').width = 50;
                worksheet.getColumn('B').width = 50;
                worksheet.getColumn('C').width = 50;
                worksheet.getColumn('D').width = 50;
                headerrows.forEach(rowData => {
                    worksheet.addRow(rowData);
                });
                worksheet.mergeCells('A1:B2');
                const mergedCell = worksheet.getCell('A1');
                mergedCell.style = headerCellStyle;

                worksheet.getCell('A5').style = profileOverviewHeader;
                worksheet.getCell('A5').fill = profileOverviewHeader1;
                worksheet.getCell('A6').style = profileOverviewHeader;
                worksheet.getCell('A6').fill = profileOverviewHeader1;
                worksheet.getCell('A7').style = profileOverviewHeader;
                worksheet.getCell('A7').fill = profileOverviewHeader1;
                worksheet.getCell('A4').style = profileOverviewHeader;
                worksheet.getCell('A4').fill = profileOverviewHeader1;
                worksheet.getCell('B4').style = profileOverviewHeader;
                worksheet.getCell('B4').fill = profileOverviewHeader1;

                worksheet.getCell('B5').style = ProfileOverViewData;
                worksheet.getCell('B5').fill = ProfileOverViewData1;
                worksheet.getCell('B6').style = ProfileOverViewData;
                worksheet.getCell('B6').fill = ProfileOverViewData1;
                worksheet.getCell('B7').style = ProfileOverViewData;
                worksheet.getCell('B7').fill = ProfileOverViewData1;

                worksheet.getCell('A4').value = 'Click on it and go to that particular sheet';
                worksheet.getCell('B4').value = 'Description';
                worksheet.getCell('B5').value = '<-- Click on Sheet 1';
                worksheet.getCell('B6').value = '<-- Click on Sheet 2';
                worksheet.getCell('B7').value = '<-- Click on Sheet 3';

                for (let rowIndex = 5; rowIndex <= 7; rowIndex++) {
                    const sheetName = Tab[rowIndex - 4][0]; // Adjust the index to start from 0
                    const cell = worksheet.getCell(`A${rowIndex}`);
                    const hyperlinkFormula = `HYPERLINK("#'${sheetName}'!A1", "${sheetName}")`;
                    // Add the hyperlink to the cell
                    cell.style = { ...cell.style, font: { color: { argb: 'FFFFFF' } } }; // Optional: Change the font color to blue
                    // Add the hyperlink formula to the cell
                    cell.value = {
                        formula: hyperlinkFormula,
                        result: sheetName
                    };
                }
            }

            if (Tab[i][0] === 'Sheet 1') {
                worksheet.getColumn('A').width = 50;
                worksheet.getColumn('B').width = 50;
                worksheet.getColumn('C').width = 50;

                headerrows.forEach(rowData => {
                    worksheet.addRow(rowData);
                });
                worksheet.mergeCells('A1:C2');
                const mergedCell = worksheet.getCell('A1');
                mergedCell.style = headerCellStyle;

                worksheet.getCell('A4').style = profileOverviewHeader;
                worksheet.getCell('A4').fill = profileOverviewHeader1;
                worksheet.getCell('B4').style = profileOverviewHeader;
                worksheet.getCell('B4').fill = profileOverviewHeader1;
                worksheet.getCell('C4').style = profileOverviewHeader;
                worksheet.getCell('C4').fill = profileOverviewHeader1;

                worksheet.getCell('A1').value = 'Sheet 1';
                worksheet.getCell('A4').value = 'Name';
                worksheet.getCell('B4').value = 'Phone';
                worksheet.getCell('C4').value = 'Email';

                worksheet.getCell('A5').value = 'Yash';
                worksheet.getCell('A6').value = 'Shubham';
                worksheet.getCell('A7').value = 'Rakesh';
                worksheet.getCell('A8').value = 'Kunj';
                worksheet.getCell('A9').value = 'Sumit';

                worksheet.getCell('B5').value = '123456789';
                worksheet.getCell('B6').value = '876541234';
                worksheet.getCell('B7').value = '87238234';
                worksheet.getCell('B8').value = '876523478';
                worksheet.getCell('B9').value = '123493456';

                worksheet.getCell('C5').value = 'yash@gmail.com';
                worksheet.getCell('C6').value = 'shubham@gmail.com';
                worksheet.getCell('C7').value = 'rakesh@gmail.com';
                worksheet.getCell('C8').value = 'kunj@gmail.com';
                worksheet.getCell('C9').value = 'sumit@gmail.com';
            }

            if (Tab[i][0] === 'Sheet 2') {
                worksheet.getColumn('A').width = 50;
                worksheet.getColumn('B').width = 50;
                worksheet.getColumn('C').width = 50;

                headerrows.forEach(rowData => {
                    worksheet.addRow(rowData);
                });
                worksheet.mergeCells('A1:B2');
                const mergedCell = worksheet.getCell('A1');
                mergedCell.style = headerCellStyle;

                worksheet.getCell('A4').style = profileOverviewHeader;
                worksheet.getCell('A4').fill = profileOverviewHeader1;
                worksheet.getCell('B4').style = profileOverviewHeader;
                worksheet.getCell('B4').fill = profileOverviewHeader1;

                worksheet.getCell('A1').value = 'Sheet 2';
                worksheet.getCell('A4').value = 'Name';
                worksheet.getCell('B4').value = 'City';

                worksheet.getCell('A5').value = 'Yash';
                worksheet.getCell('A6').value = 'Shubham';
                worksheet.getCell('A7').value = 'Rakesh';
                worksheet.getCell('A8').value = 'Kunj';
                worksheet.getCell('A9').value = 'Sumit';

                worksheet.getCell('B5').value = 'Mumbai';
                worksheet.getCell('B6').value = 'Delhi';
                worksheet.getCell('B7').value = 'Delhi';
                worksheet.getCell('B8').value = 'Mumbai';
                worksheet.getCell('B9').value = 'Delhi';
            }

            if (Tab[i][0] === 'Sheet 3') {
                worksheet.getColumn('A').width = 20;
                worksheet.getColumn('B').width = 80;
                worksheet.getColumn('C').width = 50;

                headerrows.forEach(rowData => {
                    worksheet.addRow(rowData);
                });
                worksheet.mergeCells('A1:B2');
                const mergedCell = worksheet.getCell('A1');
                mergedCell.style = headerCellStyle;

                 worksheet.getCell('A4').style = profileOverviewHeader;
                worksheet.getCell('A4').fill = profileOverviewHeader1;
                worksheet.getCell('B4').style = profileOverviewHeader;
                worksheet.getCell('B4').fill = profileOverviewHeader1;

                worksheet.getCell('A1').value = 'Sheet 3';
                worksheet.getCell('A4').value = 'Name';
                worksheet.getCell('B4').value = 'Address';

                worksheet.getCell('A5').value = 'Yash';
                worksheet.getCell('A6').value = 'Shubham';
                worksheet.getCell('A7').value = 'Rakesh';
                worksheet.getCell('A8').value = 'Kunj';
                worksheet.getCell('A9').value = 'Sumit';

                worksheet.getCell('B5').value = '14/15/16 A, Pravasi Indl Estate, Vishweshwar Road, Nr Aarey Milk Colony, Goregaon (e)';
                worksheet.getCell('B6').value = '301, Plot No 32, Prashant Bldg, Swastik Soc,ns Rd No 2, Opp Dinbandhu Collection ,juhu, Vile Parle ';
                worksheet.getCell('B7').value = '1997, Katra Lachhu Singh, Sona Bazar, Chandni Chowk';
                worksheet.getCell('B8').value = 'Sunderwade, Parsi Panchayat Rd, Nr.sona Udyog,h.b.bhatt Compound, Andheri (west)';
                worksheet.getCell('B9').value = 'C 44, Arya Samaj Road, Uttam Nagar';
            }

        }

        workbook.xlsx.writeBuffer().then(buffer => {
            var link = document.createElement("a");
            link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + buffer.toString('base64');
            link.download = 'FullProfileDetails.xls';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        this.progress = 100; // make progress bar complete
        this.processStatus = 'Completed'; // to make progress status completed

        //For test message
        const evt = new ShowToastEvent({
            title: 'Download Successful',
            message: 'Multiple Sheet Data downloaded successfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}