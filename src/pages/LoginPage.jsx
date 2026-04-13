import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import logo from '../assets/icon.png'
import Image from 'react-bootstrap/Image';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/trips";

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
       <Container fluid >
    <Row  className=" mt-3" >
      <Col md={{ span: 6, offset: 3 }}
      sm={{ span: 10, offset: 1 }}
      lg={{ span: 6, offset: 3 }}
      xl={{ span: 6, offset: 3 }}
      xxl={{ span: 3, offset: 5 }}
      >

      <Form className="bodyColors" onSubmit={handleSubmit}>
      <Col xs={{span:6, offset:3}} md={{span:4,offset:4}}><Image src={logo} alt="" /></Col>  
      
      <h2 className="authTitle">Login</h2>
        <Col className="inputGroup">
          <Form.Label htmlFor="email" className="label">E-mail: </Form.Label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Provide email"
            required
            className="input"
          />
        </Col>

        <Col className="inputGroup">
          <Form.Label htmlFor="password" className="label">Password: </Form.Label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Provide password"
            required
            className="input"
          />
        </Col>

        <button type="submit" disabled={loading} className="submitButton">
          {loading ? "Logging in..." : "Login"}
        </button>

             {error && <p className="error">{error}</p>}

      <p className="toggleText">
        Don't have an account? <Link to="/register">Create account</Link>
      </p>
      </Form>

 
      </Col>
      </Row>
    </Container>
  );
}