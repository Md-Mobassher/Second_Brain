## React Hook Form Basic

```
import { Button } from 'antd';
import {useForm , SubmitHandler } from 'react-hook-form'

interface IFormInput {
  id: string
  password: string
}

const Login = () => {
   const {register, handleSubmit} = useForm()
   const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
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
