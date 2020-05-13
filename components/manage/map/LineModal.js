import { MapContext } from "../../contexts/MapContext";
import { useContext, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { Button, FormGroup, FormControl, Input, InputLabel, Select, MenuItem } from '@material-ui/core';
import Error from '../Error';
import ColorPicker from 'material-ui-color-picker';

const LineModal = () => {
  const { isLineModal, setLineModal, selectedLine, setSelectedLine, onAddLine, onUpdateLine, lineError, setLineError, onRemoveLine, setState } = useContext(MapContext);
  const isEdit = !!selectedLine.id;

  const { strokeColor, strokeOpacity, strokeWeight } = selectedLine;

  const strokeWeights = [1,2,3,4,5];
  
  const handleChange = name => e => {
    setLineError('');
    setSelectedLine({ ...selectedLine, [name]: e.target.value });
  }

  const handleColorChange = color => {
    setLineError('');
    setSelectedLine({ ...selectedLine, strokeColor: color });
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    setLineError('');
    setState('');
    if (isEdit) {
      onUpdateLine();
    } else {
      onAddLine();
    }
  }
  
  const closeModal = () => {
    // remove the selected line
    setSelectedLine({
      strokeColor: '#000000',
      strokeOpacity: 1,
      strokeWeight: 1,
      coords: []
    });
    setState('');
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
                  <MenuItem key={option} value={option}>{option}</MenuItem>
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
