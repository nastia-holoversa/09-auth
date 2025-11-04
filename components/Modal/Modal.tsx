"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; 
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else router.back();
  }, [onClose, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        {children}
        <button className={css.closeBtn} onClick={handleClose} aria-label="Close">
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
