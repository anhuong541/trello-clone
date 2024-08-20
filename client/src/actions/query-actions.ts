import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { server } from "@/lib/network";
import {
  CreateProjectInputType,
  EditProjectInputType,
  LoginInputType,
  RegisterInputType,
  TaskInput,
} from "@/types/query-types";

export const onUserRegister = async (dataInput: RegisterInputType) => {
  return await server.post("/user/register", dataInput);
};

export const onUserLogin = async (dataInput: LoginInputType) => {
  return await server.post("/user/login", dataInput);
};

export const onUserLogout = async () => {
  try {
    return await server.get("/user/logout");
  } catch (error) {
    console.log("logout error: ", error);
  }
};

export const handleUserInfo = async (cookie: ReadonlyRequestCookies) => {
  const token = cookie.get("user_session")?.value;
  try {
    return await server
      .get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  } catch (error) {
    console.log("user info error: ", error);
  }
};

export const handleUserProjectList = async () => {
  try {
    return await server.get(`/project`);
  } catch (error) {
    console.log("user project list error: ", error);
  }
};

export const onCreateProject = async (dataInput: CreateProjectInputType) => {
  try {
    return await server.post(`/project`, dataInput);
  } catch (error) {
    console.log("create project error: ", error);
  }
};

export const onEditProject = async (dataInput: EditProjectInputType) => {
  try {
    return await server.put(`/project`, dataInput);
  } catch (error) {
    console.log("edit project error: ", error);
  }
};

export const onDeleteProject = async (projectId: string) => {
  try {
    return await server.delete(`/project/${projectId}`);
  } catch (error) {
    console.log("delete project error: ", error);
  }
};

export const handleViewProjectTasks = async (projectId: string) => {
  try {
    if (projectId !== "") {
      return await server.get(`/task/${projectId}`);
    }
    return { data: [] };
  } catch (error) {
    console.log("project tasks list error: ", error);
  }
};

export const onCreateNewTask = async (dataInput: TaskInput) => {
  try {
    return await server.post(`/task`, dataInput);
  } catch (error) {
    console.log("add task error: ", error);
  }
};

export const onChangeTaskState = async (dataInput: TaskInput) => {
  try {
    return await server.put(`/task`, dataInput);
  } catch (error) {
    console.log("change task error: ", error);
  }
};

export const onDeleteTaskFunction = async (props: {
  projectId: string;
  taskId: string;
}) => {
  try {
    return await server.delete(`/task/${props.projectId}/${props.taskId}`);
  } catch (error) {
    console.log("delete task error: ", error);
  }
};
