const { validationResult } = require("express-validator");

/**
 * Runs the validation of user signip fields (name, email and password).
 * If errors are not empty (with errors),
 * response 422, with the first error in the array [0].
 * @param {*} request Request of the body. User signup field.
 * @param {*} response Response of the error status and message [0].
 * @param {*} next Enables nodemon running without breaking when error occurs.
 * @returns
 */
exports.runValidation = (request, response, next) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	next();
};
