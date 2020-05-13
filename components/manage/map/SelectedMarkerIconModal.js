import { useContext } from 'react';
import { Modal, ModalHeader, ModalBody }  from 'reactstrap';
import { MapContext } from "../../../contexts/MapContext";
import { Select, MenuItem, Button } from '@material-ui/core';
import { Image, Transformation } from 'cloudinary-react';

const SelectedMarkerIconModal = () => {
  const { selectedMarkerIcon, state, setState, markerIcons, onSelectMarkerIcon, isSelectedMarkerIconModal, setSelectedMarkerIconModal } = useContext(MapContext);

  const onClose = () => {
    setSelectedMarkerIconModal(false);
    setState('');
  };

  const showIconImg = key => (
    <Image publicId={key} height='20' style={{marginRight: 20}}>
      <Transformation height='40' />
    </Image>
  )

  return (
    <Modal isOpen={isSelectedMarkerIconModal} toggle={onClose}>
      <ModalHeader toggle={onClose}>Select marker icon</ModalHeader>

      <ModalBody>

        <div>
          <Select style={{width: '100%'}} labelId="markerIcon" id="markerSelect" onChange={onSelectMarkerIcon} value={selectedMarkerIcon}>
            {markerIcons.map(icon => (
              <MenuItem key={icon.id} value={icon}>{showIconImg(icon.image)}{icon.name}</MenuItem>
            ))}
          </Select>

          <Button className="mt-4" color="primary" variant="outlined" onClick={() => setSelectedMarkerIconModal(false)}>Select</Button>
        </div>

      </ModalBody>
    </Modal>
  )
}

export default SelectedMarkerIconModal;
