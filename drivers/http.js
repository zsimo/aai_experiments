"use strict";

const path = require("path");
// const config = require(path.resolve(process.cwd(), "config"));
const axios = require("axios");

axios.defaults.baseURL = "http://10.146.101.41:1234";

module.exports = axios;
