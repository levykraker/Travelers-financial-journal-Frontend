// import Bootstrap 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';


function TripsTimeline({ trips, onSelectTrip }) {

    return(
        
    <Row >
      <Col className="timelineColors">
      

      {trips.length === 0 ? (
        <p>No trips to show</p>
      ) : (
        <ListGroup>
          {[...trips]
  .sort((a, b) => {
    const dateA = a.dateFrom ? new Date(a.dateFrom).getTime() : 0;
    const dateB = b.dateFrom ? new Date(b.dateFrom).getTime() : 0;
    return dateB - dateA;
  }).map((trip) => (
            <ListGroup.Item action variant="light" key={trip._id}  onClick={() => onSelectTrip(trip._id)}>
              <p>Trip Name: <b>{trip.tripName|| "Missing data"}</b> Date from: {trip.dateFrom || "N/A"} to {trip.dateTo || "N/A"} </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      </Col>
    </Row>
    );
}


export default TripsTimeline;