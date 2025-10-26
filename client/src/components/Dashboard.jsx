import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import AddInterviewForm from "./AddInterviewForm";
import { getInterviews } from "../api/interviewAPI";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    const data = await getInterviews();
    setInterviews(data.interviews || []);
  };

  const handleAdd = (newInterview) => {
    setInterviews([...interviews, newInterview]);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2>Interviews</h2>
      <AddInterviewForm onAdd={handleAdd} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((i, idx) => (
            <tr key={idx}>
              <td>{i.company}</td>
              <td>{i.position}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
