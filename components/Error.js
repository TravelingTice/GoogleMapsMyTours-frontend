import Alert from '@material-ui/lab/Alert';

const Error = ({ content }) => (
  <Alert className="mb-3" variant="outlined" severity="error">{content}</Alert>
);

export default Error;