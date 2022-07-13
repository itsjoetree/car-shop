import '../styles/globals.css'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { createTheme, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

type NavItem = {
  name: string,
  href: string,
}

const DRAWER_WIDTH = 240;

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Cars", href: "/cars" }
];

const APP_COLOR = "#5D3FD3"

function MyApp({ Component, pageProps }: AppProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Car Shop
      </Typography>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href={item.href}><ListItemText primary={item.name} /></Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: APP_COLOR
      }
    },
    typography: {
      h2: {
        color: APP_COLOR,
        fontWeight: "bolder"
      },
      h4: {
        color: APP_COLOR,
        fontWeight: "bolder"
      }
    }
  });


  return (<ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ backgroundColor: "#5D3FD3" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Car Shop
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {NAV_ITEMS.map((item) => (<Link key={item.name} href={item.href}><Button key={item.name} sx={{ color: '#fff' }}>{item.name}</Button></Link>))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>

    <Box style={{ marginTop: "5em" }}>
      <Component {...pageProps} />
    </Box>
  </ThemeProvider>)
}

export default MyApp
