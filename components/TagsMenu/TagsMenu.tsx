"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./TagsMenu.module.css";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleNavigation = (tag: string) => {
    closeMenu();
    if (tag === "All") {
      router.push("/notes/filter/all");
    } else {
      router.push(`/notes/filter/${tag}`);
    }
  };

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle notes filter menu"
      >
        Notes
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <button
                className={css.menuLink}
                onClick={() => handleNavigation(tag)}
              >
                {tag === "All" ? "All notes" : tag}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
