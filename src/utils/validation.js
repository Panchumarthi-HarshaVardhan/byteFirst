/**
 * Form input validation utilities
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return 'Phone number is required';
  // Allow international formatting, spaces, hyphens, parentheses
  const phoneDigits = phone.replace(/[^0-9]/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return 'Phone number must have between 10 and 15 digits';
  }
  return '';
};

export const validateRollNumber = (rollNumber) => {
  if (!rollNumber || !rollNumber.trim()) return 'Roll number is required';
  if (rollNumber.trim().length < 3) return 'Roll number is too short';
  return '';
};

export const validateRequired = (val, fieldName) => {
  if (!val || !val.trim()) return `${fieldName} is required`;
  return '';
};

export const validateImageFile = (file) => {
  if (!file) return { valid: false, error: 'No file selected' };

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload JPG, PNG, WEBP, or SVG.'
    };
  }

  // Max 5MB
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB. Please upload a smaller image.'
    };
  }

  return { valid: true, error: null };
};

export const validateAllFields = (student) => {
  const errors = {};

  if (!student.fullName.trim()) errors.fullName = 'Full Name is required';
  if (!student.rollNumber.trim()) errors.rollNumber = 'Roll Number is required';
  if (!student.collegeName.trim()) errors.collegeName = 'College Name is required';
  if (!student.branch.trim()) errors.branch = 'Branch is required';
  if (!student.year.trim()) errors.year = 'Year is required';
  if (!student.section.trim()) errors.section = 'Section is required';

  const emailErr = validateEmail(student.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(student.phone);
  if (phoneErr) errors.phone = phoneErr;

  if (!student.dob.trim()) errors.dob = 'Date of birth is required';
  if (!student.bloodGroup.trim()) errors.bloodGroup = 'Blood group is required';
  if (!student.address.trim()) errors.address = 'Address is required';

  return errors;
};
