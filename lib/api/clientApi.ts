import axios from "axios";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

const client = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const register = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await client.post("/auth/register", {
    email,
    password,
  });
  return data;
};


export const login = async (credentials: { email: string; password: string }) => {
  const { data } = await client.post<User>("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  await client.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await client.get<User | null>("/auth/session");
  return data;
};

export const getMe = async () => {
  const { data } = await client.get<User>("/users/me");
  return data;
};

export const updateMe = async (user: Partial<User>) => {
  const { data } = await client.patch<User>("/users/me", user);
  return data;
};

export const fetchNotes = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}) => {
  const { data } = await client.get("/notes", { params });
  return data; 
};

export const fetchNoteById = async (id: string) => {
  const { data } = await client.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}) => {
  const { data } = await client.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await client.delete(`/notes/${id}`);
  return data;
};
