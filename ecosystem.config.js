// For running pm2 | ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "MawarCMS",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
