import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PdfService {

    constructor() { }

    getPDF() {
        return '/assests/JAN_Geethika_Payslip.pdf'
    }
}