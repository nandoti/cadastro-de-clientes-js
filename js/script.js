"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFileds();
  document.getElementById("modal").classList.remove("active");
  
};
const tempClient = {
  nome: "Leandro",
  email: "fernando.adriano.tavares@gmail.con",
  celular: "11969115960",
  cidade: "RJ",
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
      Celular: document.getElementById("celular").value,
      cidade: document.getElementById("cidade").value,
    };
    createClient(client);

    closeModal();
  }
};

// Eventos
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("salvar").addEventListener("click", saveClient);
