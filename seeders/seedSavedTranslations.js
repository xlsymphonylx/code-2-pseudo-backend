const sequelize = require("../config/database");
const { SavedTranslation, User, Course } = require("../models");

const seedSavedTranslations = async () => {
  try {
    // Find a random or the first user ID
    const randomUserId = await User.findOne({
      attributes: ["id"],
      where: {
        username: "admin",
      },
      raw: true,
    });

    const savedTranslationsJs = [
      {
        originalMessage: "console.log('Hola Mundo')",
        translationType: "js-to-pseudo",
        translationTypeId: 1,
        userId: randomUserId ? randomUserId.id : null, // Assuming a valid user ID
      },
      {
        originalMessage:
          "let nombre = 'Juan'\n let edad = 30\n let esEstudiante = true",
        translationType: "js-to-pseudo",
        translationTypeId: 1,

        userId: randomUserId ? randomUserId.id : null, // Assuming a valid user ID
      },
      {
        originalMessage:
          "let x = 10;\n let y = 5;\nlet suma = x + y;\nlet resta = x - y;\nlet multiplicacion = x * y;\nlet division = x / y;",
        translationType: "js-to-pseudo",
        translationTypeId: 1,

        userId: randomUserId ? randomUserId.id : null, // Assuming a valid user ID
      },
      {
        originalMessage:
          "let edad = 18;\nif (edad >= 18) {\nconsole.log('Eres mayor de edad');\n} else {\n console.log('Eres menor de edad');}",
        translationType: "js-to-pseudo",
        translationTypeId: 1,
        userId: randomUserId ? randomUserId.id : null, // Assuming a valid user ID
      },
      {
        originalMessage:
          "for (let i = 0; i < 5; i++) {\nconsole.log('Iteración ' + i);\n}",
        translationType: "js-to-pseudo",
        translationTypeId: 1,
        userId: randomUserId ? randomUserId.id : null, // Assuming a valid user ID
      },
      {
        originalMessage:
          "function saludar(nombre) {\n  console.log('¡Hola, ' + nombre + '!');\n}\n\nsaludar('María');",
        translationType: "js-to-pseudo",
        translationTypeId: 1,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "let colores = ['rojo', 'verde', 'azul'];\nconsole.log(colores[0]); // Muestra 'rojo'",
        translationType: "js-to-pseudo",
        translationTypeId: 1,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "let persona = {\n  nombre: 'Juan',\n  edad: 30,\n  esEstudiante: true\n};\n\nconsole.log(persona.nombre); // Muestra 'Juan'",
        translationType: "js-to-pseudo",
        translationTypeId: 1,
        userId: randomUserId ? randomUserId.id : null,
      },
      // Add more saved translations as needed
    ];

    const jsCourses = [
      {
        name: "Hola Mundo",
        description:
          "En esta lección, aprenderemos a imprimir 'Hola Mundo' en la consola.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },

      {
        name: "Variables y Tipos de Datos",
        description:
          "Aprenderemos a declarar variables y los diferentes tipos de datos en JavaScript.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },

      {
        name: "Operaciones Básicas",
        description:
          "Veremos cómo realizar operaciones matemáticas simples en JavaScript.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },

      {
        name: "Condicionales (if-else)",
        description:
          "Aprenderemos a usar estructuras condicionales para tomar decisiones en el código.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },

      {
        name: "Bucles (for)",
        description:
          "Aprenderemos cómo usar un bucle for para repetir una tarea varias veces.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },

      {
        name: "Funciones",
        description:
          "Aprenderemos a definir y utilizar funciones en JavaScript.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },

      {
        name: "Arreglos",
        description:
          "Aprenderemos sobre los arreglos y cómo acceder a sus elementos.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },

      {
        name: "Objetos",
        description:
          "Aprenderemos a crear objetos y acceder a sus propiedades.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
    ];
    
    for (let i = 0; i < savedTranslationsJs.length; i++) {
      const savedT = await SavedTranslation.create(savedTranslationsJs[i]);
      jsCourses[i].savedTranslationId = savedT.id;
      await Course.create(jsCourses[i]);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedSavedTranslations();
