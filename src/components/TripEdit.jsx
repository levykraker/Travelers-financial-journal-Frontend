import { useEffect, useState } from "react";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function TripEdit({ trip, onSubmit, onCancel }) {
  const [tripName, setTripName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [extraFields, setExtraFields] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!trip) return;

    setTripName(trip.tripName || "");
    setDateFrom(trip.dateFrom || "");
    setDateTo(trip.dateTo || "");
    

    const dynamicFields = Object.entries(trip)
      .filter(([key]) => !["_id", "tripName", "dateFrom","dateTo"].includes(key))
      .map(([key, value]) => {
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          return {
            key,
            value: value.value ? String(value.value) : "",
            description: value.description ? String(value.description) : "",
          };
        }

        return {
          key,
          value: value !== undefined && value !== null ? String(value) : "",
          description: "",
        };
      });

    setExtraFields(
      dynamicFields.length > 0
        ? dynamicFields
        : [{ key: "", value: "", description: "" }]
    );
  }, [trip]);

  function handleFieldChange(index, fieldName, fieldValue) {
    setExtraFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [fieldName]: fieldValue } : field
      )
    );
  }

  function handleAddField() {
    setExtraFields((prevFields) => [
      ...prevFields,
      { key: "", value: "", description: "" },
    ]);
  }

  function handleRemoveField(index) {
    setExtraFields((prevFields) => prevFields.filter((_, i) => i !== index));
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
      tripName: tripName.trim(),
      dateFrom,
      dateTo,
      ...dynamicData,
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <Row>
      <Col className="bodyColors">
        <h2>Edit trip</h2>

        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Trip Name</InputGroup.Text>
            <Form.Control
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Date from:</InputGroup.Text>
            <Form.Control
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
            />

            <InputGroup.Text>Date to:</InputGroup.Text>
            <Form.Control
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              required
            />
          </InputGroup>

          <h4>List of expense</h4>

          {extraFields.map((field, index) => (
            <InputGroup key={index} className="mb-2">
              <Form.Control
                type="text"
                placeholder="Key"
                value={field.key || ""}
                onChange={(e) =>
                  handleFieldChange(index, "key", e.target.value)
                }
              />

              <Form.Control
                type="text"
                placeholder="Value"
                value={field.value || ""}
                onChange={(e) =>
                  handleFieldChange(index, "value", e.target.value)
                }
              />

              <Form.Control
                type="text"
                placeholder="Description"
                value={field.description || ""}
                onChange={(e) =>
                  handleFieldChange(index, "description", e.target.value)
                }
              />

              <Button
                type="button"
                variant="danger"
                onClick={() => handleRemoveField(index)}
              >
                Remove
              </Button>
            </InputGroup>
          ))}

          <Button type="button" variant="outline-info" onClick={handleAddField}>
            + Add field
          </Button>

          <br />
          <br />

          <Button variant="success" className="m-2" type="submit">
            Save trip
          </Button>

          <Button type="button" variant="danger" onClick={onCancel}>
            Cancel
          </Button>

          {error && <p className="mt-3 text-danger">{error}</p>}
        </Form>
      </Col>
    </Row>
  );
}