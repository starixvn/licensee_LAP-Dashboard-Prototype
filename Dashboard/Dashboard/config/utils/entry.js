const { projectPath } = require("./constant");

const jsDist = projectPath.relativeOutputPath + "/js";
const htmlDist = projectPath.relativeOutputPath;
const styleDist = projectPath.relativeOutputPath + "/styles/css";

const clientRoot = projectPath.clientInputPath;

module.exports = {
    [`${jsDist}/app`]: clientRoot + "/js/pages/main/App.jsx",

    [`${styleDist}/dashboard`]: clientRoot + "/styles/dashboard.scss",

    [`${htmlDist}/index`]: clientRoot + "/index.html"
};