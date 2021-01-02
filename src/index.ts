import fastify from "fastify";
import fastWebsocket from "fastify-websocket";
import fastifyStatic from "fastify-static";
import path from "path";
import { exec } from "child_process";

const app = fastify();

app.register(fastWebsocket);
app.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
});

app.get("/", (req, res) => {
  console.log("???");
  res.sendFile("index.html");
  // res.send({ ok: true });
});

app.get("/ws", { websocket: true }, (connection, req) => {
  connection.socket.on("message", (message: any) => {
    // message === 'hi from client'
    console.log(message);
    type(message);
  });
});

app.listen(4040, "0.0.0.0", (err: any) => {
  if (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
});

async function type(keyCommand: string) {
  await new Promise((res) => exec(`xdotool ${keyCommand}`, res));
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(() => res(true), ms));
}

// exec(`xdotool keydown a`);
// setTimeout(() => {
//   exec(`xdotool keyup a`);
// }, 2000);

// (async () => {
//   for (let i = 0; i < 40; i++) {
//     console.time();

//     console.timeEnd();
//   }

//   console.log("done");
// })();

// // Speed up the mouse.
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = screenSize.height / 2 - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++) {
//   let y = height * Math.sin((twoPI * x) / width) + height;
//   robot.moveMouse(x, y);
// }
