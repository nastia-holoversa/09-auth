import type { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description:
    "Start a new note in NoteHub — organize your thoughts and ideas effortlessly with tags and quick search.",
  openGraph: {
    title: "Create Note | NoteHub",
    description:
      "Write and save a new note in NoteHub. Keep your ideas organized and accessible anytime.",
    url: "https:/08-zustand-navy-three.vercel.app//notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}


