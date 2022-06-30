const router = require("express").Router();

const Person = require("../models/Person");

// Create - Método POST
router.post("/", async (req, res) => {
  // req.body
  const { name, lastname, age, salary, profession, company } = req.body;
  const person = {
    name,
    lastname,
    age,
    salary,
    profession,
    company,
  };

  // Validação dos campos em Person
  if (!name) {
    res.status(400).json({ error: "O nome é obrigatório" });
    return;
  }

  if (!lastname) {
    res.status(400).json({ error: "O sobrenome é obrigatório" });
    return;
  }

  if (!age) {
    res.status(400).json({ error: "A idade é obrigatória" });
    return;
  }

  try {
    // Criando dados
    await Person.create(person);
    res.status(201).json({ message: "Pessoa inserida no sistema com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//READ - Método GET
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Filtrando pessoas por registros únicos
router.get("/:id", async (req, res) => {
  // Extraindo o dado da requisição, pela url = req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    // Verificando se o usuário nao foi encontrado
    if (!person) {
      res.status(400).json({ message: "O usuário não foi encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// UPDATE -  Atualização de dados (PUT, PATCH)
// Put - Atualização do objeto completo de dados
// Patch - Atualização parcial de dados
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, lastname, age, salary, profession, company } = req.body;

  const person = {
    name,
    lastname,
    age,
    salary,
    profession,
    company,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    console.log(updatedPerson);

    // Validação de update de dados
    if (updatedPerson.matchedCount === 0) {
      res.status(400).json({
        message: "O usuário não foi encontrado para a atualizar os dados",
      });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE -  Deletar dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res
      .status(400)
      .json({ message: "O usuário não foi encontrado para ser deletado" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
