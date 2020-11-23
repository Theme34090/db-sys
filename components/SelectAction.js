import { Radio, RadioGroup, Stack, Heading, Box } from "@chakra-ui/react";

const SelectAction = ({ setValue, value }) => {
  return (
    <>
      <Box p={4} border="1px solid" borderColor="gray.600" rounded="lg">
        <Heading mb="2">Select action</Heading>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <Radio value="search">Search</Radio>
            <Radio value="create">Create</Radio>
            <Radio value="update">Update</Radio>
            <Radio value="delete">Delete</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </>
  );
};

export default SelectAction;
