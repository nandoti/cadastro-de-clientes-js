"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFileds();
  document.getElementById("modal").classList.remove("active");
};

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];

const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStorage();

// CRUD - Craate
const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidFileds = () => {
  return document.getElementById("form").reportValidity();
};

// Interação Layout

const clearFileds = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
};

const saveClient = () => {
  if (isValidFileds()) {
    const client = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      cidade: document.getElementById("cidade").value,
    };
    createClient(client);
    updateTable();
    closeModal();
  }
};

const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${client.nome}</td>
      <td>${client.email}</td>
      <td>${client.celular}</td>
      <td>${client.cidade}</td>
        <td>
            <button id="edit-${index}" type="button" class="button ciano" >Editar</button>
            <button id="delete-${index}" type="button" class="button red">Excluir</button>
        </td>
  `;
  document.querySelector("#tbClient>tbody").appendChild(newRow);
};

//Limpa a tabela

const clearTable = () => {
  const rows = document.querySelectorAll("#tbClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};

const editCleint = (index) => {
  const client = readClient()
}

const editDelete = (ev) => {
  if (ev.target.type == 'button') {

    const [action, index] = ev.target.id.split('-')

    if (action == 'edit') {
     editCleint(index)
    } else {
      
    }
  }

}

updateTable();

// Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose")
  .addEventListener("click", closeModal);

document.getElementById("salvar")
  .addEventListener("click", saveClient);

document.querySelector('#tbClient>tbody')
  .addEventListener('click', editDelete)