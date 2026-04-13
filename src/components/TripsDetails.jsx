// Bootstrap 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


function TripsDetails({ trip, loading, error }) {

 if (loading) {
    return (
      <Row>
      <Col className="bodyColors">
        <p>Loading details..</p>
            </Col>
      </Row>
    );
  }

  if (error) {
    return (
         <Row>
      <Col className="bodyColors">
        <p>Error: {error}</p>
            </Col>
      </Row>
    );
  }

  if (!trip) {  
    return (
       <Row>
      <Col className="bodyColors">
        <p>Pick your trip or create new one.</p>
      </Col>
      </Row>
    );
  }

const tripFields = Object.entries(trip).filter(
  ([key]) =>
    key !== "_id" &&
    key !== "tripName" &&
    key !== "dateFrom" &&
    key !== "dateTo"
);

function parseAmount(rawValue) {
  if (rawValue === null || rawValue === undefined) return 0;

  if (typeof rawValue === "number") return rawValue;

  if (typeof rawValue === "string") {
    const normalized = rawValue.replace(",", ".").replace(/\s/g, "");
    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

const totalCost = tripFields.reduce((sum, [, value]) => {
  const amount =
    typeof value === "object" && value !== null
      ? parseAmount(value.value)
      : parseAmount(value);

  return sum + amount;
}, 0);


    return(

    
    <Row>
      <Col className="bodyColors">
      {Object.entries(trip).filter(([key]) =>(key ==="tripName")).map(([key, value]) => (
              <p><h3>Trip Name: <b>{trip.tripName|| "Missing data"}</b> </h3><p>Date from: {trip.dateFrom || "N/A"} to {trip.dateTo || "N/A"} </p></p>
          
          ))}

          <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Name of expense</th>
          <th>Value</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>

       
            {Object.entries(trip)
        .filter(([key]) => (key !== "_id")&&(key !=="tripName")&&(key !=="dateFrom")&&(key !=="dateTo"))
        .map(([key, value]) => (
          
           <tr key={key}>
            <td>$$</td>
            <td>{key}</td>{" "}
            
            <td>
            {typeof value === "object"  && value !== null
              // ? JSON.stringify(value)
              ?`${value.value ?? ""}`
              : String(value)}
            </td>
                        <td>
            {typeof value === "object"  && value !== null
              // ? JSON.stringify(value)
              ?`${value.description ?? ""}`
              : String(value)}
            </td>
          </tr>
        ))}
        </tbody>
        </Table>
        <p>
   Cost summary: {totalCost.toFixed(2)} 
  </p>
      </Col>
    </Row>
    );
}

export default TripsDetails;
