import { Korisnik } from "../models/user.model.js";


export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:5154/api/korisnici';
    }

    getAll(): Promise<Korisnik[]> {
        return fetch(this.apiUrl)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((korisnici: Korisnik[]) => {
                return korisnici;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }
}