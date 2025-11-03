import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchNotesServer = async (
  params?: Record<string, string | number>,
  cookies?: string
) => {
  const { data } = await axios.get(baseURL + "/notes", {
    params,
    headers: { Cookie: cookies || "" },
    withCredentials: true,
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string, cookies?: string) => {
  const { data } = await axios.get(baseURL + `/notes/${id}`, {
    headers: { Cookie: cookies || "" },
    withCredentials: true,
  });
  return data;
};

export const getMeServer = async (cookies?: string) => {
  const { data } = await axios.get(baseURL + "/users/me", {
    headers: { Cookie: cookies || "" },
    withCredentials: true,
  });
  return data;
};

export const checkSessionServer = async (cookies?: string) => {
  const { data } = await axios.get(baseURL + "/auth/session", {
    headers: { Cookie: cookies || "" },
    withCredentials: true,
  });
  return data;
};
