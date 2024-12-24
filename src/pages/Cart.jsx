import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Divider,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import {
  removeFromCart,
  addToCart,
  removeItemCompletely,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.stock) {
      enqueueSnackbar('Quantity exceeds available stock', { variant: 'error' });
      return;
    }
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemCompletely(itemId));
    enqueueSnackbar('Item removed from cart', { variant: 'success' });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    enqueueSnackbar('Cart cleared', { variant: 'success' });
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          </motion.div>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Add some plants to make your space greener!
          </Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
          >
            Start Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Shopping Cart</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ mb: 2, position: 'relative' }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 1,
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={9}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              ${item.price.toFixed(2)} each
                            </Typography>
                          </Box>
                          
                          <IconButton
                            onClick={() => handleRemoveItem(item.id)}
                            color="error"
                            sx={{ mt: -1, mr: -1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value)) {
                                  handleQuantityChange(item, value);
                                }
                              }}
                              type="number"
                              size="small"
                              inputProps={{ min: 1, max: item.stock }}
                              sx={{ width: 60, mx: 1 }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                          
                          <Typography variant="subtitle1" sx={{ ml: 'auto' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal ({totalQuantity} items)</Typography>
                  <Typography>${totalAmount.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => enqueueSnackbar('Checkout functionality coming soon!', { variant: 'info' })}
              >
                Proceed to Checkout
              </Button>

              <Button
                component={Link}
                to="/shop"
                variant="outlined"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
