const sequelize = require("../config/database");
const { SavedTranslation, User, Course } = require("../models");

const seedSavedTranslationsPhp = async () => {
  try {
    // Find a random or the first user ID
    const randomUserId = await User.findOne({
      attributes: ["id"],
      where: {
        username: "admin",
      },
      raw: true,
    });

    const savedTranslationsPhp = [
      {
        originalMessage: "echo 'Hola Mundo';",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "$nombre = 'Juan';\n$edad = 30;\n$esEstudiante = true;",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "$x = 10;\n$y = 5;\n$suma = $x + $y;\n$resta = $x - $y;\n$multiplicacion = $x * $y;\n$division = $x / $y;",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "$edad = 18;\nif ($edad >= 18) {\n  echo 'Eres mayor de edad';\n} else {\n  echo 'Eres menor de edad';\n}",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "for ($i = 0; $i < 5; $i++) {\n  echo 'Iteración ' . $i;\n}",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "function saludar($nombre) {\n  echo '¡Hola, ' . $nombre . '!';\n}\n\nsaludar('María');",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "$colores = ['rojo', 'verde', 'azul'];\necho $colores[0]; // Muestra 'rojo'",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "$persona = [\n  'nombre' => 'Juan',\n  'edad' => 30,\n  'esEstudiante' => true\n];\necho $persona['nombre']; // Muestra 'Juan'",
        translationType: "code-to-pseudo",
        translationTypeId: 2,
        userId: randomUserId ? randomUserId.id : null,
      },
    ];

    const phpCourses = [
      {
        name: "Hola Mundo",
        description:
          "En esta lección, aprenderemos a imprimir 'Hola Mundo' en la pantalla.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Variables y Tipos de Datos",
        description:
          "Aprenderemos a declarar variables y los diferentes tipos de datos en PHP.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Operaciones Básicas",
        description:
          "Veremos cómo realizar operaciones matemáticas simples en PHP.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Condicionales (if-else)",
        description:
          "Aprenderemos a usar estructuras condicionales para tomar decisiones en el código PHP.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Bucles (for)",
        description:
          "Aprenderemos cómo usar un bucle for para repetir una tarea varias veces en PHP.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Funciones",
        description: "Aprenderemos a definir y utilizar funciones en PHP.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Arreglos",
        description:
          "Aprenderemos sobre los arreglos y cómo acceder a sus elementos en PHP.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Asociaciones en Arreglos",
        description:
          "Aprenderemos a utilizar arreglos asociativos para almacenar datos en PHP.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
    ];

    for (let i = 0; i < savedTranslationsPhp.length; i++) {
      const savedT = await SavedTranslation.create(savedTranslationsPhp[i]);
      phpCourses[i].savedTranslationId = savedT.id;
      await Course.create(phpCourses[i]);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedSavedTranslationsPhp();
