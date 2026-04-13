import { useState } from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function CreateTripForm({ onSubmit }) {
  const [tripName, setTripName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [extraFields, setExtraFields] = useState([
    { key: "", value: "", description: "" },
  ]);
  const [error, setError] = useState("");

  function handleFieldChange(index, fieldName, fieldValue) {
    const updatedFields = [...extraFields];
    updatedFields[index][fieldName] = fieldValue;
    setExtraFields(updatedFields);
  }

  function handleAddField() {
    setExtraFields([
      ...extraFields,
      { key: "", value: "", description: "" },
    ]);
  }

  function handleRemoveField(index) {
    const updatedFields = extraFields.filter((_, i) => i !== index);
    setExtraFields(updatedFields);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!tripName.trim() || !dateFrom.trim() || !dateTo.trim()) {
      setError("Trip name i dates are mandatory");
      return;
    }

    const dynamicData = {};

    for (const field of extraFields) {
      if (field.key.trim()) {
        dynamicData[field.key] = {
          value: field.value,
          description: field.description,
        };
      }
    }

    const payload = {
      tripName,
      dateFrom,
      dateTo,
      ...dynamicData,
    };

    await onSubmit(payload);

    setTripName("");
    setDateFrom("");
    setDateTo("");
    setExtraFields([{ key: "", value: "", description: "" }]);
  }

  return (
    <Row>
      <Col className="bodyColors">
      <h2>Add new trip</h2>

      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3"  >
          <InputGroup.Text >Trip Name: </InputGroup.Text >
          <Form.Control
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="example: Germany"
            required
            
          />
      </InputGroup>
      <InputGroup className="mb-3" >
 
          <InputGroup.Text >Data from:</InputGroup.Text >
          <Form.Control
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />
   
        <InputGroup.Text >Data to:</InputGroup.Text >
          <Form.Control
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            required
          />
            </InputGroup  >

         
        <h4>Add expance </h4>
        
        <InputGroup className="mb-3" >
        <InputGroup.Text >Name of expance:</InputGroup.Text >
        <InputGroup.Text >Value:</InputGroup.Text >
        <InputGroup.Text >Comment:</InputGroup.Text >
         
          </InputGroup>
      
        {extraFields.map((field, index) => (
          <InputGroup  
          className="mb-2"
            key={index}
          >
            <Form.Control
              type="text"
              placeholder='Key, example. "Bus ticket"'
              value={field.key}
              onChange={(e) =>
                handleFieldChange(index, "key", e.target.value)
              }
            />

            <Form.Control
              type="text"
              placeholder='Value, np. "200"'
              value={field.value}
              onChange={(e) =>
                handleFieldChange(index, "value", e.target.value)
              }
            />

            <Form.Control
              type="text"
              placeholder='Comment of expense'
              value={field.description}
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
            />

            <Button  variant="danger" onClick={() => handleRemoveField(index)}>
              Remove
            </Button>
          </InputGroup >
        ))}

        <Button variant="outline-info"  onClick={handleAddField}>
          + Add field
        </Button>

        <br />
        <br />

        <Button variant="success" type="submit">Save trip</Button>

        {error && <p>{error}</p>}
      </Form>
    </Col>
    </Row>
  );
}