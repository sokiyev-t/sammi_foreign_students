module.exports = {
  apps: [
    {
      name: 'sammifs',
      script: 'dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
    },
  ],
};
