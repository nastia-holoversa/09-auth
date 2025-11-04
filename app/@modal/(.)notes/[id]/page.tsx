import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";
import Modal from "@/components/Modal/Modal";
import { notFound } from "next/navigation";
import type { Note } from "@/types/note";
import axios from "axios";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewModal({ params }: Props) {
  const { id } = await params;

  if (!id) return null;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: async () => {
        const res = await fetchNoteByIdServer(id);
        return res.data;
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  const note = queryClient.getQueryData<Note>(["note", id]);

  return (
    <Modal>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient note={note} />
      </HydrationBoundary>
    </Modal>
  );
}
