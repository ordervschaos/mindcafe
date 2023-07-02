
import React from "react";
import {
  PlusIcon,
} from '@heroicons/react/24/outline'

export default function NewNoteButton({ onClick }) {
  return (
    <button
    type="button"
    className=" flex items-center drop-shadow-sm justify-center cursor-pointer w-8 h-8 rounded-full
    bg-white border hover:bg-red-500 text-white"
    onClick={onClick}>
      <PlusIcon className="h-6 w-6  text-gray-400" aria-hidden="true" /> 
    </button>
  );
}