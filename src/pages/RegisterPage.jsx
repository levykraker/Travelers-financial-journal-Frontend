import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import logo from '../assets/icon.png'
import Image from 'react-bootstrap/Image'

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Hasła nie są takie same");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage(data.message || "Konto zostało utworzone");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
       <Container fluid >
    <Row  className=" mt-3">
      <Col md={{ span: 6, offset: 3 }}
      sm={{ span: 10, offset: 1 }}
      lg={{ span: 6, offset: 3 }}
      xl={{ span: 6, offset: 3 }}
      xxl={{ span: 3, offset: 5 }}
      >
      

      <Form className="bodyColors" onSubmit={handleSubmit}>
        <Col xs={{span:6, offset:3}} md={{span:4,offset:4}}><Image src={logo} alt="" /></Col>  
        
        <h2 className="authTitle">Create an account</h2>
        <Col className="inputGroup">
          <label htmlFor="name" className="label">Username:</label>
          <input
            id="name"
            name="name"
            type="text"
            className="input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Provide username"
          />
        </Col>

       <Col className="inputGroup">
          <label htmlFor="email" className="label">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Provide e-mail"
            required
          />
        </Col>

        <Col className="inputGroup">
          <label htmlFor="password" className="label">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Provide password"
            required
          />
        </Col>

        <Col className="inputGroup">
          <label htmlFor="confirmPassword" className="label">Repeat password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="input"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat password"
            required
          />
        </Col>

        <button type="submit" disabled={loading}  className="submitButton">
          {loading ? "Creating..." : "Create account"}
        </button>
      

      {error && <p className="error">{error}</p>}
      {message && <p>{message}</p>}

      <p className="toggleText">
        Already have an account? <Link to="/login">Login</Link>
      </p>
       </Form>
      </Col>
    </Row>
    </Container>
  );
}