import { MapContext } from "../../contexts/MapContext";
import { useContext, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Form, Row, Col } from 'reactstrap';
import { Button, FormGroup, FormControl, Input, InputLabel, TextField, Checkbox } from '@material-ui/core';
import convertToBase64 from '../../helpers/convertToBase64';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Image, Transformation } from 'cloudinary-react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Error from '../Error';

const InfoWindowModal = () => {
  const { isInfoWindowModal, markerEditId, setInfoWindowModal, setMarkers, findInfoWindowByMarkerRefId, markers, onAddMarkerInfoWindow, onUpdateMarkerInfoWindow, error } = useContext(MapContext);
  const isEdit = !!markerEditId;

  const [values, setValues] = useState({
    title: '',
    body: '',
    date: new Date(),
    youtube: '',
    image: '',
    cloudinaryImage: '',
    option: 'youtube',
    markerRefId: ''
  });

  const { title, body, date, youtube, image, markerRefId, option, cloudinaryImage } = values;

  useEffect(() => {
    if (isInfoWindowModal) {
      if (isEdit) {
        const infoWindow = findInfoWindowByMarkerRefId(markerEditId);
        setValues({ ...infoWindow });
      } else {
        // new marker, which means we only need to attach the last marker that was added to this marker ref id value
        setValues({
          title: '',
          body: '',
          date: new Date(),
          youtube: '',
          image: '',
          cloudinaryImage: '',
          option: 'youtube',
          markerRefId: markers[markers.length - 1].refId
        })
      }
    }
  }, [isInfoWindowModal]);

  const handleChange = name => e => setValues({ ...values, [name]: e.target.value });

  const handleImageChange = async e => {
    if (e.target.files && e.target.files[0]) {
      const prev = await convertToBase64(e.target.files[0]);

      if (prev) {
        setValues({ ...values, image: prev });
      };
    }
  }

  const handleOptionChange = name => e => setValues({ ...values, option: name });

  const handleDateChange = date => setValues({ ...values, date });

  const handleSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      onUpdateMarkerInfoWindow(values);
    } else {
      onAddMarkerInfoWindow(values);
    }
  }

  const closeModal = () => {
    if (!isEdit) {
      // clear the attached marker because no infowindow is attached to it
      setMarkers(markers.filter(mark => mark.refId !== markerRefId));
      setInfoWindowModal(false);
    } else {
      setInfoWindowModal(false);
    }
  }

  const showPreview = () => {
    const isYoutube = option === 'youtube' && youtube 
    const isImage = option === 'image' && image;
    const isCloudinaryImage = option === 'image' && cloudinaryImage;

    if (isImage) return (
      <img src={image} alt="" style={{maxHeight: 130}} />
    )
    if (isCloudinaryImage) return (
      <Image publicId={cloudinaryImage} height="130">
        <Transformation height="200" crop="fill" />
      </Image>
    )
    if (isYoutube) return (
      <iframe width="200" height="130" src={`https://www.youtube.com/embed/${youtube}`}></iframe>
    )
    return null;
  }

  const showSubmitButton = () => <Button type="submit" color="primary" variant="outlined">{isEdit ? 'Update' : 'Create'}</Button>
  
  const showDeleteButton = () => <Button color="secondary" variant="outlined">Delete</Button>

  const showError = () => error && <Error content={error} />

  return (
    <Modal isOpen={isInfoWindowModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>{isEdit ? 'Edit' : 'Add'} Info Window</ModalHeader>

      <ModalBody>
        {showError()}
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" onChange={handleChange('title')} value={title} />
            </FormControl>
          </FormGroup>

          <FormGroup className="mt-3">
            <FormControl>
              <TextField
                id="body"
                label="Body"
                value={body}
                onChange={handleChange('body')}
                multiline
                rows={4}
              />
            </FormControl>
          </FormGroup>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date"
            label='Date'
            value={date}
            onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>

          <Row className="mt-3">
            <Col xs="2">
              <Checkbox
                className="mt-3"
                checked={option === 'youtube'}
                onChange={handleOptionChange('youtube')}
              />
            </Col>
            <Col xs="10">
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="youtube">Youtube Link Id</InputLabel>
                  <Input id="youtube" onChange={handleChange('youtube')} value={youtube} />
                </FormControl>
              </FormGroup>
            </Col>
          </Row>

          <div className="my-3">
            {showPreview()}
          </div>


          <Row>
            <Col xs="2">
              <Checkbox
                className="mt-3"
                checked={option === 'image'}
                onChange={handleOptionChange('image')}
              />
            </Col>
            <Col xs="10">
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
            </Col>
          </Row>



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
