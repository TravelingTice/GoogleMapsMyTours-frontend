import { useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, Button } from '@material-ui/core';
import { getCookie } from "../../../actions/auth";
import Error from '../../Error';
import CodeIcon from '@material-ui/icons/Code';
import { MapContext } from "../../../contexts/MapContext";
import convertToBase64 from '../../../helpers/convertToBase64';
import { addKml } from '../../../actions/kml';
import Router from 'next/router';

const KmlModal = () => {
  const { isKmlModal, setKmlModal, id, setKmls, kmls, mapName } = useContext(MapContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const token = getCookie('token');

  const closeModal = () => setKmlModal(false);

  const handleFileChange = async e => {
    setError('');
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return setError('File needed');
    if (!file.name.match(/.kml$/)) return setError('File can only be of type KML');

    setLoading(true);

    const enc = await convertToBase64(file);
    const newKml = { name: file.name, enc }

    const data = await addKml(newKml, id, mapName, token);

    setLoading(false);
    setKmlModal(false);
    
    if (data.error) return setError(data.error);

    setFile(null);

    if (!id) {
      Router.push(`/manage/maps/${data.mapId}`)
    }

    setKmls(kmls.concat({ name: data.name }));
  }

  const showSubmitButton = () => {
    let text = 'Add';
    if (loading) text = <img style={{height: '0.875rem'}} src="/loading.svg" alt="Loading..."/>
    return <Button disabled={!file} color='primary' type="submit" variant='outlined'>{text}</Button>
  }

  const displayFileName = () => file && (
    <div className="my-3">{file.name}</div>
  )

  const showError = () => error && <Error content={error} />
  
  return (
    <Modal isOpen={isKmlModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Add Kml File</ModalHeader>

      <ModalBody>
        {showError()}
        <Form onSubmit={handleSubmit}>

          <p className="m-0 text-muted font-italic">Make sure your kml file name doesn't contain any spaces</p>

          <FormGroup className="my-4">
            <label className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" htmlFor="icon">
              <span className="MuiButton-label">
                <span className="MuiButton-startIcon MuiButton-iconSizeMedium">
                  <CodeIcon />
                </span>
                Upload Kml
              </span>
              <span className="MuiTouchRipple-root"></span>
            </label>

            <input type="file" id="icon" accept=".kml" hidden onChange={handleFileChange}/>

          </FormGroup>

          {displayFileName()}

          <div className="mt-3 d-flex justify-content-between">
            {showSubmitButton()}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default KmlModal;
