import { Korisnik } from "../models/user.model.js";
import { KorisnikFormData } from "../models/userFormData.model.js";

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

    getById(id: string): Promise<Korisnik> {
        return fetch(`${this.apiUrl}/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json();
            }).then((korisnik: Korisnik) => {
                return korisnik;
            }).catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    add(formData: KorisnikFormData): Promise<Korisnik> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((korisnik: Korisnik) => {
                return korisnik;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    update(id: string, formData: KorisnikFormData): Promise<Korisnik> {
        return fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((korisnik: Korisnik) => {
                return korisnik;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }
}