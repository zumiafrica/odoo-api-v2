"use strict";
exports.parse = (res) => {
	if (res.error) {
		console.log("odoo response", res);
		const msg =
			(res.error.data && "Odoo Server Error: " + res.error.data.message) ||
			res.error.message;
		const err = new Error(msg);

		err.code = res.error.code;
		err.data = res.error.data;

		throw err;
	}

	return res.result;
};
