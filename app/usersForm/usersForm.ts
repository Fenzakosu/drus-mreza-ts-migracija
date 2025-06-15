import { KorisnikFormData } from "../models/userFormData.model.js";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

function initializeForm(): void {
    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const id = urlparams.get('id');

    if (id) {
        userService.getById(id)
            .then(korisnik => {
                (document.querySelector('#korIme') as HTMLInputElement).value = korisnik.korIme;
                (document.querySelector('#ime') as HTMLInputElement).value = korisnik.ime;
                (document.querySelector('#prezime') as HTMLInputElement).value = korisnik.prezime;
                const datum = new Date(korisnik.datumRodjenja);
                const year = datum.getFullYear();
                const month = String(datum.getMonth() + 1).padStart(2, '0');
                const day = String(datum.getDate()).padStart(2, '0');
                const formatiranDatum = `${year}-${month}-${day}`;
                (document.querySelector('#datumRodjenja') as HTMLInputElement).value = formatiranDatum;

            }).catch(error => {
                console.error(error.status, error.text);
            })
    }
}

function submit(): void {
    const korIme = (document.querySelector('#korIme') as HTMLInputElement).value;
    const ime = (document.querySelector('#ime') as HTMLInputElement).value;
    const prezime = (document.querySelector('#prezime') as HTMLInputElement).value;
    const datumRodjenjaInput = document.querySelector('#datumRodjenja') as HTMLInputElement;

    if (!korIme || !ime || !prezime || !datumRodjenjaInput.value) {
        alert("Sva polja su obavezna!");
        return;
    }

    const datumRodjenja = new Date(datumRodjenjaInput.value);

    const formData: KorisnikFormData = {
        korIme,
        ime,
        prezime,
        datumRodjenja
    };

    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const id = urlparams.get('id');

    if (id) {
        userService.update(id, formData)
            .then(() => {
                window.location.href = '../index.html'
            }).catch(error => {
                console.error(error.status, error.text);
            })
    }
    else {
        userService.add(formData)
            .then(() => {
                window.location.href = '../index.html';
            })
            .catch(error => {
                console.error(error.status, error.text);
            });
    }
}



document.addEventListener("DOMContentLoaded", () => {
    initializeForm();
    const button = document.querySelector("#submitBtn");
    if (button) {
        button.addEventListener("click", submit);
    }
})
