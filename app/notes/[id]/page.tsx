// import { fetchNoteById } from "@/lib/api";
// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NoteDetails = async ({ params }: Props) => {
//   const { id } = await params;
//   const note = await fetchNoteById(id);
//   console.log(note);

//   return <div>NoteDetails</div>;
// };

// export default NoteDetails;

// import { dehydrate } from "@tanstack/react-query";
// import { HydrationBoundary } from "@tanstack/react-query";

import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.Client";
import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage(props: Props) {
  const { id } = await props.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
