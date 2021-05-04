const { projectPath } = require("./constant");

const jsDist = "js";
const cssDist = "css";

const clientRoot = projectPath.clientInputPath;

module.exports = {
    [`${jsDist}/pages/analytics/dashboard/app`]: clientRoot + "/js/pages/dashboard/App.jsx",

    [`${cssDist}/pages/analytics/index`] : [
      clientRoot + "/styles/pages/dashboard/dashboard.scss",
      clientRoot + "/styles/pages/summary/summary.scss",
      clientRoot + "/styles/pages/performance/performance.scss",
      clientRoot + "/styles/pages/sportsbook/sportsbook.scss"
  ]
};
