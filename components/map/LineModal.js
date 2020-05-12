import { MapContext } from "../../contexts/MapContext";
import { useContext, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { Button, FormGroup, FormControl, Input, InputLabel, Select, MenuItem } from '@material-ui/core';
import Error from '../Error';
import ColorPicker from 'material-ui-color-picker';

const LineModal = () => {
  const { isLineModal, lineEditId, setLineModal, findLineById, lines, onAddLine, onUpdateLine, lineError, setLineError, onRemoveLine, setSelectedCoords } = useContext(MapContext);

  const isEdit = !!lineEditId;

  const strokeWeights = [1,2,3,4,5];

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

  const handleColorChange = color => {
    setLineError('');
    setValues({ ...values, strokeColor: color });
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
      // remove the selected 2 coords
      setSelectedCoords([]);
    } 
    setLineModal(false);
  }
  
  const showSubmitButton = () => <Button type="submit" color="primary" variant="outlined">{isEdit ? 'Update' : 'Create'}</Button>
  
  const showDeleteButton = () => <Button onClick={onRemoveLine} color="secondary" variant="outlined">Delete</Button>
  
  const showError = () => lineError && <Error content={lineError} />
  
  return (
    <Modal backdrop={false} isOpen={isLineModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>{isEdit ? 'Edit' : 'Add'} Line</ModalHeader>

      <ModalBody>
        {showError()}
        <Form onSubmit={handleSubmit}>

          <InputLabel htmlFor="color">Color</InputLabel>
          <ColorPicker
            style={{backgroundColor: strokeColor}}
            name='color'
            id="color"
            value={strokeColor}
            onChange={handleColorChange}
          />

          <FormGroup className="mt-3">
            <FormControl>
              <InputLabel htmlFor="strokeOpacity">Stroke Opacity</InputLabel>
              <Input id="strokeOpacity" type="number" onChange={handleChange('strokeOpacity')} value={strokeOpacity} />
            </FormControl>
          </FormGroup>

          <FormGroup className="mt-3">
            <FormControl>
              <InputLabel id="strokeWeight">Stroke Weight</InputLabel>
              <Select
                labelId="strokeWeight"
                id="stroke-weight"
                value={strokeWeight}
                onChange={handleChange('strokeWeight')}
              >
                {strokeWeights.map(option => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
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

export default LineModal;
