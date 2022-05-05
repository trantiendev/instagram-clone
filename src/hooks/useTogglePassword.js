import React, { useEffect, useState } from 'react';
import useToggle from './useToggle';

export default function useTogglePassword(password) {
  const [isOn, handleShowPass] = useToggle();
  const [btnDisplay, setBtnDisplay] = useState(false);

  useEffect(() => (password ? setBtnDisplay(true) : setBtnDisplay(false)), [password]);

  const Btn = () => (
    <button
      className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-base 
                ${btnDisplay ? 'block' : 'hidden'}`}
      type="button"
      onClick={() => handleShowPass()}
    >
      {isOn || !password ? 'Hide' : 'Show'}
    </button>
  );

  return [isOn, Btn];
}
