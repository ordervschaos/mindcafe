
import React from "react";

import { FiX } from 'react-icons/fi'

export default function CloseButton({ onClick }) {
  return (
    <button
    type="button"
    className=" mr-2 h-5 w-5 float-right  shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-blue-500 focus:ring-offset-2 "
    onClick={onClick}>
      <FiX className="h-5 w-5  text-light-brown" aria-hidden="true" /> 
  </button>
  );
}