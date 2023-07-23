"use client";

import { on } from "events";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Utils/Button";

interface ModelProps {
  disabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  isLoading?: boolean;
}
const Modal: React.FC<ModelProps> = ({
  actionLabel,
  body,
  disabled,
  isOpen,
  onClose,
  onSubmit,
  title,
  footer,
  secondaryAction,
  secondaryActionLabel,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [disabled, onClose]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      <div
        className="
        fixed top-0 left-0 bg-transparent z-30 w-full h-screen"
      >
        <div className="bg-neutral-500/60 absolute top-0 z-30 left-0 w-full h-full"></div>

        <div
          className="
            relative
            flex items-center
            justify-center
            w-full
            h-full
            z-40
            py-4
        "
        >
          <div
            className={`
            w-full 
            max-h-full
            h-fit
            p-4 
            md:w-4/6 
            lg:w-3/6 
            xl:w-2/5 
            rounded
            bg-white 
            outline-none 
            focus:outline-none
            relative
            overflow-x-hidden
            overflow-y-auto
            transition-all
            duration-300
            ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }
            `}
          >
            <button onClick={handleClose} className="absolute left-5 top-5">
              <AiOutlineClose
                size={18}
                className="
                    text-neutral-600 
                    hover:opacity-70 
                    active:opacity-60
                "
              />
            </button>
            {/**model title */}
            <h1
              className="
                text-lg 
                md:text-xl 
                text-center 
                lg:text-2xl
                font-semibold
                "
            >
              {title}
            </h1>
            {/**body */}
            <div
              className="
              flex-auto py-4
              border-b
            "
            >
              {body}
            </div>
            {/**model action */}
            <div className="flex items-center py-4 gap-4 flex-row">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  outline
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                />
              )}
              <Button
                isLoading={isLoading}
                disabled={disabled}
                label={actionLabel}
                onClick={handleSubmit}
              />
            </div>
            {/**footer */}
            {footer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
