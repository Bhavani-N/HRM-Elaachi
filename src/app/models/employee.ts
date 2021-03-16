export class Employee {

    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phoneNumber: number;
    role: string;
    status: string;
    updatedAt: string;
    createdAt: string;
    email: string;
    profileImage: string;

    constructor(_id) {
       this._id = _id;
    }
}
