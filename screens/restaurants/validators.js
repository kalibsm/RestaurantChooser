export const validateName = (name) => {
  if (!name || name.trim().length === 0) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  const pattern = /^[a-zA-Z0-9\s,'-]*$/;
  if (!pattern.test(name.trim())) return 'Name contains invalid characters';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) return 'Phone is required';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10) return 'Phone must have at least 10 digits';
  if (digits.length > 15) return 'Phone number is too long';
  if (/[a-zA-Z]/.test(phone)) return 'Phone cannot contain letters';
  return null;
};

export const validateAddress = (address) => {
  if (!address || address.trim().length === 0) return 'Address is required';
  if (!/\d/.test(address)) return 'Address must include a street number';
  if (!/[a-zA-Z]/.test(address)) return 'Address must include a street name';
  return null;
};

export const validateWebsite = (website) => {
  if (!website || website.trim().length === 0) return 'Website is required';
  if (!website.startsWith('http://') && !website.startsWith('https://'))
    return 'Website must start with http://';
  if (!/^https?:\/\/.+\..+/.test(website)) return 'Invalid website format';
  return null;
};
