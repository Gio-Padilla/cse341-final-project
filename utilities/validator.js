const { body, param, validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const bookingValidator = [
    body("bookingId").notEmpty().isString().withMessage('Booking ID is required and must be a string'),
  body("userId")
    .notEmpty()
    .isString()
    .withMessage("User ID is required and must be a string"),
  body("packageId")
    .notEmpty()
    .isString()
    .withMessage("Package ID is required and must be a string"),
  body("bookingDate").isDate().withMessage("Booking date must be a valid date"),
  body("travelDate").isDate().withMessage("Travel date must be a valid date"),
  body("numberOfPeople")
    .isInt()
    .withMessage("Number of people must be an integer"),
  body("totalPrice").isFloat().withMessage("Total price must be a float"),
  body("status")
    .notEmpty()
    .isString()
    .withMessage("Status is required and must be a string"),
  validateRequest,
];

const destinationValidator = [
    body("destinationId").notEmpty().isString().withMessage('Destination ID is required and must be a string'),
  body("name")
    .notEmpty()
    .isString()
    .withMessage("Name is required and must be a string"),
  body("country")
    .notEmpty()
    .isString()
    .withMessage("Country is required and must be a string"),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description is required and must be a string"),
  body("pricePerDay")
    .notEmpty()
    .isFloat()
    .withMessage("Price per day is required and must be a float"),
  body("popular")
    .notEmpty()
    .isBoolean()
    .withMessage("Popular is required and must be a boolean"),
  body("imageUrl")
    .notEmpty()
    .isString()
    .withMessage("Image URL is required and must be a string"),
  validateRequest,
];

const packageValidator = [
    body("packageId").notEmpty().isString().withMessage('Package ID is required and must be a string'),
  body("title")
    .notEmpty()
    .isString()
    .withMessage("Title is required and must be a string"),
  body("destinationId")
    .notEmpty()
    .isString()
    .withMessage("Destination ID is required and must be a string"),
  body("durationDays")
    .notEmpty()
    .isInt()
    .withMessage("Duration is required and must be an integer"),
  body("price")
    .notEmpty()
    .isFloat()
    .withMessage("Price is required and must be a float"),
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
    .isInt()
    .withMessage("Max people number is required and must be an integer"),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description is required and must be a string"),
  validateRequest,
];

const userValidator = [
    body("userId").notEmpty().isString().withMessage('User ID is required and must be a string'),
  body("name")
    .notEmpty()
    .isString()
    .withMessage("Name is required and must be a string"),
  body("email")
    .notEmpty()
    .isString()
    .withMessage("Email is required and must be a string"),
  body("phone")
    .notEmpty()
    .isString()
    .withMessage("Phone is required and must be a string"),
  body("role")
    .notEmpty()
    .isString()
    .withMessage("Role is required and must be a string"),
  validateRequest,
];

module.exports = {
  bookingValidator,
  destinationValidator,
  packageValidator,
  userValidator,
}
