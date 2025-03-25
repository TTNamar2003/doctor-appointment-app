import Joi from "joi";

// Reusable validation components
const commonValidations = {
  name: () =>
    Joi.string()
      .pattern(/^[A-Za-z\s'-]{2,50}$/)
      .messages({
        "string.pattern.base": "Name contains invalid characters (2-50 chars)",
        "string.empty": "Name is required",
        "any.required": "Name is required",
      }),

  email: () =>
    Joi.string()
      .email({ tlds: { allow: true } })
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required",
      }),

  password: () =>
    Joi.string()
      .min(6)
      .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/)
      .messages({
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base":
          "Password must include a number & special character",
        "string.empty": "Password is required",
        "any.required": "Password is required",
      }),

  phone: () =>
    Joi.string()
      .pattern(/^\d{10}$/)
      .messages({
        "string.pattern.base": "Phone number must be a 10-digit number",
        "string.empty": "Phone number is required",
        "any.required": "Phone number is required",
      }),

  degree: () =>
    Joi.string().min(2).max(100).messages({
      "string.min": "Degree must be at least 2 characters",
      "string.max": "Degree must be less than 100 characters",
      "string.empty": "Degree is required",
      "any.required": "Degree is required",
    }),

  experience: () =>
    Joi.number().integer().min(0).messages({
      "number.integer": "Experience year must be a non-negative integer",
      "number.min": "Experience year cannot be negative",
    }),

  rating: () =>
    Joi.number().min(0).max(5).messages({
      "number.min": "Rating must be between 0 and 5",
      "number.max": "Rating must be between 0 and 5",
    }),

  optionalUrl: () =>
    Joi.string()
      .uri({ scheme: ["http", "https"] })
      .allow(null)
      .optional()
      .messages({
        "string.uri": "Invalid URL format",
      }),

  optionalText: () =>
    Joi.string().max(1000).allow(null).optional().messages({
      "string.max": "Text must be less than 1000 characters",
    }),
};

// Validation schemas
export const signupSchema = Joi.object({
  name: commonValidations.name().required(),
  email: commonValidations.email().required(),
  password: commonValidations.password().required(),
  phone_number: commonValidations.phone().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

export const loginSchema = Joi.object({
  email: commonValidations.email().required(),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const doctorSchema = Joi.object({
  name: commonValidations.name().required(),
  email: commonValidations.email().required(),
  experience_year: commonValidations.experience().optional(),
  degree: commonValidations.degree().required(),
  biography: commonValidations.optionalText(),
  photo_url: commonValidations.optionalUrl(),
  location: Joi.string().optional().allow(null),
  average_rating: commonValidations.rating().optional(),
});
