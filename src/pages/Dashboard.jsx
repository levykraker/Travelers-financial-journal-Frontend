import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrips,getTripById,createTrip, deleteTrip,updateTrip  } from "../services/tripService";
import { logoutUser } from "../services/authService";

// Components
import  TripsNavbar from "../components/TripsNavbar"
import TripsDetails from "../components/TripsDetails"
import TripsTimeline from "../components/TripsTimeline";
import TripsFooterMenu from "../components/TripsFooterMenu";
import TripCreate from "../components/TripCreate";
import TripEdit from "../components/TripEdit";
import ConfirmDialog from "../components/ConfirmDialog";

// Bootstrap 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function TripsPage() {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewMode, setViewMode] = useState("details");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [currentTripID, setCurrentTripID]= useState("");
  const [dialog, setDialog]= useState("");

  useEffect(() => {
    async function loadTrips() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getTrips(token);
        setTrips(data);
      } catch (err) {
        setError(err.message);

        if (
          err.message.toLowerCase().includes("token") ||
          err.message.toLowerCase().includes("401")
        ) {
          logoutUser();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, [navigate]);

  async function handleSelectTrip(id) {
    const token = localStorage.getItem("token");
     setCurrentTripID(id)
    try {
      setViewMode("details");
      setDetailsLoading(true);
      setError("");


      const trip = await getTripById(id, token);
      setSelectedTrip(trip);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  }

    function handleOpenCreateForm() {
    setViewMode("create");
    setSelectedTrip(null);
    setError("");
  }
  function handleOpenEditForm() {
  setViewMode("edit");
}
async function handleUpdateTrip(formData) {
  const token = localStorage.getItem("token");

  try {
    await updateTrip(currentTripID, formData, token);

    const updatedTrip = await getTripById(currentTripID, token);
    setSelectedTrip(updatedTrip);

    const updatedTrips = await getTrips(token);
    setTrips(updatedTrips);

    setViewMode("details");
  } catch (err) {
    setError(err.message);
  }
}

    
    async function handleCreateTrip(formData) {
    const token = localStorage.getItem("token");

    try {
      const newTrip = await createTrip(formData, token);

      const updatedTrips = await getTrips(token);
      setTrips(updatedTrips);

      setViewMode("details");

      if (newTrip?.insertedId) {
        await handleSelectTrip(newTrip.insertedId);
      }
    } catch (err) {
      setError(err.message);
    }
  }
    function handleDeleteTrip() {
    if(!currentTripID){
        alert("Please pick the trip from the list first!")
    }else{
        setDialog("delete")
      
    }
  }

    function completleDeleteTrip(){
      const token = localStorage.getItem("token");
      deleteTrip(currentTripID, token).then(() => {
        window.location.reload();
      });
     
    }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
    <Container fluid >
    <Row className="authContainer" >
      <Col>
        <h1>My trips</h1>
        
        <p>Error: {error}</p>
        </Col>
      </Row>
      </Container>
    );
  }

  return (
         <Container fluid>
          <TripsNavbar></TripsNavbar>
          <Row className=" mt-3" >
            <Col md={4} className="mb-3" >
            <TripsTimeline
                    trips={trips}
                   onSelectTrip={handleSelectTrip}>
                  </TripsTimeline>
            </Col>
            <Col md={8}>
             {viewMode === "create" ? (
            <TripCreate onSubmit={handleCreateTrip} />
            ) :  viewMode === "edit" ? (
              <TripEdit
               trip={selectedTrip}
                onSubmit={handleUpdateTrip}
                onCancel={() => setViewMode("details")}
              />
            ):(
              <TripsDetails 
                  trip={selectedTrip} 
                  loading={detailsLoading}
                />
                )}
            </Col>
          </Row>
          <Row className="mt-3" >
            <Col md={{span:8, offset:4}} >
            <TripsFooterMenu
              onAddNewTrip={handleOpenCreateForm}
              deleteTrip={handleDeleteTrip}
              updateTrip={handleOpenEditForm} >

            </TripsFooterMenu>
      
            </Col>
              {dialog === "delete" ? (
        <ConfirmDialog    
                confirm={completleDeleteTrip}
        />
      ) : (
        ""
      )} 
          </Row>
      </Container>
          
  );
}