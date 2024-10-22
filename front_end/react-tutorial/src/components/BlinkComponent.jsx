import { useEffect, useState } from 'react';

export default function BlinkCompnent({ text }) {
  const [showText, setShowText] = useState(true);
  useEffect(() => {
    const timeoutId = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => {
      clearInterval(timeoutId);
    };
  }, []);
  return <div>{showText ? text : null}</div>;
}
