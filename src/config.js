// Configuration for the application
export const config = {
  // Base URL for assets, changes based on environment
  baseUrl: process.env.NODE_ENV === 'production' ? '/ReactApp' : '',
  
  // Other configuration options can be added here
  api: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? 'https://api.example.com' 
      : 'http://localhost:3000'
  }
};
