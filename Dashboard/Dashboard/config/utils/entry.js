const { projectPath } = require("./constant");

const jsDist = projectPath.relativeOutputPath + "/js";
const htmlDist = projectPath.relativeOutputPath;
const cssDist = projectPath.relativeOutputPath + "/css";

const clientRoot = projectPath.clientInputPath;

module.exports = {
    [`${jsDist}/build/dashboard/app`]: clientRoot + "/js/pages/dashboard/App.jsx",
    [`${jsDist}/build/summary/app`]: clientRoot + "/js/pages/summary/App.jsx",
    [`${jsDist}/build/performance/app`]: clientRoot + "/js/pages/performance/App.jsx",

    [`${cssDist}/build/dashboard/dashboard`]: clientRoot + "/styles/pages/dashboard/dashboard.scss",
    [`${cssDist}/build/summary/summary`]: clientRoot + "/styles/pages/summary/summary.scss",
    [`${cssDist}/build/performance/performance`]: clientRoot + "/styles/pages/performance/performance.scss",

    [`${htmlDist}/index`]: clientRoot + "/index.html",
    [`${htmlDist}/summary`]: clientRoot + "/summary.html",
    [`${htmlDist}/performance`]: clientRoot + "/performance.html"
};