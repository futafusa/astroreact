import { useState } from 'react';

export default function DefaultReact() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log('Button clicked, current count:', count);
    setCount(count + 1);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Hello World</h1>
      <button onClick={handleClick}>
        Click me
      </button>
      <p>
        You clicked {count} times
      </p>
    </div>
  );
}
