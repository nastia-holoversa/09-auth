"use client";

import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import css from "./Notes.client.module.css";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

import { fetchNotes } from "@/lib/api/clientApi";
import type { Note, NoteTag } from "@/types/note";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: NoteTag | "All";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const queryParams = useMemo(() => {
    const base = { page: currentPage, perPage: PER_PAGE, search: debouncedSearch };

    if (tag && tag !== "All") {
      return { ...base, tag };
    }
    return base;
  }, [tag, currentPage, debouncedSearch]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: () => queryClient.getQueryData(["notes", queryParams]),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  const notes: Note[] = data?.notes || [];
  const totalPages: number = data?.totalPages || 1;

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    console.error("❌ Error while fetching notes:", error);
    const message = error instanceof Error ? error.message : "Failed to load notes.";
    return <p>{message}</p>;
  }

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />

      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <Link href="/notes/action/create" className={css.button}>
          + Create note
        </Link>
      </header>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p className={css.empty}>No notes found ✨</p>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        />
      )}
    </div>
  );
}
