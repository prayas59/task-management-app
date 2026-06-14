import "dotenv/config";

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app";
import { env } from "./config/env";
import { initializeSocket } from "./socket";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

initializeSocket(io);

httpServer.listen(env.PORT, () => {
  console.log(`Server running on ${env.PORT}`);
});
