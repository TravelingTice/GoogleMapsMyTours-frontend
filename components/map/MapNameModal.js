import { useState, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { MapContext } from '../../contexts/MapContext';

const MapNameModal = () => {
  const { isMapNameModal, initMapName } = useContext(MapContext);
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    initMapName(name);
  }

  return (
    <Modal isOpen={isMapNameModal}>
      <ModalHeader>Set Map Name</ModalHeader>

      <ModalBody>
        <Form onSubmit={handleSubmit}>

          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="name">Map Name</InputLabel>
              <Input id="name" onChange={e => setName(e.target.value)} value={name} />
            </FormControl>
          </FormGroup>

          <Button className="mt-4" type="submit" color="primary" variant="outlined">Submit</Button>

        </Form>
      </ModalBody>
    </Modal>
  )
}

export default MapNameModal;
