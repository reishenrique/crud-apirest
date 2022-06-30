const mongoose = require("mongoose");

// Criando entidade para a API
const Person = mongoose.model("Person", {
  name: String,
  lastname: String,
  age: Number,
  salary: Number,
  profession: String,
  company: String,
});

// Exportando o arquivo
module.exports = Person;
