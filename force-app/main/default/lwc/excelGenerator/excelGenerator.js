import { loadScript } from 'lightning/platformResourceLoader';
import SHEET_JS from '@salesforce/resourceUrl/sheetjs'; // Assuming you uploaded the library as a static resource

export default class ExcelGenerator extends LightningElement {
    //sheetJsInitialized = false;

    renderedCallback() {
        if (this.sheetJsInitialized) {
            return;
        }
        this.sheetJsInitialized = true;

        loadScript(this, SHEET_JS + '/xlsx.full.min.js')
            .then(() => {
                // SheetJS library is loaded and ready to use
            })
            .catch(error => {
                console.error('Error loading SheetJS', error);
            });
    }

    generateExcelFile() {
        const data = [
            ["Name", "Age", "Gender"],
            ["John Doe", 28, "Male"],
            ["Jane Smith", 34, "Female"]
        ];
    
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    
        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
    
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    
        // Trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'example.xlsx';
        link.click();
    }
    
}
