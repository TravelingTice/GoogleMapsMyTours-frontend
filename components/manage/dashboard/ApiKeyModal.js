import { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import Error from '../../Error';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { getCookie, isAuth } from '../../../actions/auth';
import { getApiKey, addApiKey, addOrigin } from '../../../actions/apikey';
import generateId from 'generate-unique-id';

const ApiKeyModal = () => {
  const { isApiKeyModal, setApiKeyModal, apiKeyModalError, setApiKeyModalError } = useContext(DashboardContext);
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('');

  const closeModal = () => setApiKeyModal(false);

  const token = getCookie('token');

  useEffect(() => {
    fetchApiKey();
  }, []);

  const generateApiKey = async () => {
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

  const handleChange = e => setOrigin(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    setApiKeyModalError('');
    // check the new origin
    if (origin.match(/https?/)) return setApiKeyModalError('Don\'t include http or https protocol');

    // add origin
    const data = await addOrigin(origin, apiKey.id, token);
  }

  const listOrigins = () => apiKey.origins.map(origin => (
    <p className="p-2 mr-2" style={{backgroundColor: '#bbb'}}></p>
  ))

  const showOriginsForm = () => (
    <Form onSubmit={handleSubmit}>
      <p>Origins:</p>
      {listOrigins()}
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="origins">Add origin</InputLabel>
          <Input value={origin} onChange={handleChange} />
        </FormControl>
      </FormGroup>
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
            <p className="text-muted font-italic pr-3">{apiKey.key}</p>
            {showOriginsForm()}
          </>
        )}


      </ModalBody>
    </Modal>
  )
}

export default ApiKeyModal;
