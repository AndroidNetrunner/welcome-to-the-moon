"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { resetTimer, selectTimeLimit } from "@/redux/slices/timerSlice";
import { flipCards } from "@/redux/slices/decksSlice";
import Container from "@mui/material/Container";

const Timer: React.FC = () => {
  const timeLimit = useSelector(selectTimeLimit);
  const [percentage, setPercentage] = useState(timeLimit);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = prevPercentage - 1 / 10;
        if (newPercentage <= 0 && prevPercentage > 0) {
          dispatch(flipCards());
          dispatch(resetTimer());
          return timeLimit;
        }
        return newPercentage;
      });
    }, 100);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timeLimit]);
  const positionValue = ((timeLimit - percentage) / timeLimit) * 50;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "4px",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            width: `${positionValue}%`,
            height: "100%",
            backgroundColor: "#000",
            transition: "left 1s linear",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 0,
            width: `${positionValue}%`,
            height: "100%",
            backgroundColor: "#000",
            transition: "right 1s linear",
          }}
        />
      </Box>
    </Container>
  );
};

export default Timer;
