### Create Base Api

1. create `baseApi.ts` file into `src/redux/api/baseApi.ts`

```
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1'
    }),
    endpoints: (builder)=> ({
       login:builder.mutation({
        query: (userInfo)=> ({
            url: '/auth/login',
            method: 'POST',
            body: userInfo,
        })
       })
    })
})
```

2. inject `endpoint` to `baseApi`

```
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=> ({
        login:builder.mutation({
         query: (userInfo)=> ({
             url: '/auth/login',
             method: 'POST',
             body: userInfo,
         })
        })
     })
})

export const {useLoginMutation} = authApi
```

3. then `baseApi` look like this

```
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
  }),

  endpoints: () => ({}),
});
```

4.  connect `baseApi` to `store`

```
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { baseApi } from './api/baseApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth : authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch
```

5. go to backend and modify `cors origin`

```
app.use(cors({ origin: ['http://localhost:5173'] }));
```

- use `*` for allow all domain

6. send data from react hook form

```
import { Button } from 'antd';
import {useForm  } from 'react-hook-form'
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useAppDispatch } from '../../redux/hooks';

const Login = () => {
  const dispatch = useAppDispatch();
   const {register, handleSubmit} = useForm({
    defaultValues: {
      id: 'A-0001',
      password: 'admin123',
    },
   })

   const [login, { data, error}] = useLoginMutation()

   console.log('data=>', data);
   console.log('error=>', error);

   const onSubmit = async (data : FieldValues) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    }
   
    login(userInfo)
   }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">User ID:</label>
        <input type="text" id= "id" {...register('id')} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id='password' {...register("password")} />
      </div>

      <Button htmlType='submit'>Login</Button>
    </form>
  )
}

export default Login
```

### Set cookie in browser

- Go to Frontend `baseApi`. write `credentials: 'include'` under `baseUrl`

```
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1',
        credentials: 'include'
    }),
    endpoints: ()=> ({})
})
```

- go to backend `app.ts` and write `credentials: true` in `cors`

```
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
```

### Verify Token

- install `jwt-decode`

```
yarn add jwt-decode
```

- make a function in utils folder `src/utils/verifyToken.ts`

```
import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};
```

### Dispatch and set user to state

```
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data : FieldValues) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register('userId')} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register('password')} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
```

## Redux Persist add to set token in localStorage

- install redux persist

```
yarn add redux-persist
```

- use it

```
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { baseApi } from './api/baseApi'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'auth',
  storage,
}

const persistAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth : persistAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
```

### Redux Use with Redux-Persist

```
import {  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth : persistAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(baseApi.middleware),
})
```

### Create protected route

```
import { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
```

- use protected route

```
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/layouts/ProtectedRoute";

function App() {
  return (
    <>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </>
  );
}

export default App;
```

###
