'use strict';
const request = require('./request');
const response = require('./response');
const { parseOdooArgs } = require("./utils")

class OdooClient {

	constructor(connection, opts) {
		this._connection = connection;
		this._opts = opts;
	}

	readGroup(model, args, groupBy, params = {}, options = {}) {
		if(!Array.isArray(groupBy)) {
			groupBy = [groupBy];
		}

		const body = {
			model,
			method: 'read_group',
			args: options.noParamParser ? args : parseOdooArgs(args),
			kwargs: {
				context: Object.assign({}, this._connection.user_context, params.context || {}),
				groupby: groupBy,
				lazy: params.lazy || true,
				offset: params.offset || 0,
				limit: params.limit || false,
				orderby: params.order || false,
				fields: params.select
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	count(model, args, params = {}, options = {}) {
		const body = {
			model,
			method: 'search_count',
			args: options.noParamParser ? args : parseOdooArgs(args),
			kwargs: {
				context: Object.assign({}, this._connection.user_context, params.context || {})
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	search(model, args, params = {}, options = {}) {
		const body = {
			model,
			method: 'search',
			args: options.noParamParser ? args : parseOdooArgs(args),
			kwargs: {
				context: Object.assign({}, this._connection.user_context, params.context || {})
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	read(model, args, params = {}, options = {}) {
		const reqArgs = [args];

		if(params.select) {
			reqArgs.push(params.select);
		}

		const body = {
			model,
			method: 'read',
			args: reqArgs,
			kwargs: {
				context: Object.assign({}, this._connection.user_context, params.context || {})
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	searchRead(model, args, params = {}, options = {}) {
		const body = {
			model,
			method: 'search_read',
			args: options.noParamParser ? args : parseOdooArgs(args),
			kwargs: {
				...params,
				context: Object.assign({}, this._connection.user_context, params.context || {}),
				offset: params.offset || 0,
				limit: params.limit || 5,
				order: params.order
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	create(model, args, params = {}, options = {}) {
		const body = {
			model,
			method: 'create',
			args: [args],
			kwargs: {
				context: Object.assign({}, this._connection.user_context, params.context || {})
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	reverseMoves(model, args, params = {}, options = {}) {
		const body = {
			model,
			method: 'reverse_moves',
			args: [args],
			kwargs: {
				context: Object.assign({}, this._connection.user_context, params.context || {})
			}
		};

		return request(this._opts, body).then(response.parse);
	}

	call(model, method, args, params = {}, options = {}) {
		const body = {
			model,
			method,
			args: options.noParamParser ? args : parseOdooArgs(args),
			kwargs: Object.assign({
				context: this._connection.user_context
			}, params)
		};

		return request(this._opts, body).then(response.parse);
	}

	update(model, args, params = {}, options = {}) {
		const body = {
			model,
			method: 'write',
			args: [[args.id], args.data],
			kwargs: {
				context: Object.assign({}, this._connection.user_context, params.context || {})
			}
		};

		return request(this._opts, body).then(response.parse);
	}
}

module.exports = OdooClient;
