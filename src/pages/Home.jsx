import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import greenhouseImg from '../assets/greenhouse.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginTop: '-64px', // Compensate for AppBar height
        paddingTop: '64px', // Add padding equal to AppBar height
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${greenhouseImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7)',
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container 
        maxWidth="md" 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            mb: 4,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
          }}
        >
          Welcome to PlantHub
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            color: 'white',
            mb: 6,
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            lineHeight: 1.6,
            fontSize: { xs: '1.1rem', md: '1.5rem' },
          }}
        >
          Discover our collection of beautiful plants to bring nature into your home.
          From air-purifying varieties to low-maintenance succulents, find the perfect
          green companion for your space.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/shop')}
          sx={{
            py: 2,
            px: 6,
            fontSize: '1.1rem',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'translateY(-2px)',
              boxShadow: 3,
            },
            transition: 'all 0.3s ease',
          }}
        >
          Shop Now
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
