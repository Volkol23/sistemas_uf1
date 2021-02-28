#!/usr/bin/node

console.log("Iniciando servidor");

let http = require("http");
let fs = require("fs");
let wss = require("websocket").server;
let mongo = require("mongodb").MongoClient;

let mongo_conn;
let mongo_db = false;

let url = "mongodb://localhost:27017/entipong";

mongo.connect(url, function(err, conn){
	if (err){
		console.log("ERROR: No se ha podido conectar")
		throw err;
	}
	console.log("ola k ase, mongodb o k ase");
	mongo_conn = conn;
	mongo_db = conn.db("entipong");
});

let http_server = http.createServer(function (req, res) {
	fs.readFile("index.html", function (err, data){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(data);
		res.end();
	});
}).listen(1974);

let ws_server = new wss({
	httpServer: http_server,
	autoAcceptConnections: false
});

let p1_conn;
let p2_conn;

let p1_restart;
let p2_restart;

let p1_score = 0;
let p2_score = 0;

function sendScore()
{
	mongo_db.collection("score").find({}).sort({date:-1}).limit(5).toArray(function (err, res) {
		if (err) {throw err;}
		let data = JSON.stringify(res);
		p1_conn.send('{"scores":'+data+'}');
		p2_conn.send('{"scores":'+data+'}');
		console.log(data);
		});
}

ws_server.on("request", function(req){
	if (p1_conn == undefined){
		console.log("Jugador 1 conectado");
		p1_conn = req.accept();
		
		p1_conn.on("message", function(msg){
			let data = JSON.parse(msg.utf8Data);
			if (data.goal != undefined){
				if (data.goal == 1)
					p1_score++;
				else
					p2_score++;
			}
			
			if (data.win != undefined){
				let now = Date.now();
				let db_data = {
					player1: p1_score,
					player2: p2_score,
					win: data.win,
					date: Date.now()
				};
				mongo_db.collection("score").insertOne(db_data);
				p1_conn.send(msg.utf8Data);
				
				sendScore();
			}

			
			//Envia al jugador 2

			if (p2_conn != undefined){
				p2_conn.send(msg.utf8Data);
			}
		});

		p1_conn.on('close', function(reasonCode, description){
			p1_conn = undefined;
			p1_score = 0;
			p2_score = 0;
		});

	}else if (p2_conn == undefined){
		console.log("Jugador 2 conectado");
		p2_conn = req.accept();

		p2_conn.on("message", function(msg){
			if (p1_conn != undefined){
					p1_conn.send(msg.utf8Data);
				}
		});
		p2_conn.on('close', function(reasonCode, description){
			p2_conn = undefined;
		});

		setTimeout(function() {
			p1_conn.send('{"start": 1}');
			p2_conn.send('{"start": 2}');
		},5000);
		}
});
