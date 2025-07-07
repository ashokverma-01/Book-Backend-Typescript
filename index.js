import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import addressRoute from "./route/address.route.js";
import contactRoute from "./route/contact.route.js";
import NotificationRoute from "./route/Notification.route.js";

const app = express();

app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send notification to specific user
  socket.on("send_notification", (data) => {
    console.log("Sending Notification:", data);
    io.emit("receive_notification", data); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/address", addressRoute);
app.use("/contact", contactRoute);
app.use("/notification", NotificationRoute);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
