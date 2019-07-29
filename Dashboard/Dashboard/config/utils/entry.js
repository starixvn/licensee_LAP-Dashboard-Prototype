const { projectPath } = require("./constant");

const jsDist = projectPath.relativeOutputPath + "/js";
const htmlDist = projectPath.relativeOutputPath;
const styleDist = projectPath.relativeOutputPath + "/styles";

const clientRoot = projectPath.clientInputPath;

module.exports = {
    [`${jsDist}/pages/summary/app`]: clientRoot + "/js/pages/summary/App.jsx",

    [`${styleDist}/pages/summary/dashboard`]: clientRoot + "/styles/pages/summary/dashboard.scss",

    [`${htmlDist}/index`]: clientRoot + "/index.html"
};