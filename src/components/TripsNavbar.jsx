// import bootstrap 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

// import assets 
import logo from '../assets/icon.png'

// import services & react
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


function TripsNavbar() {

const navigate = useNavigate();

function handleLogout() {
        logoutUser();
        navigate("/login");
      }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Image src={logo} alt="" className='navbarLogo'/>
            Travelers financial journal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
            <Button variant="info" onClick={handleLogout}>Logoff</Button>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default TripsNavbar;