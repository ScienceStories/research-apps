import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import AutoFixOffOutlinedIcon from '@mui/icons-material/AutoFixOffOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import { Typography, useTheme } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Else,
  If,
  Then,
  When,
} from 'react-if';

import {
  FactCheckerAnnotation,
  FactCheckerReference,
  FactCheckerSource,
  FactCheckerSourceValue,
} from '../../../types';
import { statusToColor } from '../../../utils/factChecker';
import FactCheckerReferenceItem from '../FactCheckerReferenceItem/FactCheckerReferenceItem';


interface FactCheckerAnnotationMenuProps {
  annotation: FactCheckerAnnotation;
}

const refKey = (reference: FactCheckerReference, index: number) => `${reference.property.id}-${index}`;
const sourceKey = (id: FactCheckerSource['id'], index: number) =>  `${id}-${index}`;
const valueKey = (label: FactCheckerSourceValue['label'], index: number) => `${label}-${index}`

export default function FactCheckerAnnotationMenu({ annotation }: FactCheckerAnnotationMenuProps) {
  const theme = useTheme();

  const { sources, status } = annotation;
  const noStatus = !status || status === 'NO_STATUS'
  const color = statusToColor(status, theme)

  return (
    <Grid>
      <If condition={noStatus}>
        <Then>
          <Typography
            color="grey"
            fontStyle="italic"
            variant="subtitle1"
          >
            <AutoFixOffOutlinedIcon
              fontSize="inherit"
              sx={{ mr: 2, verticalAlign: 'text-top' }}
            />
            No informational claim was detected.
          </Typography>
        </Then>
        <Else>
          <Grid>
            <Grid>
              <Typography
                color={color}
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}
                variant="subtitle1"
              >
                {status.toLowerCase()} Claim Detected  
                <AutoFixHighOutlinedIcon
                  fontSize="inherit"
                  sx={{ ml: 1, verticalAlign: 'text-top' }}
                />
              </Typography>
            </Grid>
            {sources.map(({
              property_id: propertyId,
              property_label: propertyLabel,
              values,
              wikibase_url,
            }, i) => (
              <Grid
                bgcolor="background.lightGrey"
                key={sourceKey(propertyId, i)}
                my={2}
                sx={{
                  marginY: 2,
                  '&:hover': {
                    background: theme.palette.background.grey
                  }
                }}
              >
                <Typography
                  bgcolor={color}
                  color={theme.palette.getContrastText(color!)}
                  px={1}
                  py={0.5}
                  variant="overline"
                >
                  Source
                  <When condition={sources.length > 1}>
                    #{i + 1}
                  </When>
                </Typography>
                <Grid
                  px={1}
                  py={2}
                >
                  <Link
                    href={wikibase_url}
                    target='_blank'
                  >
                    <Typography variant="overline">
                      <TravelExploreOutlinedIcon
                        color="inherit"
                        fontSize="inherit"
                        sx={{ mr: 1 }}
                      />
                      {propertyLabel}
                    </Typography>
                  </Link>
                  <Grid mt={1}>
                    {values.map(({ description, label, references }, valueIndex) => (
                      <Grid
                        key={valueKey(label, valueIndex)}
                        mb={2}
                      >
                        <Typography
                          lineHeight={1}
                          variant="subtitle2"
                        >
                          <When condition={values.length > 1}>
                            {valueIndex+1}.
                          </When>
                          {label}
                        </Typography>
                        <Typography variant="finePrint">
                          {description}
                        </Typography>
                        {references.map((reference, refIndex) => (
                          <FactCheckerReferenceItem
                            key={refKey(reference, refIndex)}
                            reference={reference}
                          />
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Else>
      </If>
    </Grid>
  );
}
