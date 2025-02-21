import {
  Flex,
  Text,
  Box,
  Card,
  Button,
  Heading,
} from "@radix-ui/themes";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Flex height="100vh" justify="center" align="center" direction="column">
      <Card size="3">
        <Flex direction="column" gap="5">
          <Heading>Welcome to GTFO!</Heading>
          <Button asChild>
            <Link to="/game">Start Game</Link>
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
