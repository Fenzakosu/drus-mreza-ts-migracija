import { KorisnikFormData } from "../models/userFormData.model.js";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

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

    userService.add(formData)
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error(error.status, error.text);
        });
}

const button = document.querySelector("#submitBtn");
if (button) {
    button.addEventListener("click", submit);
}
