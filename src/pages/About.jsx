import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Spa,
  Nature,
  Favorite,
  Groups
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Spa />,
    title: 'Quality Plants',
    description: 'We source only the highest quality plants from trusted growers.',
  },
  {
    icon: <Nature />,
    title: 'Sustainable',
    description: 'Our practices prioritize environmental sustainability.',
  },
  {
    icon: <Favorite />,
    title: 'Plant Care',
    description: 'Expert advice and support for your plant care journey.',
  },
  {
    icon: <Groups />,
    title: 'Community',
    description: 'Join our growing community of plant enthusiasts.',
  },
];

const About = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" gutterBottom>
            About PlantHub
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Your trusted source for beautiful, healthy plants
          </Typography>
        </motion.div>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 60,
                      height: 60,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Mission Statement */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          borderRadius: 2,
          p: 6,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
            At PlantHub, we're passionate about bringing the beauty and benefits of plants into people's lives.
            Our mission is to provide high-quality plants and expert guidance to help create greener, healthier spaces
            while promoting sustainable practices and building a community of plant lovers.
          </Typography>
        </motion.div>
      </Box>
    </Container>
  );
};

export default About;
