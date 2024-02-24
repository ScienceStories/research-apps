import { Theme } from '@mui/material';

import { FactCheckerStatusColorMap } from '../constants';
import { FactCheckerStatus } from '../types';


export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const statusToColor = (status: FactCheckerStatus, theme?: Theme) => {
  const color = FactCheckerStatusColorMap[status]
  return (color && theme?.palette[color].main) || color
}
