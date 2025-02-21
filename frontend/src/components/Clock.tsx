import { Text } from "@radix-ui/themes";

export default function Clock(props: { time: number }) {
  return <Text className="clock">{props.time}</Text>;
}
