import { useContext, useEffect, useState, useRef } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input } from '@material-ui/core';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { getCookie } from '../../../actions/auth';
import { getApiKey } from '../../../actions/apikey';
import { getCodeForMap } from '../../../actions/map';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const EmbedModal = () => {
  const { isEmbedModal, setEmbedModal, selectedMap, setApiKeyModalError, setApiKeyModal } = useContext(DashboardContext);
  const [htmlCode, setHtmlCode] = useState(''); 
  const [input, setInput] = useState('loading ...');
  const [height, setHeight] = useState(400);
  const [copied, setCopied] = useState(false);
  
  const closeModal = () => setEmbedModal(false);
  
  const token = getCookie('token');
  
  useEffect(() => {
    if (copied) {
      setCopied(true);
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [copied]);

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

    const htmlCode = await getCodeForMap(selectedMap.id, apiKey.key, token);
    setHtmlCode(htmlCode);
    setInput(htmlCode.replace('HEIGHT', `${height}px`));
  }

  useEffect(() => {
    setInput(htmlCode.replace('HEIGHT', `${height}px`));
  }, [height]);

  
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

        <p className="text-muted font-italic my-3">Paste the following code on your website to show your map! (Click to copy)</p>

        {copied && (
          <p className="text-success">Text copied!</p>
          )}

        <CopyToClipboard text={input} onCopy={() => setCopied(true)}>
          <p style={{fontFamily: 'Mono'}}>{input}</p>
        </CopyToClipboard>
      </ModalBody>
    </Modal>
  )
}

export default EmbedModal;
