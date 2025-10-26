import { useState } from 'react';
import AddInterview from '../components/AddInterviewForm';
import InterviewBoard from '../components/KanbanBoard';

export default function Dashboard({ token }) {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      <AddInterview token={token} onAdded={() => setRefresh(!refresh)} />
      <InterviewBoard token={token} key={refresh} />
    </div>
  );
}
