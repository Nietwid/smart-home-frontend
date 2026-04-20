import { useAuth } from "../auth/AuthContext.tsx";
import {CreateApiResponse, DeleteApiResponse, ReadApiResponse, UpdateApiResponse} from "../type/TApiResponse.ts";

function getCsrfToken() {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 10) === "csrftoken=") {
        cookieValue = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return cookieValue;
}
export class ApiError extends Error {
  details?: Record<string, string[]>;
  status?: number;

  constructor(
      message: string,
      details?: Record<string, string[]>,
      status?: number
  ) {
    super(message);
    this.name = "ApiError";
    this.details = details;
    this.status = status;
  }
}
interface useFetchReturn {
  createData: <T>(url: string, body: any) => Promise<CreateApiResponse<T>>;
  readData: <T>(url: string) => Promise<UpdateApiResponse<T>>;
  updateData: <T>(url: string, body: any) => Promise<ReadApiResponse<T>>;
  deleteData: (url: string) => Promise<DeleteApiResponse>;
}

export default function useFetch(): useFetchReturn {
  const { access, logout } = useAuth();
  const options = {
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
      "X-CSRFToken": getCsrfToken() || "",
    },
  };
  async function createData<T>(
    url: string,
    body = null
  ): Promise<CreateApiResponse<T>> {
    const response = await fetch(url, {
      method: "POST",
      ...options,
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();
    if (response.status === 401) {logout()}
    if (!response.ok) {
      throw new ApiError(
          "Validation error",
          data,
          response.status
      );
    }
    return { status: response.status, data: data };
  }

  async function readData<T>(url: string): Promise<ReadApiResponse<T>> {
    const response = await fetch(url, {
      method: "GET",
      ...options,
    });
    if (response.status === 401) {logout()}
    const data = await response.json();
    return { status: response.status, data: data };
  }
  async function updateData<T>(
    url: string,
    body = null
  ): Promise<UpdateApiResponse<T>> {
    const response = await fetch(url, {
      method: "PUT",
      ...options,
      body: body ? JSON.stringify(body) : null,
    });
    if (response.status === 401) {logout()}
    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(
          "Validation error",
          data,
          response.status
      );
    }
    return { status: response.status, data: data };
  }

  async function deleteData(url: string): Promise<DeleteApiResponse> {
    const response = await fetch(url, {
      method: "DELETE",
      ...options,
    });
    if (response.status === 401) {logout()}
    return { status: response.status };
  }

  return {
    createData,
    readData,
    updateData,
    deleteData,
  };
}
