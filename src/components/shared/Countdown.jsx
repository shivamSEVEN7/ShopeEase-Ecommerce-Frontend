import { useEffect, useState } from "react";

const Countdown = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, [timeLeft]);

  return <div>{timeLeft}s</div>;
};

export default Countdown;
