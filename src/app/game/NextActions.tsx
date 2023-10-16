import { Grid, Typography, styled } from "@mui/material";
import ActionIcon from "./ActionIcon";
import { Action } from "@/constants/Actions";

interface DigitalTypographyProps {
  color: string;
}

const SmallDigitalTypography = styled(Typography)<DigitalTypographyProps>(
  ({ color }) => ({
    fontFamily: "Digital, sans-serif",
    color,
    fontSize: "15vw",
  })
);

export default function NextActions({
  nextActions,
}: {
  nextActions: Action[];
}) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <SmallDigitalTypography color="white">NEXT</SmallDigitalTypography>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Grid item>
          <ActionIcon action={nextActions[0]} />
        </Grid>
        <Grid item>
          <ActionIcon action={nextActions[1]} />
        </Grid>
        <Grid item>
          <ActionIcon action={nextActions[2]} />
        </Grid>
      </Grid>
    </Grid>
  );
}
