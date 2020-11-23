import NextLink from "next/link";
import { Container, Box, Link, HStack } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Box minW="100%" bg="blue" p="4">
        <HStack spacing="4">
          <Link as={NextLink} href="/crud">
            CRUD
          </Link>
          <Link as={NextLink} href="/mongodb">
            MongoDB
          </Link>
          <Link as={NextLink} href="/complex">
            Complex query
          </Link>
        </HStack>
      </Box>
      <Container p={4}>{children}</Container>
    </>
  );
};

export default Layout;
