import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function TeacherDeshboard() {
  const { user } = useAuth();
  return <h1>{user?.name}</h1>;
}

export default TeacherDeshboard;
