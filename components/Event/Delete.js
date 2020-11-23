import { useState } from "react";
import axios from "axios";
import {
  Heading,
  Text,
  Input,
  Button,
  Stack,
  Box,
  useToast,
} from "@chakra-ui/react";

const DeleteEvent = () => {
  const [id, setId] = useState(null);
  const toast = useToast();

  const handleSearchClick = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/event/${id}`);
      console.log(res.data);
      return toast({
        title: "Event deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      return toast({
        title: "Event not found, delete failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  return (
    <>
      <Stack
        spacing="4"
        p={4}
        border="1px solid"
        borderColor="gray.600"
        rounded="lg"
      >
        <Heading size="md">Delete event by id</Heading>
        <Box>
          <Text mb="1">Id</Text>
          <Input value={id} onChange={handleIdChange} />
        </Box>
        <Button onClick={handleSearchClick}>Delete</Button>
      </Stack>
    </>
  );
};

export default DeleteEvent;
