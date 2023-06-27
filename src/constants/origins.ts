export const origins = process.env["NODE_ENV"]
	? []
	: [
			"http://localhost:3000",
			"http://localhost:3001",
			"http://localhost:3002",
			"http://localhost:8000",
			"http://localhost:8001",
	  ];
