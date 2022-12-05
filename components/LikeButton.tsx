import { HeartIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import {supabaseClient} from '../utils/supabaseClient'
import { useEffect, useState } from 'react';






import Router from "../node_modules/next/router";

export default function LikeButton({dish_id}) {
  const { session } = useSession();
  
  
  const addLike =  async function(){
    if(!session)
      return Router.push(`/sign-in`)
    setIsLiked(true)
    setLikeCount(likeCount+1)
    const supabase_client= await supabaseClient(session) 

    await supabase_client.from("like").insert([
    { dish_id:dish_id,user_id: session.user.id },
    ]);

  }

  const removeLike =  async function(){
    setIsLiked(false)
    setLikeCount(likeCount-1)
    const supabase_client= await supabaseClient(session)
    await supabase_client.from("like").delete().match({ dish_id:dish_id,user_id: session.user.id });
  }
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    const fetchLike = async () => {
      if(!session)
        return
      const supabase_client=await  supabaseClient(session)
      const { data, error } = await supabase_client
        .from("like")
        .select("*")
        .match({ dish_id:dish_id,user_id: session.user.id });
      console.log('data')
      console.log(data)
      if(data.length>0){
        setIsLiked(true)
      }
    };
    const countLikes = async () => {
      const supabase_client=await  supabaseClient(session)
      const { data, count } = await supabase_client
        .from("like")
        .select("*",{ count: 'estimated' })
        .match({ dish_id:dish_id});
      // console.log('data')
      // console.log(data)
      if(count>0)
        setLikeCount(count)
    };
    countLikes()
    fetchLike();
  }, [dish_id]);

    

  return (

      <button
        type="button"
        className="relative inline-flex items-center rounded  bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
      >
        <HeartIcon onClick={isLiked?removeLike:addLike} className= {`mr-2 h-5 w-5 ${isLiked?"text-pink-400":"text-gray-400"}`} aria-hidden="true" />
      {likeCount?likeCount:''}
      </button>
     

  )
}