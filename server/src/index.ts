import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import {
  ActiveUserAccountHandler,
  LoginRouteHandler,
  LogoutRouteHandler,
  RegisterRouteHandler,
  TakeUserInfoHandler,
  TokenVerifyHandler,
} from "./routers/user";
import {
  AddProjectHandler,
  DeleteProjectHandler,
  EditProjectHandler,
  ProjectListHandler,
} from "./routers/project";
import {
  CreateTaskHandler,
  DeleteTaskHandler,
  UpdateTaskHandler,
  ViewTasksHandler,
} from "./routers/task";

dotenv.config();
const app = express();
const port = process.env.PORT || 3456;

const corsWebAllow = [
  "http://localhost:3000",
  "https://trello-clone-anhuong541.vercel.app",
];

const corsOptions = {
  origin: corsWebAllow,
  optionsSuccessStatus: 200,
  credentials: true, // enable set cookie
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  console.log("it run!!!");
  res.json({ status: "success", text: "everything is clear!!!" });
});

app.post("/user/login", LoginRouteHandler);
app.post("/user/register", RegisterRouteHandler);
app.get("/user/logout", LogoutRouteHandler);
app.get("/user", TakeUserInfoHandler);
app.get("/user/token-verify", TokenVerifyHandler);
app.get("/user/:email/:hash", ActiveUserAccountHandler);

app.get("/project", ProjectListHandler);
app.post("/project", AddProjectHandler);
app.put("/project", EditProjectHandler);
app.delete("/project/:projectId", DeleteProjectHandler);

app.get("/task/:projectId", ViewTasksHandler);
app.post("/task", CreateTaskHandler);
app.put("/task", UpdateTaskHandler);
app.delete("/task/:projectId/:taskId", DeleteTaskHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
