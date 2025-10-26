// src/components/InterviewForm.jsx
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { addInterview } from "../api/interviewAPI";

function InterviewForm({ token, onAdd }) {
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [poc, setPoc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await addInterview({ company, date, poc }, token);
      setSuccess("Interview added successfully!");
      setCompany("");
      setDate("");
      setPoc("");
      onAdd(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Add Interview</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Point of Contact</Form.Label>
          <Form.Control
            type="text"
            value={poc}
            onChange={(e) => setPoc(e.target.value)}
            placeholder="POC Name"
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Interview
        </Button>
      </Form>
    </div>
  );
}

export default InterviewForm;
