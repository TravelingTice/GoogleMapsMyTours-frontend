import Alert from '@material-ui/lab/Alert';
import ReactHTMLParser from 'react-html-parser';

const Message = ({ color, content, parseHTML }) => (
  <Alert severity={color ? color : 'info'}>{parseHTML ? ReactHTMLParser(content) : content}</Alert>
);

export default Message;