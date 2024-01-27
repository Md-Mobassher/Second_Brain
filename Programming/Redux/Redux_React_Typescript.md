1. create a vite project

```
yarn create vite
```

2. give a project name like - `redux_project`
3. Select a framework - `React`
4. Select a variant - `TypeScript`
5. Now run:

```
 cd redux_project
 yarn
 yarn dev
```

### Redux installation

```
yarn add @reduxjs/toolkit react-redux
```

### Tailwind css installation

```
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

- edit `tailwind.config.ts`

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Add this to `index.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Folder structure

- src
  - assets
  - components
    - layouts (header, footer)
    - ui (button)
  - contexts
  - hooks
  - pages
  - redux
    - store.ts
  - routes
  - utils

### 1. Create store

Add a new file named `src/redux/store.ts`

```
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

### 2. Provide the redux store to react

```
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### Define Typed Hooks

Add a new file named `src/redux/hooks.ts`

```
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### 3. Create a Redux State Slice

Add a new file named `src/redux/features/counter/counterSlice.js`

```
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
count: number
}

// Define the initial state using that type
const initialState: CounterState = {
count: 0,
}

const initialState = { count: 0}

const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment: (state)=>{
            state.count = state.count +1
        },
        incrementBy5: (state, action : PayloadAction<number>)=>{
            state.count = state.count + action.payload
        },
        decrement: (state)=>{
           state.count = state.count -1
        }
    }
})

export const {increment, decrement} = counterSlice.actions

export default counterSlice.reducer
```

### 4. Add Slice Reducers to the Store

```
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

### 5. Use Redux State and Actions in React Components

```
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "./redux/features/counterSlice"

function App() {
  const {count } = useSelector((state)=> state.counter)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button 
	        onClick={()=> dispatch(increment())}>Increament
        </button>
        <h1 className="px-5 mt-2 ">{count}</h1>

        <button
	         onClick={()=> dispatch(decrement())}
         >Decreament</button>
      </div>
    </div>
  )
}

export default App
```

## Custom middleware in redux

Add a new file named `src/redux/middleware/logger.ts`

```
const logger = (state) => (next) => (action) => {
    console.log("Current State =>", state.getState());
    console.log("Action =>", action);
    console.log("Next State =>", state.getState());
}

export default logger;
```

use the middleware to `store.ts`

```
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import logger from './middleware/logger'

export const store = configureStore({
    reducer: {
      counter: counterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```
