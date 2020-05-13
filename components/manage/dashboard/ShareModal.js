import { useContext } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { DashboardContext } from "../../../contexts/DashboardContext";
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import { isAuth } from '../../../actions/auth';

const ShareModal = () => {
  const { isShareModal, setShareModal, selectedMap } = useContext(DashboardContext);

  const closeModal = () => setShareModal(false);

  const handleShare = link => e => {
    window.open(link, '_blank');
  }
  
  const url = `${DOMAIN}/maps/${selectedMap.id}`;
  const facebookLink = `https://www.facebook.com/v3.3/dialog/feed?app_id=${FB_APP_ID}&link=${url}&display=page&redirect_uri=${url}&facebook=true`
  const twitterLink = `https://twitter.com/intent/tweet?text=${selectedMap.name} by @${isAuth() && isAuth().username} - ${APP_NAME} ${url}`;

  return (
    <Modal isOpen={isShareModal} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Share map {selectedMap.name}</ModalHeader>

      <ModalBody>
        <div className="d-flex">
          <IconButton onClick={handleShare(facebookLink)} color="primary"><FacebookIcon/></IconButton>
          <IconButton onClick={handleShare(twitterLink)} color="primary"><TwitterIcon/></IconButton>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ShareModal;
