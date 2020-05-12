import { useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { FormGroup, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { getCookie } from "../../actions/auth";
import Error from '../Error';
import CodeIcon from '@material-ui/icons/Code';
import { MapContext } from "../../contexts/MapContext";
import convertToText from '../../helpers/convertToText';
import { addKml } from '../../actions/kml';

const KmlModal = () => {
  const { isKmlModal, setKmlModal, id } = useContext(MapContext);
  const isEdit = false;
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

    const code = await convertToText(file);
    const newKml = { name: file.name, code }

    const data = await addKml(newKml, id, token);

    setLoading(false);
    setKmlModal(false);

    if (data.error) return setError(data.error);
  }

  const handleRemove = e => {
    console.log('ya');
  }

  const showSubmitButton = () => {
    let text = 'Add';
    if (loading) text = <img style={{height: '0.875rem'}} src="/loading.svg" alt="Loading..."/>
    return <Button disabled={!file} color='primary' type="submit" variant='outlined'>{text}</Button>
  }

  const showDeleteButton = () => (
    <Button color="secondary" onClick={handleRemove} variant="outlined">Delete</Button>
  )

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
            {isEdit && showDeleteButton()}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default KmlModal;
