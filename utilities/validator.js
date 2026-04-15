const { body, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const bookingValidator = [
  body("bookingId")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Booking ID is required and must be a string'),
  body("userId")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("User ID is required and must be a string"),
  body("packageId")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Package ID is required and must be a string"),
  body("bookingDate")
    .notEmpty()
    .isISO8601()
    .withMessage("Booking date must be a valid ISO 8601 date"),
  body("travelDate")
    .notEmpty()
    .isISO8601()
    .withMessage("Travel date must be a valid ISO 8601 date"),
  body("numberOfPeople")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Number of people must be an integer greater than 0"),
  body("totalPrice")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Total price must be a positive number"),
  body("status")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Status is required and must be a short string"),
  validateRequest,
];

const destinationValidator = [
  body("destinationId")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Destination ID is required and must be a string'),
  body("name")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name is required and must be a string"),
  body("country")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country is required and must be a string"),
  body("description")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description is required and must be a string"),
  body("pricePerDay")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price per day is required and must be a non-negative number"),
  body("popular")
    .notEmpty()
    .isBoolean()
    .withMessage("Popular is required and must be a boolean"),
  body("imageUrl")
    .notEmpty()
    .isURL()
    .withMessage("Image URL is required and must be a valid URL"),
  validateRequest,
];

const packageValidator = [
  body("packageId")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Package ID is required and must be a string'),
  body("title")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title is required and must be a string"),
  body("destinationId")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Destination ID is required and must be a string"),
  body("durationDays")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Duration is required and must be an integer greater than 0"),
  body("price")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price is required and must be a non-negative number"),
  body("includesFlight")
    .notEmpty()
    .isBoolean()
    .withMessage("Includes flight is required and must be a boolean"),
  body("includesHotel")
    .notEmpty()
    .isBoolean()
    .withMessage("Includes hotel is required and must be a boolean"),
  body("maxPeople")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Max people number is required and must be an integer greater than 0"),
  body("description")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description is required and must be a string"),
  validateRequest,
];

const userValidator = [
  body("userId")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('User ID is required and must be a string'),
  body("name")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Name is required and must be a string"),
  body("email")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is required and must be valid"),
  body("phone")
    .notEmpty()
    .isString()
    .trim()
    .matches(/^[+\d][\d\- ]{6,19}$/)
    .withMessage("Phone is required and must be a valid phone number"),
  body("role")
    .notEmpty()
    .isIn(["user", "manager"])
    .withMessage("Role is required and must be either user or manager"),
  validateRequest,
];

module.exports = {
  bookingValidator,
  destinationValidator,
  packageValidator,
  userValidator,
};
