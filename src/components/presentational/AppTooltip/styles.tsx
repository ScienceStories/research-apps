import { type Theme } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';

export default ({ theme }: { theme: Theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    color: theme.palette.text.primary,
    fontSize: 11,
    padding: theme.spacing(2),
  },
});
