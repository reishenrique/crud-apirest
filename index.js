// Importando o dotenv
require("dotenv").config();

// Config inicial
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Forma de ler JSON utilizando middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Rotas da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);
// Rotas / endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Alô",
    name: "Henrique",
    age: 23,
  });
});

// Conectando o mongoose e o mongoDB na aplicação
mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log(
        `Conectamos o MongoDB / Servidor rodando na porta ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
