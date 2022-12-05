import { BookmarkIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import {supabaseClient} from '../utils/supabaseClient'
import { useEffect, useState } from 'react';





import Router from "../node_modules/next/router";


export default function BoookmarkButton({dish_id}) {
  const { session } = useSession();
  
  
  const addBookmark =  async function(){
    if(!session)
      return Router.push(`/sign-in`)



    setIsBookmarked(true)
    const supabase_client= await supabaseClient(session) 

    await supabase_client.from("bookmark").insert([
    { post_id:post_id,user_id: session.user.id },
    ]);

  }

  const removeBookmark =  async function(){
    setIsBookmarked(false)
    const supabase_client= await supabaseClient(session)
    await supabase_client.from("bookmark").delete().match({ post_id:post_id,user_id: session.user.id });
  }
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const fetchBookmark = async () => {
      if(!session)
        return false
      const supabase_client=await  supabaseClient(session)
      const { data, error } = await supabase_client
        .from("bookmark")
        .select("*")
        .match({ post_id:post_id,user_id: session.user.id });
      console.log('data')
      console.log(data)
      if(data.length>0){
        setIsBookmarked(true)
      }
    };
    fetchBookmark();
  }, [post_id,session]);

    

  return (

      <button
        type="button"
        className="relative inline-flex items-center rounded  bg-white py-2 mr-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10  focus:ring-gray-500"
      >
        <BookmarkIcon onClick={isBookmarked?removeBookmark:addBookmark} className= {`h-5 w-5 ${isBookmarked?"text-green-400":"text-gray-400"}`} aria-hidden="true" />
      </button>
     

  )
}