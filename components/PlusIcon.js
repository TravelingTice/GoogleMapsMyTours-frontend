import styled from 'styled-components';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useTheme } from '@material-ui/core';

const StyledButton = styled.button`
  box-shadow: 1px 1px 5px rgba(0,0,0,.3);
  background-color: white;
  z-index: 1;
  height: 57px;
  width: 57px;
  border-radius: 50%;
  position: fixed;
  border: none;
  bottom: 17px;
  right: 17px;
  transition: box-shadow 200ms ease-out;
  &:hover {
    box-shadow: 2px 2px 7px rgba(0,0,0,.3);
  }
`;

const PlusIcon = ({ onClick }) => {
  const { palette } = useTheme();
  return (
    <StyledButton onClick={onClick}>
      <AddRoundedIcon fontSize="large" style={{color: palette.primary.main}} />
    </StyledButton>
  )
}

export default PlusIcon;
