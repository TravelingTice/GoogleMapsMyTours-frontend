import styled from 'styled-components';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const StyledButton = styled.button`
  box-shadow: 1px 1px 5px rgba(0,0,0,.3);
  background-color: white;
  z-index: 1;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  position: fixed;
  border: none;
  bottom: 85px;
  right: 15px;
  transition: box-shadow 200ms ease-out;
  &:hover {
    box-shadow: 2px 2px 7px rgba(0,0,0,.3);
  }
`;

const PlusIcon = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <AddRoundedIcon fontSize="large" style={{color: '#5d4037'}} />
  </StyledButton>
)

export default PlusIcon;
