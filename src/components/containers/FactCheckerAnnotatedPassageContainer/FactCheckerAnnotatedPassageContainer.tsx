import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { FactCheckerAnnotation, FactCheckerResponse } from '../../../types';
import AppTooltip from '../../presentational/AppTooltip/AppTooltip';
import FactCheckerAnnotatedText from '../../presentational/FactCheckerAnnotatedText/FactCheckerAnnotatedText';
import FactCheckerCoverageReport from '../../presentational/FactCheckerCoverageReport/FactCheckerCoverageReport';
import FactCheckerEntityCard from '../../presentational/FactCheckerEntityCard/FactCheckerEntityCard';


interface FactCheckerAnnotatedPassageContainerProps {
  data?: FactCheckerResponse;
}

const annotationKey = ({ start }: FactCheckerAnnotation, index: number) => `${start}-${index}`;

export default function FactCheckerAnnotatedPassageContainer({ data }: FactCheckerAnnotatedPassageContainerProps) {
  if (!data) {
    return null;
  }
  const {
    annotations,
    coverage,
    entity,
  } = data;
  const { label } = entity;
  
  return (
    <Grid p={2}>
      <Paper
        elevation={4}
        square
        sx={{ mb: 10 , mx: 5, p: 5 }}
      >
        <AppTooltip
          sx={{ '& .MuiTooltip-tooltip': { p: 0,  maxWidth: 650 }}}
          title={(
            <FactCheckerEntityCard entity={entity} />
          )}
        >
          <Typography
            textAlign="center"
            variant="h4"
          >
            {label}
            <AutoFixHighOutlinedIcon
              fontSize="inherit"
              sx={{ ml: 1, verticalAlign: 'text-top'}}
            />
          </Typography>
        </AppTooltip>
        <Divider sx={{ marginY: 3 }} />
        <Container sx={{ pb: 8, textAlign: 'left', textIndent: 25 }}>
          {annotations.map(((annotation, i) => (
            <FactCheckerAnnotatedText
              annotation={annotation}
              key={annotationKey(annotation, i)}
            />
          )))}
        </Container>
     </Paper>
        <Divider sx={{ marginY: 3 }} />
        <FactCheckerCoverageReport coverage={coverage} />
    </Grid>
  );
}
