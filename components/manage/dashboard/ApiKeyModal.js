import { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Error from '../../Error';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { getCookie } from '../../../actions/auth';
import { getApiKey } from '../../../actions/apikey';
import generateId from 'generate-unique-id';

const ApiKeyModal = () => {
  const { isApiKeyModal, setApiKeyModal, apiKeyModalError, setApiKeyModal } = useContext(DashboardContext);
  const [apiKey, setApiKey] = useState(null);

  const closeModal = () => setApiKeyModal(false);

  const token = getCookie('token');

  useEffect(() => {
    fetchApiKey();
  }, []);

  const generateApiKey = () => {
    const key = `GMMT_${generateId}${isAuth().username}${generateId()}`;
    setApiKey({ key });
  }

  const fetchApiKey = async () => {
    const { apiKey } = await getApiKey(token);
    setApiKey(apiKey);

  }

  const showError = () => apiKeyModalError && <Error content={apiKeyModalError} />
  
  return (
    <Modal isOpen={isApiKeyModal} toggle={closeModal}>
      {showError()}
      <ModalHeader toggle={closeModal}>Manage my Api Keys</ModalHeader>

      <ModalBody>

        {!apiKey ? (
          <Button onClick={generateApiKey} color="primary" variant="contained">Generate</Button>
        ) : (
          <p className="text-muted font-italic">{apiKey.key}</p>
        )}


      </ModalBody>
    </Modal>
  )
}

export default ApiKeyModal;
