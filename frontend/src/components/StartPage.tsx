import {
  Flex,
  Text,
  Container,
  Box,
  Card,
  Button,
  Heading,
} from "@radix-ui/themes";

export default function StartPage() {
  return (
    <Flex height="100vh" justify="center" align="center" direction="column">
      <Card size="3">
        <Flex direction="column" gap="5">
          <Heading>Welcome to GTFO!</Heading>
          <Button>Start Game</Button>
        </Flex>
      </Card>
    </Flex>
  );
}
