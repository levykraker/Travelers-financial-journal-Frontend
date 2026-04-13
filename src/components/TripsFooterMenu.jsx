
// import bootstrap 
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function TripsFooterMenu({ onAddNewTrip,updateTrip, deleteTrip }) {


  return (
    
    <Row >
        <Col md={{offset:3}} >
            <Button variant="success" className='m-1' onClick={onAddNewTrip} >Add new trip</Button>
            <Button variant="warning" className='m-1' onClick={updateTrip}>Edit a trip</Button>
            <Button variant="danger" className='m-1'  onClick={deleteTrip}>Delete a trip</Button>
        </Col>
  
</Row>
  

  );
}

export default TripsFooterMenu;