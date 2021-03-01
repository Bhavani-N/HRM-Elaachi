import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-upload-payslip',
  templateUrl: './upload-payslip.component.html',
  styleUrls: ['./upload-payslip.component.css']
})
export class UploadPayslipComponent implements OnInit {
  page: number = 1;
  pdfSrc: string = '';

  constructor(private pdfService: PdfService) { }
  public title: string;;
  @ViewChild('gSearch', {static: false}) formSearch;
  @ViewChild('searchKey', {static: false}) hiddenSearchHandler;

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

  public voiceSearch() {
    if("webkitSpeechRecognition" in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = "en-US";
      vSearch.start();
      const voiceSearchForm = this.formSearch.nativeElement;
      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      vSearch.onresult = function(e) {
        voiceHandler.value = e.results[0][0].transcript;
        vSearch.stop();
        voiceSearchForm.submit();
      };
      vSearch.onerror = function(e) {
        console.log(e);
        vSearch.stop();
      };
    } else {
      console.log("Your Browser dont support speech recognition");
    }
  }

}
