// Imports
const express = require("express");
const apiRouter = require("./route/apiRouter").router;
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const db = require("./models");
const AdminJSSequelize = require("@adminjs/sequelize");
AdminJS.registerAdapter(AdminJSSequelize);

// Instanciation server
const server = express();

// Body parsing via express
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Api Route
server.use("/api", apiRouter);

//AdminJS
const adminJs = new AdminJS({
  resources: [db.Users, db.Categories, db.Annonces],
  branding: {
    companyName: "CaTourne",
    logo: false,
  },
  rootPath: "/admin",
});

const router = AdminJSExpress.buildRouter(adminJs);
server.use(adminJs.options.rootPath, router);

// Listener
const start = (port) => {
  try {
    server.listen(port, () => {
      console.log(`Api up and running at: http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
start(process.env.PORT_BACK);
