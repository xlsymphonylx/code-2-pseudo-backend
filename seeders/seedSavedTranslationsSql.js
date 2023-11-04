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

    const savedTranslationsSql = [
      {
        originalMessage: "SELECT * FROM users;",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "INSERT INTO products (name, price) VALUES ('Producto A', 10.99);",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "UPDATE clientes SET ciudad = 'Nueva York' WHERE id = 1;",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage: "DELETE FROM pedidos WHERE estado = 'cancelado';",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "CREATE TABLE productos (id INT PRIMARY KEY, nombre VARCHAR(50), precio DECIMAL(8, 2));",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage:
          "ALTER TABLE clientes ADD COLUMN correo_electronico VARCHAR(100);",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage: "SELECT * FROM pedidos WHERE total > 100;",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
      {
        originalMessage: "CREATE DATABASE mi_base_de_datos;",
        translationType: "code-to-pseudo",
        translationTypeId: 3,
        userId: randomUserId ? randomUserId.id : null,
      },
    ];

    const sqlCourses = [
      {
        name: "Sentencias SELECT",
        description:
          "Aprende a recuperar datos de una base de datos usando sentencias SELECT en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Sentencias INSERT",
        description:
          "Aprende a agregar nuevos registros a una base de datos usando sentencias INSERT en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Sentencias UPDATE",
        description:
          "Aprende a modificar registros existentes en una base de datos usando sentencias UPDATE en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Sentencias DELETE",
        description:
          "Aprende a eliminar registros de una base de datos usando sentencias DELETE en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Sentencias CREATE TABLE",
        description:
          "Aprende a crear una nueva tabla en una base de datos usando sentencias CREATE TABLE en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Sentencias ALTER TABLE",
        description:
          "Aprende a modificar una tabla existente en una base de datos usando sentencias ALTER TABLE en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "SELECT con Cláusula WHERE",
        description:
          "Aprende a filtrar resultados usando la cláusula WHERE en sentencias SELECT en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
      {
        name: "Sentencias CREATE DATABASE",
        description:
          "Aprende a crear una nueva base de datos usando sentencias CREATE DATABASE en SQL.",
        availableDate: null,
        official: true,
        savedTranslationId: 0,
      },
    ];

    for (let i = 0; i < savedTranslationsSql.length; i++) {
      const savedT = await SavedTranslation.create(savedTranslationsSql[i]);
      sqlCourses[i].savedTranslationId = savedT.id;
      await Course.create(sqlCourses[i]);
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding:", error);
  }
};

seedSavedTranslations();
