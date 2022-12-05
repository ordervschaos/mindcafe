import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";





import dynamic from "next/dynamic";
const Editor = dynamic(() => import("./DishEditor"), { ssr: false });
import {supabaseClient} from '../utils/supabaseClient'
// import EditorJS from '@editorjs/editorjs';


export default function AddRaveForm() {
  const { session } = useSession();

  const [newRaveItem, setNewRaveItem] = useState("");


  var review_data= {
    time: 1552744582955,
    blocks: [
      {
        type: "image",
        data: {
          url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
        }
      }
    ],
    version: "2.11.10"
  }
  console.log("review_data")
  console.log()

  const [newRaveReview, setNewRaveReview] = useState(JSON.stringify(review_data));
  const [newRaveLink, setNewRaveLink] = useState();
  const [selectedType, setSelectedType] = useState()

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const supabase = await supabaseClient(session);
    const response = await supabase
      .from("rave")
      .insert({ title: newRaveItem, review: newRaveReview, type: selectedType, link: newRaveLink, author_id: session.user.id });

    // setRaves([...raves, data[0]]);
    setNewRaveItem("test");
    
    setNewRaveReview(JSON.stringify(review_data))
  };

  return (
    <div className="content-center	">

      <div className="md:grid md:grid-cols-1 md:gap-6 mx-auto	lg:w-[52rem]">
        <form onSubmit={handleSubmit} className="pl-2">

          <div className="sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    I found something to rave about
                  </label>

                </div>
              </div>
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

              </div> */}

              <div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">

                    <div className="mt-3">
                      <input 
                        type="text"
                        key="newRaveItem1" 
                        name="newRaveItem1"
                        className="block w-full flex-1 border-none focus:border-transparent focus:ring-0 font-serif	text-5xl placeholder-gray-300 ml-[0.5em] lg:ml-20 lg:placeholder:ml-20"
                        placeholder="The awesome thing"
                        autoFocus
                        onChange={(e) => setNewRaveItem(e.target.value)}
                         value={newRaveItem}
                      />
                    </div>
                  </div>
                </div>

                  


                {/* <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    onChange={(e) => setNewRaveReview(e.target.value)} value={newRaveReview}
                  />
                </div> */}


              </div>
              {/* <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                    https://
                  </span>
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="www.example.com"
                    onChange={(e) => setNewRaveLink(e.target.value)} value={newRaveLink}
                  />
                </div>
              </div> */}
              {/* <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add
              </button> */}
              
            </div>
            
            <Editor setData={setNewRaveReview} data={newRaveReview}/>
            
          </div>
        </form>
      </div>
    </div>
  );
}