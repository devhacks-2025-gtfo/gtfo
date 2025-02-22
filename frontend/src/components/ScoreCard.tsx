import { Card, Flex, Heading, Text } from "@radix-ui/themes";

interface ScoreCardProps {
  title: string;
  score: number;
}

export default function ScoreCard(props: ScoreCardProps) {
  return (
    <Card size="3">
      <Flex width="300px" direction="column" align="center" justify="center">
        <Heading>{props.title}</Heading>
        <Text className="score-text">{props.score}</Text>
      </Flex>
    </Card>
  );
}
