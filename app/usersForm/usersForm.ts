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



function showSpinner(show: boolean): void {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        if (show) {
            spinner.classList.add("visible");
        } else {
            spinner.classList.remove("visible");
        }
    }
}

function showError(message: string): void {
    const errorDiv = document.querySelector("#errorMessage") as HTMLElement;
    errorDiv.textContent = message;
}


function submit(event: Event): void {
    event.preventDefault();
    console.log("Submit pozvan.")
    const korIme = (document.querySelector('#korIme') as HTMLInputElement).value;
    const ime = (document.querySelector('#ime') as HTMLInputElement).value;
    const prezime = (document.querySelector('#prezime') as HTMLInputElement).value;
    const datumRodjenjaInput = document.querySelector('#datumRodjenja') as HTMLInputElement;
    const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;

    if (!korIme || !ime || !prezime || !datumRodjenjaInput.value) {
        alert("Sva polja su obavezna!");
        showSpinner(false);
        return;
    }

    const datumRodjenja = new Date(datumRodjenjaInput.value);

    submitBtn.disabled = true;
    submitBtn.classList.add("disabled");

    const formData: KorisnikFormData = {
        korIme,
        ime,
        prezime,
        datumRodjenja
    };

    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const id = urlparams.get('id');

    const startTime = Date.now();
    const MIN_DURATION = 2000;


    showSpinner(true);
    showError("");

    if (id) {
        userService.update(id, formData)
            .then(() => {
                const elapsed = Date.now() - startTime;
                const waitTime = Math.max(0, MIN_DURATION - elapsed);
                setTimeout(() => {
                    submitBtn.disabled = true;
                    window.location.href = '../index.html';
                }, waitTime);

            }).catch(error => {

                const elapsed = Date.now() - startTime;
                const waitTime = Math.max(0, MIN_DURATION - elapsed);

                setTimeout(() => {
                    showError("Greška prilikom čuvanja korisnika.");

                    showSpinner(false);
                    console.error(error.status, error.text);
                }, waitTime);
            })

    }
    else {
        userService.add(formData)
            .then(() => {
                const elapsed = Date.now() - startTime;
                const waitTime = Math.max(0, MIN_DURATION - elapsed);

                setTimeout(() => {
                    submitBtn.disabled = true;

                    window.location.href = '../index.html';
                }, waitTime);
            })
            .catch(error => {

                const elapsed = Date.now() - startTime;
                const waitTime = Math.max(0, MIN_DURATION - elapsed);

                setTimeout(() => {
                    showError("Greška prilikom čuvanja korisnika.");

                    showSpinner(false);
                    console.error(error.status, error.text);
                }, waitTime);
            })

    }
}



document.addEventListener("DOMContentLoaded", () => {
    initializeForm();
    const button = document.querySelector("#submitBtn") as HTMLButtonElement;

    if (button) {
        button.addEventListener("click", (e) => submit(e));
    }
})
