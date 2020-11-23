import { useState } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Heading,
  Text,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import SelectAction from "../components/SelectAction";
import SearchEvent from "../components/Event/Search";
import CreateEvent from "../components/Event/Create";
import UpdateEvent from "../components/Event/Update";
import DeleteEvent from "../components/Event/Delete";

import SearchBand from "../components/Band/Search";
// import CreateBand from "../components/Band/Create";
// import UpdateBand from "../components/Band/Update";
// import DeleteBand from "../components/Band/Delete";

const Main = ({ model, action }) => {
  if (model === "event") {
    switch (action) {
      case "search":
        return <SearchEvent />;
      case "create":
        return <CreateEvent />;
      case "update":
        return <UpdateEvent />;
      case "delete":
        return <DeleteEvent />;

      default:
        break;
    }
  } else {
    switch (action) {
      case "search":
        return <SearchBand />;
      case "create":
        return <CreateBand />;
      case "update":
        return <UpdateBand />;
      case "delete":
        return <DeleteBand />;

      default:
        break;
    }
  }
};

const Index = () => {
  const [model, setModel] = useState("event");
  const [action, setAction] = useState("search");

  return (
    <>
      <Layout>
        <Stack spacing="6">
          <Box p={4} border="1px solid" borderColor="gray.600" rounded="lg">
            <Heading mb="2">Select model</Heading>
            <RadioGroup onChange={setModel} value={model}>
              <Stack direction="row">
                <Radio value="event">Event</Radio>
                <Radio value="band">Band</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <SelectAction setValue={setAction} value={action} />

          <Main model={model} action={action} />
        </Stack>
      </Layout>
    </>
  );
};

export default Index;
