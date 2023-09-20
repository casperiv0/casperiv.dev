"use client";

import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";

export function Modal(props: Dialog.DialogProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="overflow-y-auto fixed flex justify-center inset-0 bg-black/40 z-50 py-12">
          <Dialog.Content className="relative overflow-hidden bg-primary z-50 max-w-7xl w-fit h-fit p-8 rounded-2xl border border-accent">
            {props.children}

            <Dialog.Close
              aria-label="Close modal"
              className="absolute top-0 right-0 p-3 bg-primary rounded-bl-2xl border-b border-l border-accent hover:bg-accent transition group"
            >
              <X className="w-6 h-6 fill-accent group-hover:fill-secondary" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
