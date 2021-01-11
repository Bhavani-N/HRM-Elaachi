export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate?: Date,
        // public username?: string,
        // public designation?: string,
        // public mobile?: number,
        // public extno?: number,
        // public twitter?: string,
        // public facebook?: string,
        // public linkedIn?: string,
        // public workstation?: string,

    ) {}

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
