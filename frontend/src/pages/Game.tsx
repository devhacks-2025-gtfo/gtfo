import Clock from "../components/Clock";
import ScoreCard from "../components/ScoreCard";
import { Flex, Box } from "@radix-ui/themes";
import { io } from "socket.io-client";
import { useState } from "react";

//const socket = io("http://localhost:8000", { withCredentials: true });

const time: number = Date.now() + 5 * 60 * 1000; // TODO: update time
const myScore: number = 1;
const otherScore: number = 1;

export default function Game() {
  return (
    <>
      <Flex justify="center" align="center">
        <Clock time={time} />
      </Flex>
      <Flex justify="center" width="100vw" gap="9">
        <ScoreCard score={myScore} title="My Score" />
        <Box />
        <ScoreCard score={otherScore} title="Opponent's Score" />
      </Flex>
    </>
  );
}
