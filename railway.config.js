module.exports = {
  frontend: {
    buildCommand: "cd client && npm install && npm run build",
    startCommand: "serve -s client/build",
    port: 3000
  },
  backend: {
    buildCommand: "npm install",
    startCommand: "node server.js",
    port: 5000
  }
}
