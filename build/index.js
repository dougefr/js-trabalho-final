"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var ws_1 = __importDefault(require("ws"));
var http_1 = __importDefault(require("http"));
var calculos_1 = __importDefault(require("./calculos"));
// Cria a aplicação express
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
//Inicializa um servidor HTTP orquestrado pelo express
var server = http_1.default.createServer(app);
//Inicializa um instancia de servidor websocket a partir do servidor http
var wss = new ws_1.default.Server({ server: server });
// Função responsável por manusear a conexão websocket
wss.on("connection", function (ws) {
  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", function (message) {
    ws.send("Recebemos sua opera\u00E7\u00E3o: " + message);
    ws.send("Calculando ...");
    calculos_1
      .default(message.toString())
      .then(function (resultado) {
        return ws.send("Resultado: " + message + " = " + resultado);
      })
      .catch(function (err) {
        return ws.send("Erro (" + message + "): " + err);
      });
  });
  ws.send("Envie operações simples matemáticas!");
  ws.send("Exemplo: 1 + 1");
});
//Inicia o servidor
server.listen(process.env.PORT || 8080, function () {
  console.log("Servidor inicializado na porta:", server.address().port);
});
