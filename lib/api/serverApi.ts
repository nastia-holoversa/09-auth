import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

export const fetchNotesServer = async (
  params?: Record<string, string | number>
): Promise<AxiosResponse<{ notes: Note[]; totalPages: number }>> => {
  return api.get("/notes", {
    params,
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
};

export const fetchNoteByIdServer = async (
  id: string
): Promise<AxiosResponse<Note>> => {
  return api.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
};

export const getMeServer = async (): Promise<AxiosResponse<User>> => {
  return api.get("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
};

export const checkSessionServer = async (): Promise<
  AxiosResponse<User | null>
> => {
  return api.get("/auth/session", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
};
