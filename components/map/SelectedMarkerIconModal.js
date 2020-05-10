import { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, Button }  from 'reactstrap';
import { MapContext } from "../../contexts/MapContext";
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { Image, Transformation } from 'cloudinary-react';

const SelectedMarkerIconModal = () => {
  const { selectedMarkerIcon, state, setState, markerIcons, onSelectMarkerIcon } = useContext(MapContext);

  const onClose = () => setState('');

  const isOpen = !selectedMarkerIcon && state === 'marker';

  const showIconImg = key => (
    <Image publicId={key} height='20' style={{marginRight: 20}}>
      <Transformation height='40' />
    </Image>
  )

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Select marker icon</ModalHeader>

      <ModalBody>

        <div>
          <Select style={{width: '100%'}} labelId="markerIcon" id="markerSelect" onChange={onSelectMarkerIcon} value={selectedMarkerIcon}>
            {markerIcons.map(icon => (
              <MenuItem value={icon}>{showIconImg(icon.image)}{icon.name}</MenuItem>
            ))}
          </Select>
        </div>

      </ModalBody>
    </Modal>
  )
}

export default SelectedMarkerIconModal;
