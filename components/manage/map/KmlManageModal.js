import { MapContext } from "../../../contexts/MapContext";
import { useContext, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { IconButton } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import DeleteIcon from '@material-ui/icons/Delete';
import Error from '../../Error';
import { getCookie } from "../../../actions/auth";
import { removeKml } from '../../../actions/kml';

const KmlManageModal = () => {
  const { kmls, setKmls, isKmlManageModal, setKmlManageModal, setLoading } = useContext(MapContext);
  const [error, setError] = useState('');

  const token = getCookie('token');

  const closeModal = () => setKmlManageModal(false);

  const onRemove = async (id) => {
    const answer = window.confirm('Are you sure?');

    if (answer) {
      setKmlManageModal(false);
      setLoading(true);

      const data = await removeKml(id, token);

      setLoading(false);

      if (data.error) return setError(data.error);

      // reload page
      window.location.reload();

      // setKmls(kmls.filter(kml => kml.id !== id));
    }
  }

  const listKmls = () => kmls.map(kml => (
    <div className="d-flex justify-content-between align-items-center">
      <CodeIcon />
      <span>{kml.name}</span>
      <IconButton color="secondary" onClick={() => onRemove(kml.id)}><DeleteIcon/></IconButton>
    </div>
  ))

  const showError = () => error && <Error content={error} />

  return (
    <Modal isOpen={isKmlManageModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Manage KML Files</ModalHeader>

      <ModalBody>
        {showError()}
        {listKmls()}
      </ModalBody>
    </Modal>
  )
}

export default KmlManageModal;
