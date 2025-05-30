import React, { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";

interface ImageViewerProps {
  src: string;
  name: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, name }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      {/* Thumbnail */}
      <LazyLoadImage
        src={src}
        alt={name}
        effect="opacity"
        className="rounded-full cursor-pointer"
        width={45}
        height={45}
        onClick={openModal}
      />

      {/* Modal for full-screen image */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div
          className="flex justify-center item-center"
          onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
        >
          <img src={src} alt={name} className="max-w-full max-h-full rounded" />
        </div>
      </Modal>
    </>
  );
};

export default ImageViewer;
