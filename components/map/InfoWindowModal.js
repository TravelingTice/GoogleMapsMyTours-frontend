import { MapContext } from "../../contexts/MapContext";
import { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';

const InfoWindowModal = () => {
  const { isInfoWindowModal } = useContext(MapContext);

  // TODOOOO: marker editing id? for the infowindow, very important

  return (
    <Modal isOpen={isInfoWindowModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Marker Icon</ModalHeader>

      <ModalBody>
        {showError()}
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" onChange={handleChange} value={name} />
            </FormControl>
          </FormGroup>

          {mapWrapper(showImgPreview())}

          <FormGroup className="my-4">
            <label className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" htmlFor="icon">
              <span className="MuiButton-label">
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                  <CloudUploadIcon />
                </span>
                Upload Icon
              </span>
              <span className="MuiTouchRipple-root"></span>
            </label>

            <input type="file" id="icon" hidden onChange={handleImageChange}/>

          </FormGroup>

          {showDimensionsEdit()}

          <div className="mt-3 d-flex justify-content-between">
            {showSubmitButton()}
            {editId && showDeleteButton()}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default InfoWindowModal;
