import { useContext, useState } from "react";
import { MarkerIconContext } from '../../../contexts/MarkerIconContext';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import styled from 'styled-components';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const ButtonLabel = styled.label`

`;

const MarkerCrudModal = () => {
  const { isModal, closeModal, editId } = useContext(MarkerIconContext);
  const [imgPreview, setPreview] = useState('');
  const [name, setName] = useState('');

  const handleChange = e => setName(e.target.value);

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {

    }
  }

  const handleSubmit = e => {

  }

  return (
    <Modal isOpen={isModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Marker Icon</ModalHeader>

      <ModalBody>
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" onChange={handleChange('name')} value={name} />
            </FormControl>
          </FormGroup>

          <FormGroup className="my-4">
            <ButtonLabel className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" htmlFor="icon">
              <span className="MuiButton-label">
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                  <CloudUploadIcon />
                </span>
                Upload Icon
              </span>
              <span className="MuiTouchRipple-root"></span>
            </ButtonLabel>

            <input type="file" id="icon" hidden onChange={handleImageChange}/>

          </FormGroup>


          <div className="mt-3">
            <Button color='primary' type="submit" variant='outlined'>{!editId ? 'Create': 'Update'}</Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default MarkerCrudModal;
