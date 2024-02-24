import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { FactCheckerCoverage, FactCheckerStatus } from '../../../types';
import { statusToColor } from '../../../utils/factChecker';


interface FactCheckerCoverageReportProps {
  coverage: FactCheckerCoverage;
}

const pluralize = (word: string, count: number) => count === 1 ? word : `${word}s`;

export default function FactCheckerCoverageReport({ coverage }: FactCheckerCoverageReportProps) {
  const entries = Object.entries(coverage).filter((([status]) => status !== 'NO_STATUS'));
  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={2}
    >
      {entries.map(([status, { count, size }]) => (
        <Card
          elevation={count ? 4 : 0}
          key={status}
          sx={{ display: 'flex' }}
        >
          <CardContent>
            <Typography
              color={count ? `${statusToColor(status as FactCheckerStatus)}.main` : 'gray'}
              component="div"
              variant="h5"
            >
              {pluralize(`${count} ${status.toLowerCase()} claim`, count)}
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              {pluralize(`${size} character`, size)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
