export class Payslip {
    _id: string;
    staffId: string;
    month: string;
    year: string;
    file: string;
    createdAt: string;
    updatedAt: string;

    constructor(_id) {
        this._id = _id;
    }
}