# Types of Error

### Operational Error (Express app)

Error that we can predict will happens in future

    - invalid user type
    - failed to run server
    - failed to connect database
    - invalid auth token

### Programmatical Error (Express app)

Error that developer produce when developing

    - using undefined variables
    - using properties that do not exist
    - passing number instead of string or vice versa
    - using req.params instead of req.query

### Unhandle Rejection Error (Asynchronous code)

Error that happen when we do not resolved a promise ( need to handle inside / outside of express application )

```
	server.close(() => {
		process.exit(1)
	})
```

### UnCaught Exception Error (Synchronous code)

( need to handle inside / outside of express application )

```
	process.exit(1)
```

### Structure we may follow

    - success
    - message
    - errorSources [{ path: " ",  message: " "}]
    - stack  ( we do not send "stack" when `NODE_ENV= Production` )

### #globallErrorHandler.ts

```
	import { ErrorRequestHandler } from 'express';

	const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	  const statusCode = err.statusCode || 500;
	  const message = err.message || 'Something went wrong!';

	  return res.status(statusCode).json({
	    success: false,
	    message,
	    error: err,
	  });
	};

	export default globalErrorHandler;
```

### create `errors.ts` file into global #interface folder #error_interface

```
	export type TErrorSources = {
	  path: string | number;
	  message: string;
	}[];

	export type TGenericErrorResponse = {
	  statusCode: number;
	  message: string;
	  errorSources: TErrorSources;
	};
```

### create #AppError.ts file into error folder under app

```
	class AppError extends Error {
	  public statusCode: number;

	  constructor(statusCode: number, message: string, stack = '') {
	    super(message);
	    this.statusCode = statusCode;

	    if (stack) {
	      this.stack = stack;
	    } else {
	      Error.captureStackTrace(this, this.constructor);
	    }
	  }
	}

	export default AppError;
```

### create #handleZodError.ts file into error folder

```
	import { ZodError, ZodIssue } from 'zod';
	import { TErrorSources, TGenericErrorResponse } from '../interface/error';

	const handleZodError = (err: ZodError): TGenericErrorResponse => {
	  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
	    return {
	      path: issue?.path[issue.path.length - 1],
	      message: issue.message,
	    };
	  });

	  const statusCode = 400;

	  return {
	    statusCode,
	    message: 'Validation Error',
	    errorSources,
	  };
	};

	export default handleZodError;
```

### create #handleValidationError.ts file into error folder

```
	import mongoose from 'mongoose';
	import { TErrorSources, TGenericErrorResponse } from '../interface/error';

	const handleValidationError = (
	  err: mongoose.Error.ValidationError,
	): TGenericErrorResponse => {
	  const errorSources: TErrorSources = Object.values(err.errors).map(
	    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
	      return {
	        path: val?.path,
	        message: val?.message,
	      };
	    },
	  );

	  const statusCode = 400;

	  return {
	    statusCode,
	    message: 'Validation Error',
	    errorSources,
	  };
	};

	export default handleValidationError;
```

### create #handleDuplicateError.ts file into error folder

```
	import { TErrorSources, TGenericErrorResponse } from '../interface/error';

	const handleDuplicateError = (err: any): TGenericErrorResponse => {
	  // Extract value within double quotes using regex
	  const match = err.message.match(/"([^"]*)"/);

	  // The extracted value will be in the first capturing group
	  const extractedMessage = match && match[1];

	  const errorSources: TErrorSources = [
	    {
	      path: '',
	      message: `${extractedMessage} is already exists`,
	    },
	  ];

	  const statusCode = 400;

	  return {
	    statusCode,
	    message: 'Invalid ID',
	    errorSources,
	  };
	};

		export default handleDuplicateError;
```

### create #handleCastError.ts file into error folder

```
	import mongoose from 'mongoose';
	import { TErrorSources, TGenericErrorResponse } from '../interface/error';

	const handleCastError = (
	  err: mongoose.Error.CastError,
	): TGenericErrorResponse => {
	  const errorSources: TErrorSources = [
	    {
	      path: err.path,
	      message: err.message,
	    },
	  ];

	  const statusCode = 400;

	  return {
	    statusCode,
	    message: 'Invalid ID',
	    errorSources,
	  };
	};

	export default handleCastError;
```

### now #globallErrorHandler is become

```
	/* eslint-disable @typescript-eslint/no-unused-vars */
	/* eslint-disable no-unused-vars */
	import { ErrorRequestHandler } from 'express';
	import { ZodError } from 'zod';
	import config from '../config';
	import AppError from '../errors/AppError';
	import handleCastError from '../errors/handleCastError';
	import handleDuplicateError from '../errors/handleDuplicateError';
	import handleValidationError from '../errors/handleValidationError';
	import handleZodError from '../errors/handleZodError';
	import { TErrorSources } from '../interface/error';

	const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	  //setting default values
	  let statusCode = 500;
	  let message = 'Something went wrong!';
	  let errorSources: TErrorSources = [
	    {
	      path: '',
	      message: 'Something went wrong',
	    },
	  ];

	  if (err instanceof ZodError) {
	    const simplifiedError = handleZodError(err);
	    statusCode = simplifiedError?.statusCode;
	    message = simplifiedError?.message;
	    errorSources = simplifiedError?.errorSources;
	  } else if (err?.name === 'ValidationError') {
	    const simplifiedError = handleValidationError(err);
	    statusCode = simplifiedError?.statusCode;
	    message = simplifiedError?.message;
	    errorSources = simplifiedError?.errorSources;
	  } else if (err?.name === 'CastError') {
	    const simplifiedError = handleCastError(err);
	    statusCode = simplifiedError?.statusCode;
	    message = simplifiedError?.message;
	    errorSources = simplifiedError?.errorSources;
	  } else if (err?.code === 11000) {
	    const simplifiedError = handleDuplicateError(err);
	    statusCode = simplifiedError?.statusCode;
	    message = simplifiedError?.message;
	    errorSources = simplifiedError?.errorSources;
	  } else if (err instanceof AppError) {
	    statusCode = err?.statusCode;
	    message = err.message;
	    errorSources = [
	      {
	        path: '',
	        message: err?.message,
	      },
	    ];
	  } else if (err instanceof Error) {
	    message = err.message;
	    errorSources = [
	      {
	        path: '',
	        message: err?.message,
	      },
	    ];
	  }

	  //ultimate return
	  return res.status(statusCode).json({
	    success: false,
	    message,
	    errorSources,
	    err,
	    stack: config.NODE_ENV === 'development' ? err?.stack : null,
	  });
	};

	export default globalErrorHandler;
```
