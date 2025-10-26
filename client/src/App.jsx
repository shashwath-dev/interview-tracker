import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import InterviewForm from "./components/InterviewForm";
import InterviewList from "./components/InterviewList";
import { Container } from "react-bootstrap";

function AppContent() {
  const { user, token } = useAuth();
  const [refresh, setRefresh] = React.useState(false);

  if (!user) return <LoginForm />;

  return (
    <Container style={{ marginTop: "50px" }}>
      <h2>Welcome, {user.username}</h2>
      <InterviewForm token={token} onAdd={() => setRefresh(!refresh)} />
      <InterviewList key={refresh} token={token} />
    </Container>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
