export const ROBOT_ACTION = "robot";
export const ENERGY_ACTION = "energy";
export const PLANT_ACTION = "plant";
export const WATER_ACTION = "water";
export const ASTRONAUT_ACTION = "astronaut";
export const PLANNING_ACTION = "planning";

export type Action =
  | typeof ROBOT_ACTION
  | typeof ENERGY_ACTION
  | typeof PLANT_ACTION
  | typeof WATER_ACTION
  | typeof ASTRONAUT_ACTION
  | typeof PLANNING_ACTION;
