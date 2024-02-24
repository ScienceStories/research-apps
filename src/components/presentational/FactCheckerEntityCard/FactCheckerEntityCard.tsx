import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import { FactCheckerEntity } from '../../../types';


interface FactCheckerEntityCardProps {
  entity: FactCheckerEntity;
}

export default function FactCheckerEntityCard({ entity }: FactCheckerEntityCardProps) {
  const {
    aliases,
    description,
    id: qid,
    image,
    label,
    wikibase_url: wikibaseUrl,
  } = entity;
  return (
    <Card
      elevation={0}
      sx={{ display: 'flex' }}
    >
      <When condition={!!image}>
        <CardMedia
          component="img"
          image={image}
          sx={{ maxWidth: 300 }}
          title={label}
        />
      </When>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography
            component="div"
            variant="h5"
          >
            {label}
          </Typography>
          <When condition={!!description}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="body2"
            >
              {description}
            </Typography>
          </When>
          <Typography
            color="text.secondary"
            gutterBottom
            variant="subtitle2"
          >
            Wikidata ID: {qid}
          </Typography>
          <When condition={!!aliases?.length}>
            <Typography
              color="text.secondary"
              variant="subtitle2"
            >
              Aliases
            </Typography>
            <Box sx={{ px: 1 }}>
              {aliases.map((name, i) => (
                <Chip
                  icon={(
                    <BadgeOutlinedIcon />
                  )}
                  key={`${name}-${i}`}
                  label={name}
                  size="small"
                  sx={({ palette }) => ({
                    bgcolor: palette.background.grey,
                    color: palette.text.secondary,
                    fontWeight: 400,
                    pl: 1,
                    m: .4,
                  })}
                />
              ))}
            </Box>
          </When>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            href={wikibaseUrl}
            size="small"
            target="_blank"
          >
            Learn More
          </Button>
        </CardActions>
    </Box>
  </Card>
  );
}
