import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import scienceStoriesLogo from '../../assets/science-stories-logo.png';
import MainLayout from '../../layouts/MainLayout/MainLayout';


export default function Home() {
  return (
    <MainLayout>
      <Helmet>
        <title>
          Research | Science Stories
        </title>
      </Helmet>
      <Grid
        alignContent="center"
        container
        direction="column"
        justifyContent="center"
        m={4}
        spacing={5}
      >
        <Grid
          sx={{ img: { maxWidth: 500 } }}
          textAlign="center"
        >
          <img
            alt="Science Stories"
            src={scienceStoriesLogo}
          />
          <Typography
            color="text.secondary"
            fontWeight={300}
            variant="h3"
          >
            Science Stories Research
          </Typography>
        </Grid>
        <Grid textAlign="center">
          <Button
            component={Link}
            size="large"
            to="/fact-checker"
            variant="outlined"
          >
            Wikidata LLM Fact-Checker
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
