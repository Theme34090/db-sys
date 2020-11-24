import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Heading,
  Input,
  Button,
  Stack,
  Box,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import DisplayResult from "../DisplayResult";

const CreateEvent = () => {
  const toast = useToast();
  const { handleSubmit, register } = useForm();
  const [createResult, setCreateResult] = useState(null);

  const onSubmit = async (values) => {
    try {
      console.log(values);
      const res = await axios.put(
        "http://localhost:3000/api/band/create",
        values
      );
      console.log(res);
      setCreateResult(res.data);
      return toast({
        title: "Create band successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      return toast({
        title: "Create band failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
