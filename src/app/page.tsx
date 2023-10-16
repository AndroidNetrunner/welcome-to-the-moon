"use client";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTimeLimit, setTimeLimit } from "@/redux/slices/timerSlice";

export default function Home() {
  const dispatch = useDispatch();
  const timer = useSelector(selectTimeLimit);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <RadioGroup
        onChange={(event) => {
          console.log(`event:`, event.target.value);
          dispatch(setTimeLimit(parseInt(event.target.value)));
        }}
        value={timer}
      >
        ⏱️
        <FormControlLabel
          value={30}
          control={<Radio />}
          label="30s"
          sx={{ marginBottom: "1rem" }}
        />
        <FormControlLabel
          value={40}
          control={<Radio />}
          label="40s"
          sx={{ marginBottom: "1rem" }}
        />
        <FormControlLabel
          value={50}
          control={<Radio />}
          label="50s"
          sx={{ marginBottom: "1rem" }}
        />
      </RadioGroup>
      <Link href="/game">
        <Button>START</Button>
      </Link>
    </Box>
  );
}
