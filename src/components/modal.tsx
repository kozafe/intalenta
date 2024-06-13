import React, { ReactNode } from "react";

export interface ModalProps {
  isOpen?: boolean;
  children?: ReactNode;
  toggle: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen, toggle }) => {
  if (!isOpen) return null;

  return (
    <div className="main-modal-container">
      <div onClick={toggle} className="pointer">
        Close
      </div>
      {children}
    </div>
  );
};
