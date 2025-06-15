import { UserService } from "./services/user.service.js";

const userService = new UserService();


function renderData(): void {
    userService.getAll()
        .then(korisnici => {
            const table = document.querySelector("tbody");

            if (!table) {
                console.error('Table body not found');
                return;
            }

            korisnici.forEach((korisnik) => {
                const newRow = document.createElement("tr");

                const cell1 = document.createElement("td");
                cell1.textContent = korisnik.korIme;

                const cell2 = document.createElement("td");
                cell2.textContent = korisnik.ime;

                const cell3 = document.createElement("td");
                cell3.textContent = korisnik.prezime;

                const cell4 = document.createElement("td");
                const dateOfBirth = new Date(korisnik.datumRodjenja);

                const year = dateOfBirth.getFullYear();
                const month = String(dateOfBirth.getMonth() + 1).padStart(2, "0");
                const day = String(dateOfBirth.getDate()).padStart(2, "0");
                const formattedDate = `${year}-${month}-${day}`;
                cell4.textContent = formattedDate;

                const cell5 = document.createElement("td");
                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.addEventListener("click", function () {
                    window.location.href = "./usersForm/usersForm.html?id=" + korisnik.id;
                });
                cell5.appendChild(editBtn);

                const cell6 = document.createElement("td");
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";

                deleteBtn.onclick = function () {
                    userService.deleteUser(korisnik.id.toString())
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error.status, error.text);
                        });
                };

                cell6.appendChild(deleteBtn);

                newRow.appendChild(cell1);
                newRow.appendChild(cell2);
                newRow.appendChild(cell3);
                newRow.appendChild(cell4);
                newRow.appendChild(cell5);
                newRow.appendChild(cell6);
                table.appendChild(newRow);
            });
        })
        .catch(error => {
            console.error(error.status, error.message);
        });
}

renderData();


