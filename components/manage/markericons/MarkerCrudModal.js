import { useContext, useState, useEffect } from "react";
import { MarkerIconContext } from '../../../contexts/MarkerIconContext';
import { Modal, ModalHeader, ModalBody, Form, Row, Col } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import convertToBase64 from "../../../helpers/convertToBase64";
import { Image, Transformation } from 'cloudinary-react';
import { Motion, spring } from 'react-motion';
import { getCookie } from "../../../actions/auth";
import Error from '../../Error';

const MarkerCrudModal = () => {
  const { isModal, closeModal, editId, handleCreateUpdate, modalError, modalLoading, findMarkerIconById, onRemoveMarkerIcon } = useContext(MarkerIconContext);
  const [imgPreview, setPreview] = useState(null);
  const [cloudinaryImg, setCloudinaryImg] = useState('');
  const [name, setName] = useState('');
  const [isDimensionsForm, setDimensionsForm] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: 50,
    width: 50,
    anchorX: 50,
    anchorY: 25
  });

  const { height, width, anchorX, anchorY } = dimensions;

  const token = getCookie('token');

  useEffect(() => {
    if (isModal) {
      if (editId) {
        const selectedIcon = findMarkerIconById(editId);
        const { name, image, height, width, anchorX, anchorY } = selectedIcon;
        setName(name);
        setCloudinaryImg(image);
        setPreview('');
        setDimensions({
          height,
          width,
          anchorX,
          anchorY
        });
        setDimensionsForm(true);
      } else {
        setName('');
        setCloudinaryImg('');
        setPreview('');
        setDimensions({
          height: 50,
          width: 50,
          anchorX: 50,
          anchorY: 25
        });
        setDimensionsForm(false);
      }
    }
  }, [isModal])

  const handleChange = e => setName(e.target.value);

  const handleImageChange = async e => {
    if (e.target.files && e.target.files[0]) {
      const prev = await convertToBase64(e.target.files[0]);

      if (prev) {
        setPreview(prev);
        setTimeout(() => setDimensionsForm(true), 600);
      };
    }
  }

  const handleDimensionChange = name => e => {
    setDimensions({ ...dimensions, [name]: e.target.value });
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
    const height = isOpen ? 230: 0;

    return (
      <Motion style={{height: spring(height)}}>{({height}) => 
        <div className="d-flex align-items-center" style={{height, overflow: 'hidden'}}>
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
        <Transformation crop="fill" width="150" />
      </Image>
    )
    return null;
  }

  const showDimensionsEdit = () => {
    const divHeight = isDimensionsForm ? 200 : 0;
    return (
      <Motion style={{divHeight: spring(divHeight)}}>{({divHeight}) =>
        <div style={{height: divHeight, overflow: 'hidden'}}>
          <Row>
            <Col xs="12">
              <p className="m-0">Dimensions</p>
            </Col>
            <Col xs="6">
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="width">Width</InputLabel>
                  <Input id="width" onChange={handleDimensionChange('width')} value={width} />
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs="6">
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="height">Height</InputLabel>
                  <Input id="height" onChange={handleDimensionChange('height')} value={height} />
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
        
          <Row className="mt-4">
            <Col xs="12">
              <p className="m-0">Anchor point</p>
            </Col>
            <Col xs="6">
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="anchorX">X</InputLabel>
                  <Input id="anchorX" onChange={handleDimensionChange('anchorX')} value={anchorX} />
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs="6">
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="anchorY">Y</InputLabel>
                  <Input id="anchorY" onChange={handleDimensionChange('anchorY')} value={anchorY} />
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
        </div>
      }</Motion>
    )
  }

  const showSubmitButton = () => {
    let text = 'Create';
    if (editId) text = 'Update';
    if (modalLoading) text = <img style={{height: '0.875rem'}} src="/loading.svg" alt="Loading..."/>
    return <Button color='primary' type="submit" variant='outlined'>{text}</Button>
  }

  const showDeleteButton = () => (
    <Button color="secondary" onClick={onRemoveMarkerIcon} variant="outlined">Delete</Button>
  )

  const showError = () => modalError && <Error content={modalError} />
  
  return (
    <Modal isOpen={isModal} toggle={closeModal}>
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

export default MarkerCrudModal;
