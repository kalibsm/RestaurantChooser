/**
 * Validation utilities for Restaurant Chooser App
 * Contains validation functions for name, phone, address, and website
 */

/**
 * Validates a name field
 * @param {string} name - The name to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  // Check for weird symbols (allow letters, spaces, hyphens, apostrophes)
  const validNamePattern = /^[a-zA-Z\s'-]+$/;
  if (!validNamePattern.test(name.trim())) {
    return 'Name contains invalid characters';
  }
  
  return null;
};

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return 'Phone number is required';
  }
  
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return 'Phone number must have at least 10 digits';
  }
  
  if (digitsOnly.length > 15) {
    return 'Phone number is too long';
  }
  
  // Check if contains letters
  if (/[a-zA-Z]/.test(phone)) {
    return 'Phone number cannot contain letters';
  }
  
  return null;
};

/**
 * Validates an address
 * @param {string} address - The address to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateAddress = (address) => {
  if (!address || address.trim().length === 0) {
    return 'Address is required';
  }
  
  if (address.trim().length < 5) {
    return 'Address is too short';
  }
  
  // Check if address contains at least one number (street number)
  if (!/\d/.test(address)) {
    return 'Address must include a street number';
  }
  
  // Check if address contains at least one letter (street name)
  if (!/[a-zA-Z]/.test(address)) {
    return 'Address must include a street name';
  }
  
  return null;
};

/**
 * Validates a website URL
 * @param {string} website - The website URL to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateWebsite = (website) => {
  if (!website || website.trim().length === 0) {
    return 'Website is required';
  }
  
  // Check if it starts with http:// or https://
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    return 'Website must start with http:// or https://';
  }
  
  // Basic URL validation pattern
  const urlPattern = /^https?:\/\/.+\..+/;
  if (!urlPattern.test(website)) {
    return 'Invalid website format';
  }
  
  return null;
};

/**
 * Validates cuisine type (for picker)
 * @param {string} cuisine - The cuisine type
 * @returns {string|null} - Error message or null if valid
 */
export const validateCuisine = (cuisine) => {
  const validCuisines = ['American', 'Chinese', 'French', 'Italian', 'Mexican', 'Other'];
  
  if (!cuisine || cuisine.trim().length === 0) {
    return 'Please select a cuisine type';
  }
  
  if (!validCuisines.includes(cuisine)) {
    return 'Invalid cuisine type';
  }
  
  return null;
};

/**
 * Validates price level (1-5)
 * @param {number|string} price - The price level
 * @returns {string|null} - Error message or null if valid
 */
export const validatePrice = (price) => {
  if (!price) {
    return 'Please select a price level';
  }
  
  const priceNum = typeof price === 'string' ? parseInt(price, 10) : price;
  
  if (isNaN(priceNum) || priceNum < 1 || priceNum > 5) {
    return 'Price must be between 1 and 5';
  }
  
  return null;
};

/**
 * Validates rating (1-5)
 * @param {number|string} rating - The rating
 * @returns {string|null} - Error message or null if valid
 */
export const validateRating = (rating) => {
  if (!rating) {
    return 'Please select a rating';
  }
  
  const ratingNum = typeof rating === 'string' ? parseInt(rating, 10) : rating;
  
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return 'Rating must be between 1 and 5';
  }
  
  return null;
};
