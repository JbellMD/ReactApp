import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'notistack';
import ProductCard from '../components/ProductCard';
import { config } from '../config';

// Import images directly
import snakePlantImg from '../assets/snakeplant.png';
import peaceLilyImg from '../assets/peacelily.png';
import bostonFernImg from '../assets/bostonfern.png';
import rubberPlantImg from '../assets/rubberplant.png';
import aloeVeraImg from '../assets/aloevera.png';
import lavenderImg from '../assets/lavender.png';
import aglaonemaImg from '../assets/aglaonema.jpg';
import castIronPlantImg from '../assets/cast-iron-plant.jpg';
import basilImg from '../assets/basil.jpg';
import oreganoImg from '../assets/oregano.jpg';
import lemonBalmImg from '../assets/lemonbalm.jpg';
import marigoldImg from '../assets/marigold.jpg';

// Sample categories - replace with your actual categories
const categories = [
  'Indoor Plants',
  'Outdoor Plants',
  'Succulents',
  'Herbs',
  'Flowering Plants',
  'Air Plants',
];

// Sample product data with local images
const sampleProducts = [
  {
    id: 1,
    name: 'Snake Plant',
    description: 'Produces oxygen at night, improving air quality.',
    price: 15.00,
    image: snakePlantImg,
    category: 'Air Plants',
    rating: 4.8,
    reviews: 61,
    stock: 15
  },
  {
    id: 2,
    name: 'Peace Lily',
    description: 'Removes mold spores and purifies the air.',
    price: 18.00,
    image: peaceLilyImg,
    category: 'Air Plants',
    rating: 4.7,
    reviews: 49,
    stock: 8
  },
  {
    id: 3,
    name: 'Boston Fern',
    description: 'Natural air humidifier and purifier.',
    price: 22.00,
    image: bostonFernImg,
    category: 'Indoor Plants',
    rating: 4.6,
    reviews: 55,
    stock: 12
  },
  {
    id: 4,
    name: 'Rubber Plant',
    description: 'Excellent for removing air toxins.',
    price: 25.00,
    image: rubberPlantImg,
    category: 'Indoor Plants',
    rating: 4.4,
    reviews: 42,
    stock: 5
  },
  {
    id: 5,
    name: 'Aloe Vera',
    description: 'Air purifying and medicinal properties.',
    price: 16.00,
    image: aloeVeraImg,
    category: 'Succulents',
    rating: 4.9,
    reviews: 83,
    stock: 25
  },
  {
    id: 6,
    name: 'Lavender',
    description: 'Aromatic herb with calming properties.',
    price: 14.00,
    image: lavenderImg,
    category: 'Herbs',
    rating: 4.7,
    reviews: 92,
    stock: 30
  },
  {
    id: 7,
    name: 'Aglaonema',
    description: 'Beautiful indoor plant with colorful leaves.',
    price: 19.00,
    image: aglaonemaImg,
    category: 'Indoor Plants',
    rating: 4.5,
    reviews: 38,
    stock: 18
  },
  {
    id: 8,
    name: 'Cast Iron Plant',
    description: 'Nearly indestructible indoor plant.',
    price: 21.00,
    image: castIronPlantImg,
    category: 'Indoor Plants',
    rating: 4.6,
    reviews: 45,
    stock: 22
  },
  {
    id: 9,
    name: 'Basil',
    description: 'Fresh herb perfect for cooking.',
    price: 12.00,
    image: basilImg,
    category: 'Herbs',
    rating: 4.8,
    reviews: 71,
    stock: 40
  },
  {
    id: 10,
    name: 'Oregano',
    description: 'Essential herb for Mediterranean cooking.',
    price: 11.00,
    image: oreganoImg,
    category: 'Herbs',
    rating: 4.5,
    reviews: 58,
    stock: 35
  },
  {
    id: 11,
    name: 'Lemon Balm',
    description: 'Fragrant herb with calming properties.',
    price: 13.00,
    image: lemonBalmImg,
    category: 'Herbs',
    rating: 4.4,
    reviews: 33,
    stock: 25
  },
  {
    id: 12,
    name: 'Marigold',
    description: 'Bright flowering plant that repels pests.',
    price: 10.00,
    image: marigoldImg,
    category: 'Flowering Plants',
    rating: 4.3,
    reviews: 47,
    stock: 30
  }
];

const Shop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { enqueueSnackbar } = useSnackbar();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with our sample data
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
    setLoading(false);
  }, []);

  // Filter products based on search, price range, and categories
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, selectedCategories, products]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 200]);
    setSelectedCategories([]);
  };

  const filterDrawerContent = (
    <Box sx={{ width: 250, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Filters</Typography>
        {isMobile && (
          <IconButton onClick={() => setIsFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={200}
        sx={{ mb: 4 }}
      />

      <Typography variant="subtitle1" sx={{ mb: 2 }}>Categories</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>

      <Button
        variant="outlined"
        fullWidth
        onClick={clearFilters}
        sx={{ mt: 4 }}
      >
        Clear Filters
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>Shop Plants</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plants..."
            variant="outlined"
            sx={{ flexGrow: 1, maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {isMobile && (
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              Filters
            </Button>
          )}
        </Box>
      </Box>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 200) && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          {selectedCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              onDelete={() => handleCategoryToggle(category)}
            />
          ))}
          {(priceRange[0] !== 0 || priceRange[1] !== 200) && (
            <Chip
              label={`$${priceRange[0]} - $${priceRange[1]}`}
              onDelete={() => setPriceRange([0, 200])}
            />
          )}
        </Box>
      )}

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Filters - Desktop */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            {filterDrawerContent}
          </Grid>
        )}

        {/* Products Grid */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
          <AnimatePresence>
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && !loading && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No products found matching your criteria
              </Typography>
              <Button
                variant="contained"
                onClick={clearFilters}
                sx={{ mt: 2 }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Filter Drawer - Mobile */}
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      >
        {filterDrawerContent}
      </Drawer>
    </Container>
  );
};

export default Shop;
