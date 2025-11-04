import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getMeServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "NoteHub — create and organize your notes easily",
  description: "NoteHub is a modern note management app that helps you create, organize, and search your notes quickly and efficiently.",
  openGraph: {
    title: "NoteHub — create and organize your notes easily",
    description: "Keep your ideas organized and accessible anywhere with NoteHub — your personal space for smart note-taking.",
    url: "https://09-auth-five-snowy.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile Page",
      },
    ],
  },
};

export default async function ProfilePage() {
  const res = await getMeServer();
  const user = res.data;

  if (!user) {
    return (
      <main className={css.mainContent}>
        <p>User not found</p>
      </main>
    );
  }

  const avatarSrc = user.avatar || "/default-avatar.png";

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            unoptimized
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
