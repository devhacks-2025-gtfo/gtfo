import { Flex, Card, Button, Heading } from "@radix-ui/themes";

export default function Home(props: any) {
  return (
    <Flex height="100vh" justify="center" align="center" direction="column">
      <Card size="3">
        <Flex direction="column" gap="5">
          <Heading>
            Welcome to GTFO (<span style={{ color: "var(--accent-9)" }}>G</span>
            et <span style={{ color: "var(--accent-9)" }}>T</span>he{" "}
            <span style={{ color: "var(--accent-9)" }}>F</span>lag with{" "}
            <span style={{ color: "var(--accent-9)" }}>O</span>pponents)
          </Heading>
          <Button onClick={() => props.setConnected(true)}>
            Start Game
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
