import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./[...slug]/Notes.client";
import { fetchNotesServer } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

export default async function NotesPage() {
  const cookieStore = cookies().toString();
  const queryClient = new QueryClient();

  const queryParams = { page: 1, perPage: 12 };

  await queryClient.prefetchQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotesServer(queryParams, cookieStore),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

