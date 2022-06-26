// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {

    development: {
      client: "mysql",
      connection: {
        database: "poteto",
        user: "root",
        password: "",
      },
      pool: {
        min: 2,
        max: 10
      },
    },
  
    staging: {
      client: "mysql",
      connection: {
        database: "poteto",
        user: "root",
        password: "",
      },
      pool: {
        min: 2,
        max: 10
      },
    },
  
    production: {
      client: "mysql",
      connection: {
        database: "poteto",
        user: "root",
        password: "",
      },
      pool: {
        min: 2,
        max: 10
      },
    }
  
  };
  