import { useContext } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { DashboardContext } from "../../../contexts/DashboardContext";

const EmbedModal = () => {
  const { isEmbedModal, setEmbedModal, selectedMap } = useContext(DashboardContext);

  const closeModal = setEmbedModal(false);
  
  return (
    <Modal isOpen={isEmbedModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Embed map {selectedMap.name}</ModalHeader>

      <ModalBody>

      </ModalBody>
    </Modal>
  )
}

export default EmbedModal;
