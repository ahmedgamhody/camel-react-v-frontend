/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-hot-toast";
import { AskDocxRequest, AskTasksRequest } from "../interfaces";

const BASE_URL = import.meta.env.BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error.response?.data?.detail;
    let message = "Something went wrong";

    if (Array.isArray(detail)) {
      message = detail.map((err: any) => err.msg).join(" | ");
    } else if (typeof detail === "string") {
      message = detail;
    }

    toast.error(message);
    return Promise.reject(error);
  }
);

export const askTasks = (data: AskTasksRequest) => api.post("/asktasks", data);

export const askDocx = (data: AskDocxRequest) => api.post("/askdocx", data);

export const uploadDocx = (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return api.post("/upload_docx", formData);
};

export const downloadWeeklyReport = async () => {
  const response = await axios.get(`${BASE_URL}/download_weekly_report`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "weekly_report.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
