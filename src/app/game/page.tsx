"use client";

import {
  ASTRONAUT_ACTION,
  Action,
  PLANNING_ACTION,
  PLANT_ACTION,
  ROBOT_ACTION,
  WATER_ACTION,
} from "@/constants/Actions";
import {
  ASTRONAUT_COLOR,
  ENERGY_COLOR,
  PLANNING_COLOR,
  PLANT_COLOR,
  ROBOT_COLOR,
  WATER_COLOR,
} from "@/constants/Colors";
import { selectDecks } from "@/redux/slices/decksSlice";
import { resetTimer, spendNextSecond } from "@/redux/slices/timerSlice";
import { Box, Grid, Typography, styled } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import ActionIcon from "./ActionIcon";
import NextActions from "./NextActions";

interface DigitalTypographyProps {
  color: string;
}

const DigitalTypography = styled(Typography)<DigitalTypographyProps>(
  ({ color }) => ({
    fontFamily: "Digital, sans-serif",
    color,
    fontSize: "25vw",
  })
);

const RotatedGrid = styled(Grid)`
  transform: rotate(180deg);
`;

export default function Game() {
  const dispatch = useDispatch();
  const {
    firstDeck,
    secondDeck,
    thirdDeck,
    flippedFirstCardDeck,
    flippedSecondCardDeck,
    flippedThirdCardDeck,
  } = useSelector(selectDecks);

  const availableNumbers = [
    firstDeck[firstDeck.length - 1].number,
    secondDeck[secondDeck.length - 1].number,
    thirdDeck[thirdDeck.length - 1].number,
  ];

  const availableActions = [
    flippedFirstCardDeck[flippedFirstCardDeck.length - 1].action,
    flippedSecondCardDeck[flippedSecondCardDeck.length - 1].action,
    flippedThirdCardDeck[flippedThirdCardDeck.length - 1].action,
  ];

  const nextActions = [
    firstDeck[firstDeck.length - 1].action,
    secondDeck[secondDeck.length - 1].action,
    thirdDeck[thirdDeck.length - 1].action,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => dispatch(spendNextSecond()), 1000);
    dispatch(resetTimer());
    return () => clearInterval(intervalId);
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RotatedGrid container spacing={2}>
        {availableNumbers.map((num, index) => (
          <Grid
            item
            xs={4}
            key={index}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <DigitalTypography color={getColorForCard(availableActions[index])}>
              {num}
            </DigitalTypography>
            <ActionIcon action={availableActions[index]} />
          </Grid>
        ))}
        <NextActions nextActions={nextActions} />
      </RotatedGrid>
      <Timer />
      <Grid container spacing={2}>
        {availableNumbers.map((num, index) => (
          <Grid
            item
            xs={4}
            key={index}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <DigitalTypography color={getColorForCard(availableActions[index])}>
              {num}
            </DigitalTypography>
            <ActionIcon action={availableActions[index]} />
          </Grid>
        ))}
        <NextActions nextActions={nextActions} />
      </Grid>
    </Box>
  );
}

const getColorForCard = (action: Action) => {
  switch (action) {
    case ASTRONAUT_ACTION:
      return ASTRONAUT_COLOR;
    case PLANT_ACTION:
      return PLANT_COLOR;
    case PLANNING_ACTION:
      return PLANNING_COLOR;
    case ROBOT_ACTION:
      return ROBOT_COLOR;
    case WATER_ACTION:
      return WATER_COLOR;
    default:
      return ENERGY_COLOR;
  }
};
