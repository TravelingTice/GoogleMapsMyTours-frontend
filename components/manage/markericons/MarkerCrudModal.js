import { useContext, useState } from "react";
import { MarkerIconContext } from '../../../contexts/MarkerIconContext';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import styled from 'styled-components';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import convertToBase64 from "../../../helpers/convertToBase64";
import { Image, Transformation } from 'cloudinary-react';
import { Motion, spring } from 'react-motion';
import { getCookie } from "../../../actions/auth";

const MarkerCrudModal = () => {
  const { isModal, closeModal, editId, handleCreateUpdate } = useContext(MarkerIconContext);
  const [imgPreview, setPreview] = useState(null);
  const [cloudinaryImg, setCloudinaryImg] = useState('');
  const [name, setName] = useState('');

  const token = getCookie('token');

  const handleChange = e => setName(e.target.value);

  const handleImageChange = async e => {
    if (e.target.files && e.target.files[0]) {
      const prev = await convertToBase64(e.target.files[0]);

      if (prev) setPreview(prev);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const markerIcon = {
      name,
      image: imgPreview
    }
    handleCreateUpdate(markerIcon);
  }

  const mapWrapper = icon => {
    const isOpen = imgPreview || cloudinaryImg;
    const height = isOpen ? 250: 0;

    return (
      <Motion style={{height: spring(height)}}>{({height}) => 
        <div className="d-flex align-items-center" style={{height: height, overflow: 'hidden'}}>
          <div style={{width: '100%', height: 200, backgroundImage: 'url(/map-preview.jpg)', backgroundPosition: 'center', backgroundSize: '700px'}}>
            <div className="d-flex w-100 h-100 align-items-center justify-content-center">
              {icon}
            </div>
          </div>
        </div>
      }</Motion>
    )
  }

  const showImgPreview = () => {
    if (imgPreview) return <img height="50" src={imgPreview} alt="Icon Preview" />;
    if (cloudinaryImg) return (
      <Image publicId={cloudinaryImg} height="50" alt="Icon Preview">
        <Transformation crop="fill" width="50" />
      </Image>
    )
    return null;
  }
  
  return (
    <Modal isOpen={isModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Marker Icon</ModalHeader>

      <ModalBody>
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


          <div className="mt-3">
            <Button color='primary' type="submit" variant='outlined'>{!editId ? 'Create': 'Update'}</Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default MarkerCrudModal;
