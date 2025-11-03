import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import NoteDetailsClient from "./NotesDetails.client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import axios from "axios";
import type { Note } from "@/types/note";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: note.content?.slice(0, 100) || "Note preview",
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "The note you are looking for does not exist.",
    };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  const note = queryClient.getQueryData<Note>(["note", id]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient note={note} />
    </HydrationBoundary>
  );
}
