import React,{ Component, KeyboardEventHandler,Fragment, useRef, useState } from 'react'


import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { supabaseClient } from '../utils/supabaseClient'
import { useSession } from "@clerk/nextjs";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { Chip,TextField, InputAdornment, Icon, IconButton } from '@mui/material';
import CreatableSelect from 'react-select/creatable';

import { ActionMeta, OnChangeValue } from 'react-select';

import Router from "../node_modules/next/router";



const components = {
  DropdownIndicator: null,
};


import types from "../config/type_options"
var typeOptions=types.map((type)=>{
  return {
    value:type.value,
    label:type.label.replace(/s$/g,"")}
})


const tagOptions=[
  { value: 'Technology', label: 'Technology' },
  { value: 'Productivity', label: 'Productivity' },
  { value: 'Literature', label: 'Literature' },
  { value: 'Music', label: 'Music' },
  { value: 'Art', label: 'Art' },
  { value: 'Health', label: 'Health' },
  { value: 'scientific_methods', label: 'Scientific Methods' },
  { value: 'Relationships', label: 'Relationships' },
  { value: 'Education', label: 'Education' },
  { value: 'Science', label: 'Science' },
]





export default function Example({ open, setOpen, post }) {

  const [tagField, setTagField] = useState('')

  
  const { session } = useSession()

  const [link, setLink] = useState(post.link||"")
  const [raveType, setRaveType] = useState(post.type?post.type:{
    value: '',
    label: '',
  })
  const [tags, setTags] = useState(post.tags||[])


  
  

  const createOption = (label: string) => ({
    label,
    value: label,
  });
  const handleTagInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setTagField(inputValue)

  };

  const handleTagChange = (value: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setTags(value)
  };

  var handleTypeChange = (
    newValue,
    actionMeta
  ) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setRaveType(newValue)
    console.log("raveType=",raveType)
  



  };
  var handleTypeInputChange = (inputValue: any, actionMeta: any) => {
    if(!inputValue)
      return
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setRaveType(createOption(inputValue))
    console.log("raveType=",raveType)
    
  };
  
  const handleTagInputKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {

    if (!tagField) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(tagField);
        console.groupEnd();
        
        setTags([...tags, createOption(tagField)])
        setTagField('')
        console.log("tags",tags)
        event.preventDefault();
    }
  };



  const saveMetaData = async (post) => {
    console.log("saivng post")
    console.log("raveType", raveType)
    console.log("tags", tags)
    console.log("link", link)

    const supabase = await supabaseClient(session);
    raveType.value=raveType.value.toLowerCase().replace(" ","_")
    await supabase
      .from("rave")
      .update({ link: link, tags: tags, type: raveType, status:'published' }).match({ id: post.id, author_id: session.user.id });

    
      Router.push(`/rave/${post.id}`)

  }


  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex w-full min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full z-12 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* experiment */}
                <form className="space-y-6" action="#" method="POST">
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Help others find your rave</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Add some metadata to your rave so others can find it.
                        </p>
                      </div>
                      <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-4 sm:col-span-4">
                          <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                              Type <sup className='text-red-700'>*</sup>
                            </label>


                              <div className="relative mt-1">
                              <CreatableSelect
                              
                                value={raveType}
                                isMulti={false}
                                onChange={(e)=>handleTypeChange(e,'change')}
                                onInputChange={handleTypeInputChange}
                                options={typeOptions}
                                
                              />
                              </div>
                          </div>
                          <div className="col-span-6 sm:col-span-6">
                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                              Link (optional)
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              
                              <input
                               type="text"
                               key="raveTitle1"
                               name="raveTitle1"
                               
                               placeholder="https://www.youtube.com/watch?v=..."
                               onChange={(event) => setLink(event.target.value)}
                               value={link}
                                
                                id="company-website"
                                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-6 pb-12  sm:col-span-4 z-2000">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Add some tags
                          </label>
                          <CreatableSelect
                            components={components}
                            inputValue={tagField}
                            isClearable = {true}
                            isMulti
                            maxMenuHeight={120}
                            hideSelectedOptions={true}
                            // menuIsOpen={true}
                            menuPlacement="auto"
                            onChange={handleTagChange}
                            onInputChange={handleTagInputChange}
                            onKeyDown={handleTagInputKeyDown}
                            // placeholder="Type something and press enter..."
                            value={tags}
                            options={tagOptions}
                          />
                  
                        </div>



                        {/* 
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>




                
                </form>







                {/* original */}
                
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {/* <input
                    type="text"
                    key="raveTitle1"
                    name="raveTitle1"
                    className="block w-full flex-1"
                    placeholder="Book/Article/Video"
                    onChange={(event) => setRaveType(event.target.value)}
                    value={raveType}
                  /> */}
                 
                
                  <button 
                    type="button" disabled={raveType.value?false:true}
                    className={
                      "disabled:bg-gray-400 inline-flex w-full justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-grya-900 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    }

                    onClick={() => {
                      saveMetaData(post)
                      setOpen(false)
                    }}
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}