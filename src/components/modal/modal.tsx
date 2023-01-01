import * as Dialog from "@radix-ui/react-dialog";
import { X } from "react-bootstrap-icons";

export function Modal(props: Dialog.DialogProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="overflow-y-auto fixed flex justify-center inset-0 bg-black/40 z-40 py-8">
          <Dialog.Content className="relative overflow-hidden bg-primary z-50 max-w-5xl w-fit h-fit p-4 rounded-md border border-secondary">
            {props.children}

            <Dialog.Close
              aria-label="Close modal"
              className="absolute top-0 right-0 p-3 bg-primary rounded-bl-md border-b border-l border-secondary"
            >
              <X className="w-6 h-6" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}