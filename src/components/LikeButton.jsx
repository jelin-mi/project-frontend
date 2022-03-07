import { useState } from 'react';

function LikeButton({ children }) {
  const [number, setNumber] = useState(0);

  const increaseNumber = () => {
    setNumber(number + 1);
  };

  /*  const resetNumber = () => {
        setNumber(0);
      } */

  return (
    <button className="btn" onClick={increaseNumber}>
      {number} {children}
    </button>
  );
}

export default LikeButton;