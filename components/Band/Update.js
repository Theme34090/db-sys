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
  const [bandId, setBandId] = useState(null);

  const onSubmit = (values) => {
    console.log(values);
    axios
      .put(`http://localhost:3000/api/band/${bandId}`, values)
      .then((res) => {
        console.log(res);
        setValue("bandId", res.data[0].bandId);
        setValue("name", res.data[0].name);
        setValue("status", res.data[0].status);
        setValue("description", res.data[0].description);
        setValue("endDate", res.data[0].endDate);
      });
  };
  const handleBandIdChange = (e) => {
    setBandId(e.target.value);
  };
  const handleSearchClick = () => {
    axios.get(`http://localhost:3000/api/band/${bandId}`).then((res) => {
      console.log(res.data);
      setValue("bandId", res.data[0].bandId);
      setValue("name", res.data[0].name);
      setValue("status", res.data[0].status);
      setValue("description", res.data[0].description);
      setValue("endDate", res.data[0].endDate);
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
          <Heading size="md">Search by band id</Heading>
          <Box>
            <FormLabel htmlFor="bandId">Band id</FormLabel>
            <Input
              name="bandId"
              placeholder="1"
              onChange={handleBandIdChange}
              value={bandId}
              ref={register}
            />
          </Box>
          <Button onClick={handleSearchClick}>Search</Button>

          <Heading size="md">Update band</Heading>
          <Box>
            <FormLabel htmlFor="name">Band name</FormLabel>
            <Input name="name" placeholder="dbsys" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Input name="status" placeholder="inactive" ref={register} />
          </Box>
          <Box>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              name="description"
              placeholder="band description"
              ref={register}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="endDate">End date</FormLabel>
            <Input
              name="endDate"
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
