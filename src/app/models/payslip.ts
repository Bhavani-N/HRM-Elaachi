export class Payslip {
    staffId: string;
    dateIssued: string;
    fileChosen: string;

    constructor(id) {
        this.staffId = id;
    }
}