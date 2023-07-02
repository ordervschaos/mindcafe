
import React from "react";
import {
  PlusIcon,
} from '@heroicons/react/24/outline'

export default function NewNoteButton({ onClick }) {
  return (
    <button
    type="button"
    className=" flex items-center drop-shadow justify-center cursor-pointer w-10 h-10 rounded-full
    bg-white border hover:bg-red-500 text-white"
    onClick={onClick}>
      <PlusIcon className="h-6 w-6  text-gray-400" aria-hidden="true" /> 
    </button>
  );
}