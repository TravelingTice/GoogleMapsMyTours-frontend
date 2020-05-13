import { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Error from '../../Error';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { getCookie, isAuth } from '../../../actions/auth';
import { getApiKey, addApiKey } from '../../../actions/apikey';
import generateId from 'generate-unique-id';

const ApiKeyModal = () => {
  const { isApiKeyModal, setApiKeyModal, apiKeyModalError, setApiKeyModalError } = useContext(DashboardContext);
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeModal = () => setApiKeyModal(false);

  const token = getCookie('token');

  useEffect(() => {
    fetchApiKey();
  }, []);

  const generateApiKey = () => {
    setApiKeyModalError('');
    setLoading(true);
    const generatedKey = `GMMT_${generateId()}${isAuth().username}${generateId()}`;

    const data = await addApiKey(generatedKey, token);

    if (data.error) return setApiKeyModalError(data.error);

    setApiKey(data.apiKey);
  }

  const fetchApiKey = async () => {
    const { apiKey } = await getApiKey(token);
    if (apiKey) {
      setApiKey(apiKey);
    }
  }

  const showOriginsForm = () => (
    <Form onSubmit={handleSubmit}>

    </Form>
  )

  const showButton = () => {
    let text = 'Generate';
    if (loading) text = <img style={{height: '0.875rem'}} src="/loading-white.svg" alt="Loading..."/>;

    return <Button color="primary" variant="contained" onClick={generateApiKey}>{text}</Button>
  }

  const showError = () => apiKeyModalError && <Error content={apiKeyModalError} />
  
  return (
    <Modal isOpen={isApiKeyModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Manage my Api Keys</ModalHeader>

      <ModalBody style={{overflow: 'scroll'}}>
        {showError()}

        {!apiKey ? showButton() : (
          <>
            <p className="text-muted font-italic mr-3">{apiKey.key}</p>
            {showOriginsForm()}
          </>
        )}


      </ModalBody>
    </Modal>
  )
}

export default ApiKeyModal;
