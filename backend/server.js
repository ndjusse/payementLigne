const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const createConnection = require("mysql");
const cors = require("cors");
const join = require('path');

const sequilize = require("./src/db/sequelize");

const server = express();
const port = 3001;

// const conn = createConnection.createConnection(
//     {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '',
//         database: 'gestion_paiement'
//     }
// )

server.use(cors());

server
  .use(morgan("dev"))
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

const conn = createConnection.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "gestion_beliz",
});

// Route Client
require("./src/routes/client/findAllClient")(server);
require("./src/routes/client/findClientById")(server);
require("./src/routes/client/updateClient")(server);
require("./src/routes/client/createClient")(server);
require("./src/routes/client/getClient")(server);
require("./src/routes/client/deleteClient")(server);
require("./src/routes/client/login")(server);
require("./src/routes/client/profile")(server);

// Route Paiement
require("./src/routes/paiement/createPaiement")(server);
require("./src/routes/paiement/findAllPaiement")(server);
require("./src/routes/paiement/findAllPaiementByID")(server);
require("./src/routes/paiement/findAllPaiementByNum")(server);
require("./src/routes/paiement/updatePaiement")(server);

// Route Moyen de paiement
require("./src/routes/moyen_de_paiement/createMoyen_de_paiement")(server);
require("./src/routes/moyen_de_paiement/deleteMoyen_de_paiement")(server);
require("./src/routes/moyen_de_paiement/findAllMoyen_de_paiement")(server);
require("./src/routes/moyen_de_paiement/updateMoyen_de_paiement")(server);

// Route demande
require("./src/routes/demande/createDemande")(server);
require("./src/routes/demande/deleteDemande")(server);
require("./src/routes/demande/getAllDemande")(server);
require("./src/routes/demande/updateDemande")(server);
require("./src/routes/demande/findAllDemandeByIdClient")(server);

// Route Administrateur
require("./src/routes/admin/createAdmin")(server);
require("./src/routes/admin/login")(server);

server.get('/assets/:name', (req, res) => {
  res.sendFile(`/assets/${req.params.name}`, options);
});
var options = {
  root: join.join(__dirname)
}


server.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL";
  res.status(404).json({ message });
});

server.listen(port, () =>
  console.log(`Le server a demarré sur le port ${port}`)
);
