"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
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
    : idParam
    ? String(idParam)
    : "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !note && !!id,
    retry: false,
    refetchOnMount: false,
  });

  const currentNote = note || data;

  const handleClose = () => router.back();

  if (!id && !note) return null;

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {isLoading && !currentNote && <p>Loading note...</p>}
        {isError && <p>Note not found 😔</p>}

        {currentNote && (
          <div className={css.noteContent}>
            <h2 className={css.title}>{currentNote.title}</h2>
            <p className={css.content}>{currentNote.content}</p>
            <p className={css.tag}>Tag: {currentNote.tag}</p>
          </div>
        )}

        <button onClick={handleClose} className={css.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

