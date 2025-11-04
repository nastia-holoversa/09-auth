import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

export const register = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data } = await api.post("/auth/register", { email, password, username });
  return data;
};

export const login = async (credentials: { email: string; password: string }) => {
  const { data } = await api.post<User>("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get<User | null>("/auth/session");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (user: Partial<User>) => {
  const { data } = await api.patch<User>("/users/me", user);
  return data;
};

export const fetchNotes = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}) => {
  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: {
  title: string;
  content: string;
  tag: NoteTag;
}) => {
  const { data } = await api.post("/notes", { title, content, tag });
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
