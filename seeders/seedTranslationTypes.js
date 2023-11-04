const TranslationType = require("../models/TranslationType");

const translationTypesData = [
  {
    title: "Javascript BASICO",
    filePath: "tokensJS.json",
    reversePath: "tokensPseudo.json", // Assuming reverse is used to get reverse path
  },
  {
    title: "Php BASICO",
    filePath: "tokensPHP.json",
    reversePath: "tokensPseudoPHP.json", // Assuming reverse is used to get reverse path
  },
  {
    title: "SQL BASICO",
    filePath: "tokensSQL.json",
    reversePath: "tokensPseudoSQL.json", // Assuming reverse is used to get reverse path
  },
];

const seedTranslationTypes = async () => {
  await TranslationType.bulkCreate(translationTypesData);
};

seedTranslationTypes();
