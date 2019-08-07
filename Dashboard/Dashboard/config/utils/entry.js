const { projectPath } = require("./constant");

const jsDist = "js";
const cssDist = "css";

const clientRoot = projectPath.clientInputPath;

module.exports = {
    [`${jsDist}/pages/analytics/dashboard/app`]: clientRoot + "/js/pages/dashboard/App.jsx",
    [`${jsDist}/pages/analytics/summary/app`]: clientRoot + "/js/pages/summary/App.jsx",
    [`${jsDist}/pages/analytics/performance/app`]: clientRoot + "/js/pages/performance/App.jsx",

    [`${cssDist}/pages/analytics/dashboard/dashboard`]: clientRoot + "/styles/pages/dashboard/dashboard.scss",
    [`${cssDist}/pages/analytics/summary/summary`]: clientRoot + "/styles/pages/summary/summary.scss",
    [`${cssDist}/pages/analytics/performance/performance`]: clientRoot + "/styles/pages/performance/performance.scss",
};