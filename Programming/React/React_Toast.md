### Sonner use for toast

- install

```
yarn add sonner
```

- usage
  Render the toaster in the root of your app.

```
import { Toaster, toast } from 'sonner'
// ...

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast('My first toast')}>
        Give me a toast
      </button>
    </div>
  )
}
```

## Types

You can customize the type of toast

```
toast.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
})
```

```
toast.success('Event has been created')
```
