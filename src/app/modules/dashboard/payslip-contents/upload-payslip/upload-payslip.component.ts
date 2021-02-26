import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-upload-payslip',
  templateUrl: './upload-payslip.component.html',
  styleUrls: ['./upload-payslip.component.css']
})
export class UploadPayslipComponent implements OnInit {
  page: number = 1;
  pdfSrc: string = '';

  constructor(private pdfService: PdfService) { }

  ngOnInit() {
    this.pdfSrc = this.pdfService.getPDF();
  }

  onFileSelected() {
    let img: any = document.querySelector("#file");

    if(typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      }
      reader.readAsArrayBuffer(img.files[0]);
    }
  }

}
