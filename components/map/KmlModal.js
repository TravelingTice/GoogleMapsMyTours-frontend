import { useContext, useState } from "react";
import { MarkerIconContext } from '../../../contexts/MarkerIconContext';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { getCookie } from "../../../actions/auth";
import Error from '../../Error';
import CodeIcon from '@material-ui/icons/Code';

const MarkerCrudModal = () => {
  const { isKmlModal, setKmlModal } = useContext(MarkerIconContext);
  const isEdit = false;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const token = getCookie('token');

  const closeModal = () => setKmlModal(false);

  const handleNameChange = e => {
    setError('');
    setName(e.target.value);
  }

  const handleFileChange = async e => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('ya');
  }

  const handleRemove = e => {
    console.log('ya');
  }

  const showSubmitButton = () => {
    let text = 'Create';
    if (isEdit) text = 'Update';
    if (loading) text = <img style={{height: '0.875rem'}} src="/loading.svg" alt="Loading..."/>
    return <Button color='primary' type="submit" variant='outlined'>{text}</Button>
  }

  const showDeleteButton = () => (
    <Button color="secondary" onClick={handleRemove} variant="outlined">Delete</Button>
  )

  const showError = () => error && <Error content={error} />
  
  return (
    <Modal isOpen={isKmlModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Kml File</ModalHeader>

      <ModalBody>
        {showError()}
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" onChange={handleNameChange} value={name} />
            </FormControl>
          </FormGroup>

          <FormGroup className="my-4">
            <label className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" htmlFor="icon">
              <span className="MuiButton-label">
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                  <CodeIcon />
                </span>
                Upload Kml
              </span>
              <span className="MuiTouchRipple-root"></span>
            </label>

            <input type="file" id="icon" hidden onChange={handleFileChange}/>

          </FormGroup>

          <div className="mt-3 d-flex justify-content-between">
            {showSubmitButton()}
            {isEdit && showDeleteButton()}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default MarkerCrudModal;
