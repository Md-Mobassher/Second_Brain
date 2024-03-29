## #Modular Pattern

- #src
  - #app
    - #config
      - #config_index_ts
    - #errors
      - #AppError
      - #handleZodError
      - #handleCastError
      - #handleDuplicateError
      - #handleValidationError
    - #interface
      - #error_interface
    - #middlewares
      - #globallErrorHandler
      - #notFound
      - #validateRequest
    - #modules
      - #users
        - #user_interface_ts
        - #user_model_ts
        - #user_validation_ts
        - #user_service_ts
        - #user_controller_ts
        - #user_route_ts
        - #user_utils_ts
      - #students
        - #student_interface_ts
        - #student_model_ts
        - #student_validation_ts
        - #student_service_ts
        - #student_controller_ts
        - #student_route_ts
    - #routes
      - #routes_index_ts
    - #utils
      - #catchAsync_ts
      - #sendResponse_ts
  - #app_ts
  - #server_ts
- #\_env
- #\_gitignore

### Create #middlewares folder

1. #globallErrorHandler see in `Error_Handle.md`

2. #notFound

```
	/* eslint-disable no-unused-vars */
	/* eslint-disable @typescript-eslint/no-unused-vars */

	import { NextFunction, Request, Response } from 'express';
	import httpStatus from 'http-status';

	const notFound = (req: Request, res: Response, next: NextFunction) => {
	  return res.status(httpStatus.NOT_FOUND).json({
	    success: false,
	    message: 'API Not Found !!',
	    error: '',
	  });
	};

	export default notFound;
```

3. #validateRequest

```
	import { NextFunction, Request, Response } from 'express';
	import { AnyZodObject } from 'zod';

	const validateRequest = (schema: AnyZodObject) => {
	  return async (req: Request, res: Response, next: NextFunction) => {
	    try {
	      // validation check
	      //if everything allright next() ->
	      await schema.parseAsync({
	        body: req.body,
	      });

	      next();
	    } catch (err) {
	      next(err);
	    }
	  };
	};

	export default validateRequest;
```

### Create #users folder into #modules. use dot ( `.`) instead of (`__`)

then create this file into users folder.

1. #user_interface_ts

```
	export type TUser = {
	  id: string;
	  password: string;
	  needsPasswordChange: boolean;
	  role: 'admin' | 'student' | 'faculty';
	  status: 'in-progress' | 'blocked';
	  isDeleted: boolean;
	};
```

2. #user_model_ts

```
	import bcrypt from 'bcrypt';
	import { Schema, model } from 'mongoose';
	import config from '../../config';
	import { TUser } from './user.interface';
	const userSchema = new Schema<TUser>(
	  {
	    id: {
	      type: String,
	      required: true,
	      unique: true,
	    },
	    password: {
	      type: String,
	      required: true,
	    },
	    needsPasswordChange: {
	      type: Boolean,
	      default: true,
	    },
	    role: {
	      type: String,
	      enum: ['student', 'faculty', 'admin'],
	    },
	    status: {
	      type: String,
	      enum: ['in-progress', 'blocked'],
	      default: 'in-progress',
	    },
	    isDeleted: {
	      type: Boolean,
	      default: false,
	    },
	  },
	  {
	    timestamps: true,
	  },
	);

	userSchema.pre('save', async function (next) {
	  // eslint-disable-next-line @typescript-eslint/no-this-alias
	  const user = this; // doc
	  // hashing password and save into DB
	  user.password = await bcrypt.hash(
	    user.password,
	    Number(config.bcrypt_salt_rounds),
	  );
	  next();
	});

	// set '' after saving password
	userSchema.post('save', function (doc, next) {
	  doc.password = '';
	  next();
	});

	export const User = model<TUser>('User', userSchema);
```

3. #user_validation_ts

```
	import { z } from 'zod';

	const userValidationSchema = z.object({
	  pasword: z
	    .string({
	      invalid_type_error: 'Password must be string',
	    })
	    .max(20, { message: 'Password can not be more than 20 characters' })
	    .optional(),
	});

	export const UserValidation = {
	  userValidationSchema,
	};
```

4. #user_service_ts

```
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import httpStatus from 'http-status';
	import mongoose from 'mongoose';
	import config from '../../config';
	import AppError from '../../errors/AppError';
	import { TStudent } from '../student/student.interface';
	import { Student } from '../student/student.model';
	import { AcademicSemester } from './../academicSemester/academicSemester.model';
	import { TUser } from './user.interface';
	import { User } from './user.model';
	import { generateStudentId } from './user.utils';

	const createStudentIntoDB = async (password: string, payload: TStudent) => {
	  // create a user object
	  const userData: Partial<TUser> = {};

	  //if password is not given , use deafult password
	  userData.password = password || (config.default_password as string);

	  //set student role
	  userData.role = 'student';

	  // find academic semester info
	  const admissionSemester = await AcademicSemester.findById(
	    payload.admissionSemester,
	  );

	  const session = await mongoose.startSession();

	  try {
	    session.startTransaction();
	    //set  generated id
	    userData.id = await generateStudentId(admissionSemester);

	    // create a user (transaction-1)
	    const newUser = await User.create([userData], { session }); // array

	    //create a student
	    if (!newUser.length) {
	      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
	    }
	    // set id , _id as user
	    payload.id = newUser[0].id;
	    payload.user = newUser[0]._id; //reference _id

	    // create a student (transaction-2)

	    const newStudent = await Student.create([payload], { session });

	    if (!newStudent.length) {
	      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
	    }

	    await session.commitTransaction();
	    await session.endSession();

	    return newStudent;
	  } catch (err: any) {
	    await session.abortTransaction();
	    await session.endSession();
	    throw new Error(err);
	  }
	};

	export const UserServices = {
	  createStudentIntoDB,
	};
```

5. #user_controller_ts

```
	import httpStatus from 'http-status';
	import catchAsync from '../../utils/catchAsync';
	import sendResponse from '../../utils/sendResponse';
	import { UserServices } from './user.service';

	const createStudent = catchAsync(async (req, res) => {
	  const { password, student: studentData } = req.body;


	  const result = await UserServices.createStudentIntoDB(password, studentData);

	  sendResponse(res, {
	    statusCode: httpStatus.OK,
	    success: true,
	    message: 'Student is created succesfully',
	    data: result,
	  });
	});

	export const UserControllers = {
	  createStudent,
	};
```

6. #user_route_ts

```
	import express from 'express';
	import validateRequest from '../../middlewares/validateRequest';
	import { createStudentValidationSchema } from './../student/student.validation';
	import { UserControllers } from './user.controller';

	const router = express.Router();

	router.post(
	  '/create-student',
	  validateRequest(createStudentValidationSchema),
	  UserControllers.createStudent,
	);

	export const UserRoutes = router;
```

7. #user_utils_ts

```
	// year semesterCode 4digit number
	import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
	import { User } from './user.model';

	const findLastStudentId = async () => {
	  const lastStudent = await User.findOne(
	    {
	      role: 'student',
	    },
	    {
	      id: 1,
	      _id: 0,
	    },
	  )
	    .sort({
	      createdAt: -1,
	    })
	    .lean();

	  //2030 01 0001
	  return lastStudent?.id ? lastStudent.id : undefined;
	};

	export const generateStudentId = async (payload: TAcademicSemester) => {
	  // first time 0000
	  //0001  => 1
	  let currentId = (0).toString(); // 0000 by deafult

	  const lastStudentId = await findLastStudentId();
	  // 2030 01 0001
	  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
	  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
	  const currentSemesterCode = payload.code;
	  const currentYear = payload.year;

	  if (
	    lastStudentId &&
	    lastStudentSemesterCode === currentSemesterCode &&
	    lastStudentYear === currentYear
	  ) {
	    currentId = lastStudentId.substring(6); // 00001
	  }

	  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

	  incrementId = `${payload.year}${payload.code}${incrementId}`;

	  return incrementId;
	};
```

### Create #students folder into #modules. use dot ( `.`) instead of (`__`)

1. Create students interface in this #student_interface_ts file

```
	import { Model, Types } from 'mongoose';

	export type TUserName = {
	  firstName: string;
	  middleName: string;
	  lastName: string;
	};

	export type TGuardian = {
	  fatherName: string;
	  fatherOccupation: string;
	  fatherContactNo: string;
	  motherName: string;
	  motherOccupation: string;
	  motherContactNo: string;
	};

	export type TLocalGuardian = {
	  name: string;
	  occupation: string;
	  contactNo: string;
	  address: string;
	};

	export type TStudent = {
	  id: string;
	  user: Types.ObjectId;
	  password: string;
	  name: TUserName;
	  gender: 'male' | 'female' | 'other';
	  dateOfBirth?: Date;
	  email: string;
	  contactNo: string;
	  emergencyContactNo: string;
	  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
	  presentAddress: string;
	  permanentAddress: string;
	  guardian: TGuardian;
	  localGuardian: TLocalGuardian;
	  profileImg?: string;
	  admissionSemester: Types.ObjectId;
	  isDeleted: boolean;
	  academicDepartment: Types.ObjectId;
	};

	//for creating static

	export interface StudentModel extends Model<TStudent> {
	  isUserExists(id: string): Promise<TStudent | null>;
	}

	// for creating instance

	// export interface StudentMethods {
	//   isUserExists(id: string): Promise<TStudent | null>;
	// }

	// export type StudentModel = Model<
	//   TStudent,
	//   Record<string, never>,
	//   StudentMethods
	// >;
```

2.  Create student Model into this #student_model_ts file

```
import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloogGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
```

3.  Create student validation into this #student_validation_ts file

```
import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
```

4. Create student service into #student_service_ts file

```
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  /*
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object

  let searchTerm = '';   // SET DEFAULT VALUE

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }


 // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  { email: { $regex : query.searchTerm , $options: i}}
  { presentAddress: { $regex : query.searchTerm , $options: i}}
  { 'name.firstName': { $regex : query.searchTerm , $options: i}}


  // WE ARE DYNAMICALLY DOING IT USING LOOP
   const searchQuery = Student.find({
     $or: studentSearchableFields.map((field) => ({
       [field]: { $regex: searchTerm, $options: 'i' },
    })),
   });


   // FILTERING fUNCTIONALITY:

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
   excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });


  // SORTING FUNCTIONALITY:

  let sort = '-createdAt'; // SET DEFAULT VALUE

 // IF sort  IS GIVEN SET IT

   if (query.sort) {
    sort = query.sort as string;
  }

   const sortQuery = filterQuery.sort(sort);


   // PAGINATION FUNCTIONALITY:

   let page = 1; // SET DEFAULT VALUE FOR PAGE
   let limit = 1; // SET DEFAULT VALUE FOR LIMIT
   let skip = 0; // SET DEFAULT VALUE FOR SKIP


  // IF limit IS GIVEN SET IT

  if (query.limit) {
    limit = Number(query.limit);
  }

  // IF page IS GIVEN SET IT

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);



  // FIELDS LIMITING FUNCTIONALITY:

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH

  fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
  fields: 'name email'; // HOW IT SHOULD BE

  let fields = '-__v'; // SET DEFAULT VALUE

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');

  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;

  */

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
```

5. Create student controller into #student_controller_ts file

```
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
```

6. Create student route #student_route_ts file

```
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
```
