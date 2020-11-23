import { useState } from "react";
import axios from "axios";
import { Button, Heading, Stack } from "@chakra-ui/react";

import Layout from "../components/Layout";
import DisplayResult from "../components/DisplayResult";

const Complex = () => {
  const [queryResult, setQueryResult] = useState(null);
  const handleRunButton = () => {
    axios.get("http://localhost:3000/api/songs").then((res) => {
      setQueryResult(res.data);
    });
  };

  return (
    <Layout>
      <Stack
        spacing={4}
        p={4}
        border="1px solid"
        borderColor="gray.600"
        rounded="lg"
      >
        <Heading>MongoDB query</Heading>
        <Button onClick={handleRunButton}>Run MongoDB query</Button>
        {queryResult && <DisplayResult data={queryResult} />}
      </Stack>
    </Layout>
  );
};

export default Complex;
