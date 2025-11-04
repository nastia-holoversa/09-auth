import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./[...slug]/Notes.client";
import { fetchNotesServer } from "@/lib/api/serverApi";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const queryParams = { page: 1, perPage: 12 };

  await queryClient.prefetchQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotesServer(queryParams).then((res) => res.data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

