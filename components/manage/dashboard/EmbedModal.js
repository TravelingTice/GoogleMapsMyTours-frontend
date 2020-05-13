import { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input } from '@material-ui/core';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { getCookie } from '../../../actions/auth';
import { getApiKey } from '../../../actions/apikey';
import { getCodeForMap } from '../../../actions/map';
import ReactMarkdown from 'react-markdown';

const EmbedModal = () => {
  const { isEmbedModal, setEmbedModal, selectedMap, setApiKeyModalError, setApiKeyModal } = useContext(DashboardContext);
  const [input, setInput] = useState('`loading ...`');
  const [height, setHeight] = useState(100);

  const closeModal = () => setEmbedModal(false);

  const token = getCookie('token');

  useEffect(() => {
    if (isEmbedModal) {
      fetchCodeData();
    }
  }, [isEmbedModal]);

  const fetchCodeData = async () => {
    const { apiKey } = await getApiKey(token);

    if (!apiKey) {
      setEmbedModal(false);
      setApiKeyModal(true);
      setApiKeyModalError('You don\'t have any api keys yet');
      return;
    }

    const { code } = await getCodeForMap(selectedMap.id, apiKey, token);

    setInput(code);
  }
  
  return (
    <Modal isOpen={isEmbedModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Embed map {selectedMap.name}</ModalHeader>

      <ModalBody>

        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="height">Height of map container (in px)</InputLabel>
            <Input type="number" value={height} onChange={e => setHeight(parseInt(e.target.value))} />
          </FormControl>
          </FormGroup>

          <p className="text-muted font-italic my-3">Paste the following code on your website to show your map!</p>

        <ReactMarkdown source={input} />
      </ModalBody>
    </Modal>
  )
}

export default EmbedModal;
