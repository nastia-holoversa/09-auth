"use client";

import css from "./SidebarNotes.module.css";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Sidebar() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a
              href={tag === "All" ? "/notes/filter/all" : `/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
