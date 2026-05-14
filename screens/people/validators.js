const namePattern = /^[a-zA-Z\s'-]+$/;

export const validateFirstName = (name) => {
  if (!name || name.trim().length === 0) return 'First name is required';
  if (name.trim().length < 2) return 'First name must be at least 2 characters';
  if (!namePattern.test(name.trim())) return 'First name must contain letters only';
  return null;
};

export const validateLastName = (name) => {
  if (!name || name.trim().length === 0) return 'Last name is required';
  if (name.trim().length < 2) return 'Last name must be at least 2 characters';
  if (!namePattern.test(name.trim())) return 'Last name must contain letters only';
  return null;
};
