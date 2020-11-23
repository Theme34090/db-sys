import { Box, Text, Heading } from "@chakra-ui/react";

const DisplayResult = ({ data }) => {
  return (
    <>
      <Heading size="md" mb="2">
        Result
      </Heading>
      {data.map((each) => {
        if (each)
          return (
            <>
              {Object.entries(each).map((entry) => {
                return (
                  // <Box display="flex">
                  //   <Text fontWeight="bold">{entry[0]} :</Text>
                  //   <Text>{` ${entry[1]}`}</Text>
                  // </Box>
                  <Text>
                    <strong>{entry[0]} : </strong>
                    {entry[1]}
                  </Text>
                );
              })}
              <br />
            </>
          );
        else return null;
      })}
    </>
  );
};

export default DisplayResult;
