"use strict";
exports.parse = (res) => {
	if (res.error) {
		const err = new Error(res.error.message);
		err.code = res.error.code;
		err.data = res.error.data;

		console.log(`Odoo error: ${JSON.stringify(res, null, 2)}`);
		throw err;
	}

	return res.result;
};
