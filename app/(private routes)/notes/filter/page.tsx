import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import NotesClient from "@/app/(private routes)/notes/filter/[...slug]/Notes.client";

export default async function NotesFilterIndexPage() {
  const queryClient = new QueryClient();

  const queryParams = { page: 1, perPage: 12 }; 

  const data = await fetchNotes(queryParams);
  queryClient.setQueryData(["notes", queryParams], data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag="All" /> 
    </HydrationBoundary>
  );
}
