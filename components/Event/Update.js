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

const CreateEvent = () => {
  const { handleSubmit, register, setValue } = useForm();
  const [eventId, setEventId] = useState(null);

  const onSubmit = (values) => {
    console.log(values);
    axios
      .put(`http://localhost:3000/api/event/${eventId}`, values)
      .then((res) => {
        console.log(res);
        setValue("userId", res.data[0].userId);
        setValue("name", res.data[0].name);
        setValue("location", res.data[0].location);
        setValue("latitude", res.data[0].latitude);
        setValue("longitude", res.data[0].longitude);
        setValue("ticketPrice", res.data[0].ticketPrice);
        setValue("description", res.data[0].description);
        setValue("dateTime", res.data[0].dateTime);
      });
  };
  const handleEventIdChange = (e) => {
    setEventId(e.target.value);
  };
  const handleSearchClick = () => {
    axios.get(`http://localhost:3000/api/event/${eventId}`).then((res) => {
      console.log(res.data);
      setValue("userId", res.data[0].userId);
      setValue("name", res.data[0].name);
      setValue("location", res.data[0].location);
      setValue("latitude", res.data[0].latitude);
      setValue("longitude", res.data[0].longitude);
      setValue("ticketPrice", res.data[0].ticketPrice);
      setValue("description", res.data[0].description);
      setValue("dateTime", res.data[0].dateTime);
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
          <Heading size="md">Search by event id</Heading>
          <Box>
            <FormLabel htmlFor="eventId">Event id</FormLabel>
            <Input
              name="eventId"
              placeholder="1"
              onChange={handleEventIdChange}
              value={eventId}
              ref={register}
            />
          </Box>
          <Button onClick={handleSearchClick}>Search</Button>

          <Heading size="md">Update event</Heading>
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
          <Button type="submit">Update</Button>
        </Stack>
      </form>
    </>
  );
};

export default CreateEvent;
