const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");
//TODO add console.log to see if it works
const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
