// PreviewSliderContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface PreviewSliderType {
  isModalPreviewOpen: boolean;
  currentPreviewIndex: number | null;
  openPreviewModal: (index: number) => void;
  closePreviewModal: () => void;
  setCurrentPreviewIndex: (index: number) => void; // <-- thêm
}

const PreviewSlider = createContext<PreviewSliderType | undefined>(undefined);

export const usePreviewSlider = () => {
  const context = useContext(PreviewSlider);
  if (!context) throw new Error("usePreviewSlider must be used within a PreviewSliderProvider");
  return context;
};

export const PreviewSliderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalPreviewOpen, setIsModalOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndexState] = useState<number | null>(0);

  const openPreviewModal = (index: number) => {
    setCurrentPreviewIndexState(index);
    setIsModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsModalOpen(false);
    setCurrentPreviewIndexState(null);
  };

  // expose setter so consumers can update index
  const setCurrentPreviewIndex = (index: number) => {
    setCurrentPreviewIndexState(index);
  };

  return (
    <PreviewSlider.Provider
      value={{
        isModalPreviewOpen,
        currentPreviewIndex,
        openPreviewModal,
        closePreviewModal,
        setCurrentPreviewIndex,
      }}
    >
      {children}
    </PreviewSlider.Provider>
  );
};
