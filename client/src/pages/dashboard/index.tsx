import React from "react";
import { parseCookies } from "nookies";

import TeacherDeshboard from "../../components/dashboard/Teacher";
import api from "../../services/api";

function Dashboard() {
  return <TeacherDeshboard />;
}

export default Dashboard;

export async function getServerSideProps(ctx) {
  const { "PCA-Token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/dot-notation
  api.defaults.headers["Authorization"] = `Baerer ${token}`;

  return { props: {} };
}
