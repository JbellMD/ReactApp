import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Rating,
  Chip,
  Skeleton
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AddShoppingCart as AddShoppingCartIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useSnackbar } from 'notistack';

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    enqueueSnackbar(`${product.name} added to cart!`, { variant: 'success' });
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          pt: '100%',
          bgcolor: 'grey.50'
        }}
      >
        {isLoading && (
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height="100%" 
            sx={{ position: 'absolute', top: 0 }}
          />
        )}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setIsLoading(false)}
            onError={handleImageError}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isLoading ? 'none' : 'block'
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            Image not available
          </Box>
        )}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
            zIndex: 1
          }}
          onClick={() => setFavorite(!favorite)}
        >
          {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        {product.stock <= 5 && (
          <Chip
            label="Low Stock"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 1
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews})
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
            fullWidth
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
