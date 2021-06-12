import express from "express";
import path from "path";
import WebSocket, { AddressInfo } from "ws";
import http from "http";
import calculo from "./calculos";

// Cria a aplicação express
const app = express();
app.use(express.static(path.join(__dirname, "public")));

//Inicializa um servidor HTTP orquestrado pelo express
const server = http.createServer(app);

//Inicializa um instancia de servidor websocket a partir do servidor http
const wss = new WebSocket.Server({ server });

// Função responsável por manusear a conexão websocket
wss.on("connection", (ws) => {
  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", (message) => {
    ws.send(`Recebemos sua operação: ${message}`);
    ws.send("Calculando ...");
    calculo(message.toString())
      .then((resultado) => ws.send(`Resultado: ${message} = ${resultado}`))
      .catch((err) => ws.send(`Erro (${message}): ${err}`));
  });

  ws.send("Envie operações simples matemáticas!");
  ws.send("Exemplo: 1 + 1");
});

//Inicia o servidor
server.listen(process.env.PORT || 8080, () => {
  console.log(
    "Servidor inicializado na porta:",
    (server.address() as AddressInfo).port
  );
});
