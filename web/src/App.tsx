import { useState } from 'react'
import { Button } from '@/components/ui/button'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  )
}

export default App