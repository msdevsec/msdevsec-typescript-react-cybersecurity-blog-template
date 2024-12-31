type ValidationErrors = Record<string, string[]>;

export const validateForm = (data: Record<string, string>): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Email validation
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = ['Please enter a valid email address'];
    }
  }

  // Password validation
  if (data.password) {
    if (data.password.length < 8) {
      errors.password = ['Password must be at least 8 characters long'];
    }
  }

  // Confirm password validation
  if (data.confirmPassword && data.password !== data.confirmPassword) {
    errors.confirmPassword = ['Passwords do not match'];
  }

  // Username validation
  if (data.username) {
    if (data.username.length < 3) {
      errors.username = ['Username must be at least 3 characters long'];
    }
    if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
      errors.username = [...(errors.username || []), 'Username can only contain letters, numbers, and underscores'];
    }
  }

  // Name validation
  if (data.firstName && data.firstName.length < 2) {
    errors.firstName = ['First name must be at least 2 characters long'];
  }

  if (data.lastName && data.lastName.length < 2) {
    errors.lastName = ['Last name must be at least 2 characters long'];
  }

  return errors;
};
