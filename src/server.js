const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;

//pass express app middleware in http server for easy routing
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
