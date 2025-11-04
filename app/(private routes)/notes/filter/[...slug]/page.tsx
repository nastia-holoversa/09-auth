import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotesServer } from "@/lib/api/serverApi";
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

// ✅ Метадані (асинхронні + await params — щоб не було помилки)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0];

  return {
    title: tag && tag.toLowerCase() !== "all" ? `${tag} Notes | NoteHub` : "All Notes | NoteHub",
    description: "Browse your notes easily with filtering and search.",
  };
}

export default async function NotesFilterPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug?.[0];
  const allowedTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const isValidTag = (v: unknown): v is NoteTag =>
    typeof v === "string" && allowedTags.includes(v as NoteTag);

  // ✅ Без undefined у tag → TypeScript більше не лається
  const baseParams = { page: 1, perPage: 12 };

  const queryParams: Record<string, string | number> =
    tag && tag.toLowerCase() !== "all" && isValidTag(tag)
      ? { ...baseParams, tag }
      : baseParams;

  // ✅ Prefetch із serverApi (правильно!)
  await queryClient.prefetchQuery({
  queryKey: ["notes", queryParams],
  queryFn: () => fetchNotesServer(queryParams).then(res => res.data),
});

  const validTag = tag && isValidTag(tag) ? tag : undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={validTag} />
    </HydrationBoundary>
  );
}
