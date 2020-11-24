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

import DisplayResult from "../DisplayResult";

const SearchEvent = () => {
  const toast = useToast();
  const [id, setId] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const handleSearchClick = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/event/${id}`);
      console.log(res.data);
      setSearchResult(res.data);
    } catch (err) {
      console.log(err);
      return toast({
        title: "Event not found.",
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
        <Heading size="md">Search event by id</Heading>
        <Box>
          <Text mb="1">Id</Text>
          <Input value={id} onChange={handleIdChange} />
        </Box>
        <Button onClick={handleSearchClick}>Search</Button>
      </Stack>
      {searchResult && (
        <Box
          spacing="4"
          p={4}
          border="1px solid"
          borderColor="gray.600"
          rounded="lg"
        >
          <DisplayResult data={searchResult} />
        </Box>
      )}
    </>
  );
};

export default SearchEvent;
