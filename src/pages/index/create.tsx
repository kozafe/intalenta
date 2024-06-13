import { Modal } from "../../components/modal";
import { Book } from "./details";
import { EditDetailsComponent } from "./edit";

export const CreateModal = ({
  isOpen,
  toggle,
  onSubmit,
}: {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: Function;
}) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <EditDetailsComponent onSubmit={(val: Book) => onSubmit(val)} />
  </Modal>
);
