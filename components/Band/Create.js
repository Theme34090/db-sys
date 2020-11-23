import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Heading,
  Text,
  Input,
  Button,
  Stack,
  Box,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import DisplayResult from "../DisplayResult";

const CreateEvent = () => {
  const { handleSubmit, register } = useForm();
  const [createResult, setCreateResult] = useState(null);

  const onSubmit = (values) => {
    console.log(values);
    axios.put("http://localhost:3000/api/band/create", values).then((res) => {
      console.log(res);
      setCreateResult(res.data);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing="4"
          p={4}
          border="1px solid"
          borderColor="gray.600"
          rounded="lg"
        >
          <Heading size="md">Create band</Heading>
          <Box>
            <FormLabel htmlFor="bandId">Band id</FormLabel>
            <Input name="bandId" placeholder="1" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="bandManagerId">Band manager id</FormLabel>
            <Input name="bandManagerId" placeholder="1" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="name">Band name</FormLabel>
            <Input name="name" placeholder="dbsys" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              name="description"
              placeholder="event description"
              ref={register}
            />
          </Box>
          <Button type="submit">Create</Button>
        </Stack>
      </form>
      {createResult && (
        <Box
          spacing="4"
          p={4}
          border="1px solid"
          borderColor="gray.600"
          rounded="lg"
        >
          <DisplayResult data={createResult} />
        </Box>
      )}
    </>
  );
};

export default CreateEvent;
