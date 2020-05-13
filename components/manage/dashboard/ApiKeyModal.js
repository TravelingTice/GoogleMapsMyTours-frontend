import { useContext, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button, IconButton } from '@material-ui/core';
import Error from '../../Error';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { getCookie, isAuth } from '../../../actions/auth';
import { getApiKey, addApiKey, addOrigin, removeOrigin, updateGoogleApiKey } from '../../../actions/apikey';
import generateId from 'generate-unique-id';
import DeleteIcon from '@material-ui/icons/Delete';

const ApiKeyModal = () => {
  const { isApiKeyModal, setApiKeyModal, apiKeyModalError, setApiKeyModalError } = useContext(DashboardContext);
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);
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
    if (origin.match(/\//)) return setApiKeyModalError('Don\'t include any sub adresses');

    const data = await addOrigin(origin, apiKey.id, token);

    if (data.error) return setApiKeyModalError(data.error);

    // add origin to the api key
    setOrigin('');
    setApiKey({ ...apiKey, origins: apiKey.origins.concat(data.origin) });

  }

  const handleRemoveOrigin = origin => async e => {
    const data = await removeOrigin(origin.id, token);

    if (data.error) return setApiKeyModalError(data.error);

    setApiKey({ ...apiKey, origins: apiKey.origins.filter(or => or.id !== origin.id) });
  }

  const handleGoogleKeyChange = async e => {
    setApiKey({ ...apiKey, googleKey: e.target.value });

    if (e.target.value) {
      const data = await updateGoogleApiKey(e.target.value, apiKey.id, token);
      console.log(data);
    }
  }

  const showGoogleKeyForm = () => (
    <div className="mb-3">
      <p>Fill in your Google Api Key to use your map:</p>
      <FormGroup>
        <FormControl>
          <Input value={apiKey.googleKey} onChange={handleGoogleKeyChange} />
        </FormControl>
      </FormGroup>
      <small className="text-muted font-italic">And make sure you enable the domain you will use for the key ON GOOGLE</small>
    </div>
  )

  const listOrigins = () => apiKey.origins.map(origin => (
    <div key={origin.id} className="d-flex justify-content-between">
      <span className="p-2 mr-2 mb-2" style={{backgroundColor: '#ddd', borderRadius: 5 }}>{origin.address}</span>
      <IconButton onClick={handleRemoveOrigin(origin)} color="primary"><DeleteIcon/></IconButton>
    </div>
  ))

  const showOriginsForm = () => (
    <Form onSubmit={handleSubmit} className="mt-4">
      <p>Domains:</p>
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
            <p onClick={() => setReveal(true)} className="text-muted font-italic pr-3 mb-4">{reveal ? apiKey.key : 'Key generated! (click to reveal)'}</p>
            {showGoogleKeyForm()}
            {showOriginsForm()}
          </>
        )}


      </ModalBody>
    </Modal>
  )
}

export default ApiKeyModal;
