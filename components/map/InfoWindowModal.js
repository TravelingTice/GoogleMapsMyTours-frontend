import { MapContext } from "../../contexts/MapContext";
import { useContext, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { Button, FormGroup, FormControl, Input, InputLabel } from '@material-ui/core';
import convertToBase64 from '../../helpers/convertToBase64';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const InfoWindowModal = () => {
  const { isInfoWindowModal, markerEditId, findMarkerByRefId, markers } = useContext(MapContext);
  const isEdit = !!markerEditId;

  const [values, setValues] = useState({
    title: '',
    body: '',
    youtube: '',
    image: '',
    markerRefId: ''
  });

  const { title, body, youtube, image, markerRefId } = values;

  useEffect(() => {
    if (isInfoWindowModal) {
      if (isEdit) {
        
      } else {
        // new marker, which means we only need to attach the last marker that was added to this marker ref id value
        setValues({
          title: '',
          body: '',
          youtube: '',
          image: '',
          markerRefId: markers[markers.length - 1].refId
        })
      }
    }
  }, [isInfoWindowModal]);

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  }

  const handleImageChange = async e => {
    if (e.target.files && e.target.files[0]) {
      const prev = await convertToBase64(e.target.files[0]);

      if (prev) {
        setPreview(prev);
        setTimeout(() => setDimensionsForm(true), 600);
      };
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  const closeModal = () => {
    if (!isEdit) {
      // clear the last marker because no infowindow is attached to it

    }
  }

  const showSubmitButton = () => (
    <Button color="primary" variant="outlined">{isEdit ? 'Update' : 'Create'}</Button>
  )
  
  const showDeleteButton = () => (
    <Button color="secondary" variant="outlined">Delete</Button>
  )

  return (
    <Modal isOpen={isInfoWindowModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Info Window</ModalHeader>

      <ModalBody>
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="title">title</InputLabel>
              <Input id="title" onChange={handleChange(title)} value={title} />
            </FormControl>
          </FormGroup>

          <FormGroup className="my-4">
            <label className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" htmlFor="icon">
              <span className="MuiButton-label">
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                  <CloudUploadIcon />
                </span>
                Upload image
              </span>
              <span className="MuiTouchRipple-root"></span>
            </label>

            <input type="file" id="icon" hidden onChange={handleImageChange}/>

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

export default InfoWindowModal;
