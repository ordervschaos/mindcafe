import {useEffect, useState} from 'react';



export default function FilterMenu({tags,selectedTags,setSelectedTags}) {



  
  var addTagToSelection = (e,tag) => {
    if(selectedTags.includes(tag)){

      setSelectedTags(selectedTags.filter((t)=>t!=tag))
    }else{
      setSelectedTags([...selectedTags,tag])

    }
  }


  
  return (
    // filter tag chips
    <div>
    {tags && tags.length>2 &&
    <div className="flex flex-wrap items-center justify-center w-full px-4 py-2 mx-auto my-2 bg-white rounded-lg  dark:bg-gray-800">
      {tags.map((tag) => (
        <button
          key={tag} 
          onClick={(e)=>addTagToSelection(e,tag)}
          className={`px-3 py-1 mx-1 my-1 text-sm font-medium leading-5 bg-gray-100 text-gray-900 border  transition-colors duration-150  rounded-full dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray ${
            selectedTags.includes(tag) ? "bg-blue-100 text-gray-900 border border-gray-900 dark:bg-gray-600" : "border-gray-600"
          }`}
        >

          {tag}
        </button>
      ))}
    </div>
    }
    </div>

  )
}