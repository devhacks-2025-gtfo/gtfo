import { Box, Flex, Heading, Text } from "@radix-ui/themes";

interface ScoreCardProps {
  title: string;
  score: number;
}

export default function ScoreCard(props: ScoreCardProps) {
  return (
    <Box style={{
      border: "3px var(--gray-10) solid",
      borderRadius: "15px",
      background: "var(--gray-6)"
    }}>
      <Flex width="300px" height="500px" direction="column" align="center" justify="center">
        <Heading>{props.title}</Heading>
        <Text className="score-text">{props.score}</Text>
      </Flex>
    </Box>
  );
}
