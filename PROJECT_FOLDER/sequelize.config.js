const config = require("./config/config.js");
const config_prod = require("./dist/config/config.js");

const env = process.env.NODE_ENV || "development";

let finalConfig;

if (env === "production") {
  finalConfig = config_prod.production;
} else {
  finalConfig = config[env];
}

module.exports = {
  [env]: finalConfig,
};
