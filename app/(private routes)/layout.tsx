import type { ReactNode } from "react";
import css from "./NotesLayout.module.css";

export default function NotesLayout({
  children,
  modal, 
}: {
  children: ReactNode;
  modal: ReactNode; 
}) {
  return (
    <div className={css.layout}>
      <main className={css.content}>{children}</main>
      {modal}
    </div>
  );
}
