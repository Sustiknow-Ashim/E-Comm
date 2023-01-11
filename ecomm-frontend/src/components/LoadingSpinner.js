import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <Spinner 
        animation="border" 
        role="status"
        style={{
            width:'100px',
            height: '100px',
            margin: 'auto',
            marginTop: '50px',
            display: 'block'
        }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default LoadingSpinner;