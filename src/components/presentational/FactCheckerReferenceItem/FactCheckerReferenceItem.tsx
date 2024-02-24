import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Case,
  Default,
  Switch,
  When,
} from 'react-if';

import {
  URLValueWikidataPropIds,
  WikidataPropId,
  WikidataPropIdType,
  WikidataPropLabel,
} from '../../../constants';
import { FactCheckerReference } from '../../../types';


interface FactCheckerReferenceItemProps {
  reference: FactCheckerReference;
}

const RenderableWikidataPropIds = new Set<WikidataPropIdType>(Object.values(WikidataPropId))
const canRenderWikidataPropId = (propId: WikidataPropIdType) => RenderableWikidataPropIds.has(propId)
const showWikidataValueAsLink = (propId: WikidataPropIdType) => URLValueWikidataPropIds.has(propId)

export default function FactCheckerReferenceItem({ reference }: FactCheckerReferenceItemProps) {
  const { property: { id }, value: { description, label } } = reference;
  const propId = id as WikidataPropIdType
  const hasDescription = !!description;
  const propLabel = WikidataPropLabel[propId]

  return canRenderWikidataPropId(propId) ? (
    <Grid sx={{ m: 1, mt: .5 }}>
      <AssuredWorkloadOutlinedIcon
        fontSize="inherit"
        sx={{ mr: 1 }}
      />
      <Typography
        sx={{ fontWeight: 300 }}
        variant="caption"
      >
        {propLabel}:
      </Typography>
      <Typography
        fontWeight={500}
        pl={0.5}
        variant="caption"
      >
        <Switch>
          <Case condition={showWikidataValueAsLink(propId)}>
            <Link
              href={label}
              sx={{ color: 'inherit', fontWeight: 400, wordBreak: 'break-all' }}
              target="_blank"
            >
              {label}
            </Link>
          </Case>
          <Default>
            {label}
          </Default>
        </Switch>
      </Typography>
      <When condition={hasDescription}>
        <Typography
          display="block"
          variant="finePrint"
        >
          ({description})
        </Typography>
      </When>
    </Grid>
  ) : null;
}
