import { useContext } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { DashboardContext } from "../../../contexts/DashboardContext";
import ReactMarkdown from 'react-markdown';

const EmbedModal = () => {
  const { isEmbedModal, setEmbedModal, selectedMap } = useContext(DashboardContext);

  const closeModal = () => setEmbedModal(false);

  const input = `\`Yo\``
  
  return (
    <Modal isOpen={isEmbedModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Embed map {selectedMap.name}</ModalHeader>

      <ModalBody>
        <ReactMarkdown source={input} />
      </ModalBody>
    </Modal>
  )
}

export default EmbedModal;
