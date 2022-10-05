# odoo-api

> [Odoo](https://www.odoo.com) JSON-RPC client

This is a fork of [`odoo-connect`](https://github.com/pridiktiv/odoo-connect) with:

- [x] New added methods (read/count/readGroup)
- [x] HTTPS support
- [x] Native Args query: ["id > 1", "name = Louis"]
- [x] Aync/Await supported
- [ ] Middleware
- [ ] TypeScript

## Install

```
npm install --save "https://github.com/zumiafrica/odoo-api-v2.git#main"

OR

yarn add --save "https://github.com/zumiafrica/odoo-api-v2.git#main"
```

## Usage

```js
import Odoo from "@truthtaicom/odoo-api-v2";

export default async function odooApi() {
	try {
		const odoo = new Odoo({
			host: "localhost",
			port: 3979,
		});

		const client = await odoo.connect({
			database: "odoo_db",
			username: "your-user-name",
			password: "1234567890",
		});

		const data = await client.searchRead("res.partner", ["name = My Company"], {
			select: ["id", "name"],
		});

		console.log("data", data);
	} catch (error) {
		console.log("ERROR", error);
	}
}
```

## API

### new Odoo(options)

**Returns a Odoo instance**
| options | type | default | required | description |
|---------|--------|------------|----------|-------------------|
| host | string | localhost | yes | Odoo Host Address |
| port | number | 80 | yes | Odoo Port |

### odoo.connect(options)

**Returns a `Promise` for a [client](#client) object.**
| options | type | default | required | description |
|----------|--------|---------|----------|-----------------------|
| database | string | null | yes | Name of the database |
| username | string | null | yes | Name of Odoo Username |
| password | string | null | yes | Name of Odoo Password |

### Client

### client.readGroup(model, args, groupBy, params)

| options       | type     | default | required | description                                             |
| ------------- | -------- | ------- | -------- | ------------------------------------------------------- |
| model         | string   | null    | yes      | Model to perform the action on.                         |
| args          | array    | null    | no       | List of parameters. Example: ["id > 1", "name = Louis"] |
| groupBy       | array    | null    | no       | Fields to group by.                                     |
| params.offset | number   | 0       | no       | Result offset.                                          |
| params.limit  | number   | 5       | no       | Maximum number of results.                              |
| params.order  | string   | id      | no       | Name of the fields used to sort the results.            |
| params.select | string[] | []      | no       | Fields that should be selected.                         |

### client.count(model, args)

| options | type   | default | required | description                                             |
| ------- | ------ | ------- | -------- | ------------------------------------------------------- |
| model   | string | null    | yes      | Model to perform the action on.                         |
| args    | array  | null    | no       | List of parameters. Example: ["id > 1", "name = Louis"] |

### client.read(model, args, params)

| options       | type     | default | required | description                                             |
| ------------- | -------- | ------- | -------- | ------------------------------------------------------- |
| model         | string   | null    | yes      | Model to perform the action on.                         |
| args          | array    | null    | no       | List of parameters. Example: ["id > 1", "name = Louis"] |
| params.offset | number   | 0       | no       | Result offset.                                          |
| params.limit  | number   | 5       | no       | Maximum number of results.                              |
| params.order  | string   | id      | no       | Name of the fields used to sort the results.            |
| params.select | string[] | []      | no       | Fields that should be selected.                         |

### client.search(model, args)

| options | type   | default | required | description                                             |
| ------- | ------ | ------- | -------- | ------------------------------------------------------- |
| model   | string | null    | yes      | Model to perform the action on.                         |
| args    | array  | null    | no       | List of parameters. Example: ["id > 1", "name = Louis"] |

### client.searchRead(model, args, [params])

| options       | type     | default | required | description                                             |
| ------------- | -------- | ------- | -------- | ------------------------------------------------------- |
| model         | string   | null    | yes      | Model to perform the action on.                         |
| args          | array    | null    | yes      | List of parameters. Example: ["id > 1", "name = Louis"] |
| params.offset | number   | 0       | no       | Result offset.                                          |
| params.limit  | number   | 5       | no       | Maximum number of results.                              |
| params.order  | string   | id      | no       | Name of the fields used to sort the results.            |
| params.select | string[] | []      | no       | Fields that should be selected.                         |

### client.create(model, args)

| options | type   | default | required | description                                             |
| ------- | ------ | ------- | -------- | ------------------------------------------------------- |
| model   | string | null    | yes      | Model to perform the action on.                         |
| args    | array  | null    | no       | List of parameters. Example: ["id > 1", "name = Louis"] |

### client.call(model, method, args, [params])

| options | type   | default | required | description                                             |
| ------- | ------ | ------- | -------- | ------------------------------------------------------- |
| model   | string | null    | yes      | Model to perform the action on.                         |
| method  | string | null    | yes      | Odoo RPC method.                                        |
| args    | array  | null    | yes      | List of parameters. Example: ["id > 1", "name = Louis"] |
| args    | Object | null    | no       | Custom `kwargs` properties.                             |

## License

MIT ©
