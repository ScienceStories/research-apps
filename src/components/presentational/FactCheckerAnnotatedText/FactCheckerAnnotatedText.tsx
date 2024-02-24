import { lighten, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { FactCheckerAnnotation } from '../../../types';
import { statusToColor } from '../../../utils/factChecker';
import AppTooltip from '../AppTooltip/AppTooltip';
import FactCheckerAnnotationMenu from '../FactCheckerAnnotationMenu/FactCheckerAnnotationMenu';


interface FactCheckerAnnotationProps {
  annotation: FactCheckerAnnotation;
}

export default function FactCheckerAnnotation({ annotation }: FactCheckerAnnotationProps) {
  const theme = useTheme()

  const { content, status } = annotation
  const color = statusToColor(status, theme)
  const bgColor = color && lighten(color, .85)
  const hoverColor = color ? lighten(color, .7) : theme.palette.grey[300]
  
  return (
    <AppTooltip
      title={(
        <FactCheckerAnnotationMenu annotation={annotation} />
      )}
    >
      <Typography
        className={status}
        sx={{
          backgroundColor: bgColor,
          display: 'inline',
          marginX: .1,
          borderRadius: 1,
          paddingX: .5,
          '&:hover': {
            bgcolor: hoverColor
          }
        }}
      >
        {content}
      </Typography>
    </AppTooltip>
  );
}
