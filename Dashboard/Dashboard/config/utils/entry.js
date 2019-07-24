const { projectPath } = require("./constant");

const jsDist = projectPath.relativeOutputPath + "/js";
const htmlDist = projectPath.relativeOutputPath;
const styleDist = projectPath.relativeOutputPath + "/css";

const clientRoot = projectPath.clientInputPath;

module.exports = {
    [`${jsDist}/app`]: clientRoot + "/App.jsx",

    [`${styleDist}/dashboard`]: clientRoot + "/styles/dashboard.scss",

    [`${htmlDist}/index`]: clientRoot + "/pages/index.html"
};