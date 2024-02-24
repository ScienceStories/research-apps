import MenuIcon from '@mui/icons-material/Menu';
import { type SxProps } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Unstable_Grid2';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { PropsWithChildren, useState } from 'react';
import { Helmet } from 'react-helmet';
import { When } from 'react-if';
import { useMatch } from 'react-router';
import { Link } from 'react-router-dom';

import scienceStoriesLogo from '../../assets/science-stories-logo.png';
import { scienceStoriesURL } from '../../constants';


interface MainLayoutProps extends PropsWithChildren {
  title?: string;
  sx?: SxProps
}

export default function MainLayout({ children, sx, title }: MainLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({
    target: window,
  });

  const copyDate = `© ${new Date().getFullYear()}`;
  
  const isActiveRoute = (path: string) => Boolean(useMatch(path));

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }
  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <Slide
        appear={false}
        direction="down"
        in={!trigger}
      >
        <AppBar
          color="inherit"
          elevation={1}
        >
          <Toolbar sx={{ color: 'text.secondary' }}>
            <IconButton
              aria-label="menu"
              color="inherit"
              edge="start"
              onClick={handleMenuClick}
              size="large"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button
              href={scienceStoriesURL}
              sx={{ img: { width: 125 }}}
              target="_blank"
            >
              <img
                alt="Science Stories"
                src={scienceStoriesLogo}
              />
            </Button>
            <Typography
              color="text.secondary"
              fontSize={20}
              fontWeight={300}
              variant="overline"
            >
              Research
            </Typography>
            <When condition={!!title}>
              <Divider
                sx={{
                  flexGrow: 1,
                  mx: 10,
                }}
                textAlign="right"
              >
                <Typography
                  color="text.secondary"
                  component="div"
                  fontWeight={300}
                  px={2}
                  variant="h5"
                >
                  {title}
                </Typography>
              </Divider>
              <Helmet titleTemplate="%s | Science Stories - Research">
                <title>
                  {title}
                </title>
              </Helmet>
            </When>
          </Toolbar>
        </AppBar>
      </Slide>
      <Grid
        alignContent="center"
        bgcolor="#f4f2ee"
        container
        direction="column"
        justifyContent="space-between"
        m={0}
        minHeight="100vh"
        sx={sx}
      >
        <Grid justifySelf="center">
          <Toolbar />
          {children}
        </Grid>
        <Grid
          bgcolor="#cfccc5"
          component="footer"
          p={4}
          xs={12}
        >
          <Typography color="text.secondary">
            {copyDate} Science Stories Research Collaborative
          </Typography>
        </Grid>
      </Grid>
      <Drawer
        onClose={handleDrawerClose}
        open={drawerOpen}
      >
        <Box width={250}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                selected={isActiveRoute('/')}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link}
                selected={isActiveRoute('/fact-checker')}
                to="/fact-checker"
              >
                <ListItemText primary="Wikidata LLM Fact-Checker" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
