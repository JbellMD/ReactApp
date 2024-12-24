import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Container,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Spa as SpaIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Shop', path: '/shop', icon: <SpaIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            {React.cloneElement(item.icon, { sx: { color: 'white' } })}
            <ListItemText primary={item.text} sx={{ ml: 2 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'primary.main',
          color: 'white'
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h6" 
              component={Link} 
              to="/"
              sx={{ 
                flexGrow: 1,
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              <SpaIcon sx={{ mr: 1 }} /> PlantHub
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 2,
              mr: 2
            }}>
              {menuItems.map((item) => (
                <motion.div
                  key={item.text}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Typography
                    component={Link}
                    to={item.path}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                      '&:hover': {
                        color: 'rgba(255, 255, 255, 0.9)',
                      }
                    }}
                  >
                    {item.text}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton 
              component={Link} 
              to="/cart"
              sx={{ 
                color: 'white',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </motion.div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 250,
            backgroundColor: 'primary.main',
            color: 'white'
          },
        }}
      >
        {drawer}
      </Drawer>

      <Container 
        component={motion.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          flex: 1,
          py: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright '}
            {new Date().getFullYear()}
            {' PlantHub. All rights reserved.'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
