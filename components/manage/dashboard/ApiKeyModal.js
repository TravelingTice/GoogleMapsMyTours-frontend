import { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button, IconButton } from '@material-ui/core';
import Error from '../../Error';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { getCookie, isAuth } from '../../../actions/auth';
import { getApiKey, addApiKey, addOrigin } from '../../../actions/apikey';
import generateId from 'generate-unique-id';
import DeleteIcon from '@material-ui/icons/Delete';

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

    // add origin to the api key
    setApiKey({ ...apiKey, origins: apiKey.origins.concat({ address: origin }) });

    const data = await addOrigin(origin, apiKey.id, token);

    if (data.error) setApiKeyModalError(data.error);
  }

  const listOrigins = () => apiKey.origins.map(origin => (
    <div className="d-flex justify-content-between">
      <span className="p-2 mr-2 mb-2" style={{backgroundColor: '#ddd', borderRadius: 5 }}>{origin.address}</span>
      <IconButton color="primary"><DeleteIcon/></IconButton>
    </div>
  ))

  const showOriginsForm = () => (
    <Form onSubmit={handleSubmit}>
      <p>Origins:</p>
      {listOrigins()}
      <FormGroup className="mt-3">
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
      <ModalHeader toggle={closeModal}>Manage my Api Key</ModalHeader>

      <ModalBody style={{overflow: 'scroll', paddingBottom: 50}}>
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
