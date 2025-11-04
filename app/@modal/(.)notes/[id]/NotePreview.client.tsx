"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreviewClient.module.css";

interface NotePreviewClientProps {
  note?: Note;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const params = useParams();
  const router = useRouter();

  const idParam = params?.id;
  const id = Array.isArray(idParam)
    ? idParam[0]
    : typeof idParam === "string"
    ? idParam
    : "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id && !note,
    retry: false,
    refetchOnMount: false,
  });

  const currentNote = note || data;

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      {!id && !note && <p>Note ID is missing</p>}

      {isLoading && !currentNote && <p>Loading note...</p>}

      {isError && <p>Note not found 😔</p>}

      {currentNote && (
        <div className={css.noteContent}>
          <h2 className={css.title}>{currentNote.title}</h2>
          <p className={css.content}>{currentNote.content}</p>
          <p className={css.tag}>Tag: {currentNote.tag}</p>
        </div>
      )}
    </Modal>
  );
}
