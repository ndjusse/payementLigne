const { Sequelize, DataTypes } = require("sequelize");
const ClientModel = require("../models/client");
const PaiementModel = require("../models/paiement");
const Moyen_de_paiementModel = require("../models/moyen_de_paiement");
const AdminModel = require("../models/admin");
const RequeteModel = require("../models/requete");
const DemandeModel = require("../models/demande");
const DepotModel = require("../models/depot");

const sequelize = new Sequelize("bdpaiement", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.error(`impossible de se connecter à la base de données ${error}`)
  );

const Client = ClientModel(sequelize, DataTypes);

const Paiement = PaiementModel(sequelize, DataTypes);

const Moyen_de_paiement = Moyen_de_paiementModel(sequelize, DataTypes);

const Admin = AdminModel(sequelize, DataTypes);

const Requete = RequeteModel(sequelize, DataTypes);

const Demande = DemandeModel(sequelize, DataTypes);

const Depot = DepotModel(sequelize, DataTypes);

const optionsPaiement = [
  {
    LABEL: "Mtn Mobile Money",
    REF: "MOMO",
    DESCRIPTION: `MTN Mobile Money est un service électronique sécurisé qui permet aux détenteurs de portefeuilles mobile MTN de garder, 
                  envoyer ou recevoir de l'argent, d'effectuer des paiements ainsi que d’autres transactions, simplement à l'aide de leur téléphone mobile. C'est rapide, simple, 
                  pratique et abordable. Ce service est proposé par MTN en partenariat avec plus de 10 banques dans de nombreux pays d'Afrique.
  `,
    API: "https://momodeveloper.mtn.com/",
    CLE: "FD5484sdDF8715155q4qsdV",
    VALEUR: "qsds554dsf5",
    ENTREPRISE: "Mtn cameroun",
    IMG: "http://localhost:3001/assets/momo.png",
    SITE: "https://momodeveloper.mtn.com/"
  },
  {
    LABEL: "Orange Money",
    REF: "OM",
    DESCRIPTION: `Orange Money est le service de transfert d'argent et de paiement mobile du groupe Orange, proposé dans la majorité des pays d'Afrique où l'opérateur est présent. `,
    API: "https://orangemoney.orange.cm/",
    CLE: "FD5484sdDFdsdq5sqd5q4qsdV",
    VALEUR: "qsds55554dsf5",
    ENTREPRISE: "Orange cameroun",
    IMG: "http://localhost:3001/assets/om.png",
    SITE: "https://orangemoney.orange.cm/"
  }
];

sequelize.sync({ force: true }).then((_) => {
  console.log('La base de données "bdpaiement" a bien été synchronisée. ');
  Client.create({
    NOM: "John",
    PRENOM: "Doe",
    PASSWORD: "paimentOnline",
    NUM_TEL: "693027763",
    EMAIL: "hunterjul007@gmail.com",
    DATE_EXP: Date.now(),
    PAYS: "Cameroun",
  });

  Client.create({
    NOM: "Meli",
    PRENOM: "ameli",
    PASSWORD: "paimentss",
    NUM_TEL: "672345767",
    EMAIL: "amelimeli@gmail.com",
    DATE_EXP: Date.now(),
    PAYS: "Cameroun",
  });

  optionsPaiement.forEach((element) => {
    Moyen_de_paiement.create( {
      LABEL: element.LABEL,
      REF: element.REF,
      DESCRIPTION: element.DESCRIPTION,
      API: element.API,
      CLE: element.CLE,
      VALEUR: element.VALEUR,
      ENTREPRISE: element.ENTREPRISE,
      IMG: element.IMG,
      SITE: element.SITE
    });
  })
  Admin.create({ ID_ADMIN: 0, password: "admin", EMAIL: "admin@gmail.com" });
});

module.exports = {
  Client,
  Paiement,
  Moyen_de_paiement,
  Admin,
  Requete,
  Demande,
  Depot,
};
