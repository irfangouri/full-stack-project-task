const zod = require('zod');

const nameSchema = zod.string().min(3);
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(8);

const validateUser = (userData) => {
  const { name, email, password } = userData;

  const nameValidation = nameSchema.safeParse(name);
  if (name && !nameValidation.success) {
    return {
      error: 'User name is not valid, it must have a length of 3 characters',
    };
  }

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return {
      error: 'Email is not valid, Please enter a valid email address',
    };
  }

  const passwordValidation = passwordSchema.safeParse(password);
  if (!passwordValidation.success) {
    return {
      error: 'Password is not valid, it must have a length of 8 characters or more',
    };
  }
}

module.exports = {
  validateUser,
};
