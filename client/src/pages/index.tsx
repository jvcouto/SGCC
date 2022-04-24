import React from "react";
import Head from "next/head";
import { DatePicker } from "antd";

import Input from "../components/teste";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <span>Hello World!</span>
        <DatePicker />
      </main>
      <Input placeholder="Basic usage" />
    </div>
  );
}
