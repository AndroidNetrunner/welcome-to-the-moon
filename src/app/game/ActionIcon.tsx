import {
  ASTRONAUT_ACTION,
  Action,
  ENERGY_ACTION,
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
import RobotIcon from "@mui/icons-material/PrecisionManufacturing";
import EnergyIcon from "@mui/icons-material/ElectricBolt";
import PlantIcon from "@mui/icons-material/Spa";
import WaterIcon from "@mui/icons-material/WaterDrop";
import AstronautIcon from "@mui/icons-material/Person";
import PlanningIcon from "@mui/icons-material/CalendarMonth";

export default function ActionIcon({ action }: { action: Action }) {
  switch (action) {
    case ROBOT_ACTION:
      return <RobotIcon htmlColor={ROBOT_COLOR} fontSize="large" />;
    case ENERGY_ACTION:
      return <EnergyIcon htmlColor={ENERGY_COLOR} fontSize="large" />;
    case PLANT_ACTION:
      return <PlantIcon htmlColor={PLANT_COLOR} fontSize="large" />;
    case WATER_ACTION:
      return <WaterIcon htmlColor={WATER_COLOR} fontSize="large" />;
    case ASTRONAUT_ACTION:
      return <AstronautIcon htmlColor={ASTRONAUT_COLOR} fontSize="large" />;
    default:
      return <PlanningIcon htmlColor={PLANNING_COLOR} fontSize="large" />;
  }
}
