'use client';

import React, { createContext, useContext, useState } from 'react';

type ModalType = 'signin' | 'demo' | null;

interface ModalContextType {
  openModal: ModalType;
  openSignIn: () => void;
  openDemo: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openSignIn = () => setOpenModal('signin');
  const openDemo = () => setOpenModal('demo');
  const closeModal = () => setOpenModal(null);

  return (
    <ModalContext.Provider value={{ openModal, openSignIn, openDemo, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}
