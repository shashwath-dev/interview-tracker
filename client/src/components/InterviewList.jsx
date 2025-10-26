// src/components/InterviewList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { getInterviews } from "../api/interviewAPI";

function InterviewList({ token }) {
  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    try {
      const data = await getInterviews(token);
      setInterviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div>
      <h3>All Interviews</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>Date</th>
            <th>POC</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((i) => (
            <tr key={i._id}>
              <td>{i.company}</td>
              <td>{new Date(i.date).toLocaleDateString()}</td>
              <td>{i.poc}</td>
              <td>{i.attended ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default InterviewList;
