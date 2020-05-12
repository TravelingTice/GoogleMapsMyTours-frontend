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

const LineModal = () => {
  const { isLineModal, lineEditId, setLineModal, findLineById, lines, onAddLine, onUpdateLine, lineError, setLineError, onRemoveLine } = useContext(MapContext);

  const isEdit = !!lineEditId;

  const [values, setValues] = useState({
    strokeColor: '#000000',
    strokeOpacity: 1,
    strokeWeight: 1
  });

  const { strokeColor, strokeOpacity, strokeWeight } = values;

  useEffect(() => {
    if (isLineModal) {
      if (isEdit) {
        const line = findLineById(lineEditId);
        setValues({ ...line });
      } else {
        // new marker, which means we only need to attach the last marker that was added to this marker ref id value
        setValues({
          strokeColor: '#000000',
          strokeOpacity: 1,
          strokeWeight: 1
        })
      }
    }
  }, [isLineModal]);

  const handleChange = name => e => {
    setLineError('');
    setValues({ ...values, [name]: e.target.value });
  }

  const handleSubmit = e => {
    setLineError('');
    e.preventDefault();
    if (isEdit) {
      onUpdateLine(values);
    } else {
      onAddLine(values);
    }
  }

  const closeModal = () => {
    if (!isEdit) {

    } else {
      setLineModal(false);
    }
  }

  const showSubmitButton = () => <Button type="submit" color="primary" variant="outlined">{isEdit ? 'Update' : 'Create'}</Button>
  
  const showDeleteButton = () => <Button onClick={onRemoveLine} color="secondary" variant="outlined">Delete</Button>

  const showError = () => lineError && <Error content={lineError} />

  return (
    <Modal isOpen={isLineModal} toggle={closeModal}>
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

export default LineModal;
