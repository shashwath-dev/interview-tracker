// src/api/interviewAPI.js
const API_URL = "http://localhost:5000/api"; // Backend URL

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return await res.json(); // { token: '...' }
}

export async function addInterview(interview, token) {
  const res = await fetch(`${API_URL}/interviews`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(interview),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add interview");
  }

  return await res.json();
}

export async function getInterviews(token) {
  const res = await fetch(`${API_URL}/interviews`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch interviews");
  }

  return await res.json();
}
