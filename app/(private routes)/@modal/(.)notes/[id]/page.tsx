import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreviewClient from "./NotePreview.client";
import { notFound } from "next/navigation";
import type { Note } from "@/types/note";
import axios from "axios";

interface Props {
  params: { id?: string };
}

export default async function NotePreviewModal({ params }: Props) {
  const id = params.id;

  if (!id) {
    return null;
  }

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
      <NotePreviewClient note={note} />
    </HydrationBoundary>
  );
}
