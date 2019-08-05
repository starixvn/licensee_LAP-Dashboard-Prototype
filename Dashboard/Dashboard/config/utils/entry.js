const { projectPath } = require("./constant");

const jsDist = projectPath.relativeOutputPath + "/js";
const htmlDist = projectPath.relativeOutputPath;
const cssDist = projectPath.relativeOutputPath + "/css";

const clientRoot = projectPath.clientInputPath;

module.exports = {
    [`${jsDist}/build/dashboard/app`]: clientRoot + "/js/pages/dashboard/App.jsx",

    [`${cssDist}/build/dashboard/dashboard`]: clientRoot + "/styles/pages/dashboard/dashboard.scss",
};