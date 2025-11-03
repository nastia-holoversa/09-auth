import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi"; 
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";
import NotesClient from "./Notes.client";

interface Props {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0];
  const allowedTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  const isNoteTag = (value: unknown): value is NoteTag =>
    typeof value === "string" && allowedTags.includes(value as NoteTag);

  const validTag = tag && tag.toLowerCase() !== "all" && isNoteTag(tag) ? tag : "All";

  return {
    title:
      validTag === "All"
        ? "All Notes | NoteHub"
        : `${validTag} Notes | NoteHub`,
    description: "Browse your notes easily with filtering and search.",
  };
}

export default async function NotesFilterPage({ params }: Props) {
  const tag = params.slug?.[0];
  const queryClient = new QueryClient();

  const allowedTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const isValidTag = (value: unknown): value is NoteTag =>
    typeof value === "string" && allowedTags.includes(value as NoteTag);

  const queryParams =
    tag && tag.toLowerCase() !== "all" && isValidTag(tag)
      ? { tag, page: 1, perPage: 12 }
      : { page: 1, perPage: 12 };

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", queryParams],
      queryFn: () => fetchNotes(queryParams), 
    });
  } catch {
  }

  const validTag = tag && tag.toLowerCase() !== "all" && isValidTag(tag) ? tag : undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={validTag} />
    </HydrationBoundary>
  );
}
