import { useContext } from 'react';
import styled from 'styled-components';
import { Image, Transformation } from 'cloudinary-react';
import { MarkerIconContext } from '../../../contexts/MarkerIconContext';

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px;
  align-items: center;
  justify-items: center;
  justify-content: center;
  box-shadow: 1px 1px 5px rgba(0,0,0,.3);
  padding: 5px;
  border-radius: 5px;
`;

const MarkerIcon = ({ icon }) => {
  const { initEdit } = useContext(MarkerIconContext);

  return (
    <StyledDiv onClick={() => initEdit(icon.id)}>
      <Image publicId={icon.image} height="50">
        <Transformation crop="fill" width="150" />
      </Image>
      <p className="text-center mb-0 text-muted">{icon.name}</p>
    </StyledDiv>
  )
}

export default MarkerIcon
