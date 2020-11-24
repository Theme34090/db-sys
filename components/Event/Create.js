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
        "http://localhost:3000/api/event/create",
        values
      );
      console.log(res);
      setCreateResult(res.data);
      return toast({
        title: "Create event successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      return toast({
        title: "Create event failed.",
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
          <Heading size="md">Create event</Heading>
          <Box>
            <FormLabel htmlFor="eventId">Event id</FormLabel>
            <Input name="eventId" placeholder="1" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="userId">Organizer id</FormLabel>
            <Input name="userId" placeholder="1" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="name">Event name</FormLabel>
            <Input name="name" placeholder="dbsys" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="location">Location name</FormLabel>
            <Input name="location" placeholder="home" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="latitude">Location (latitude)</FormLabel>
            <Input name="latitude" placeholder="13.756331" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="longitude">Location (longitude)</FormLabel>
            <Input name="longitude" placeholder="100.501762" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="ticketPrice">Ticket price</FormLabel>
            <Input name="ticketPrice" placeholder="99.99" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              name="description"
              placeholder="event description"
              ref={register}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="dateTime">Date and time</FormLabel>
            <Input
              name="dateTime"
              placeholder="2008-12-15 16:35:12"
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
