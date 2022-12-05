import { BookmarkIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import {supabaseClient} from '../utils/supabaseClient'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CommentList from './CommentList';







export default function Comments({post_id,comments_list}) {
  const { session } = useSession();
  const [comments,setComments]=useState(comments_list)




  const [comment, setComment] = useState<string>("");

  const onChange = (value) => {
    const commentValue = value;
    setComment(commentValue);
  };
  
  const addComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase_client=await  supabaseClient(session)

    const { data, error } = await supabase_client.from("comments").insert({
      user_id: session.user.id,
      comment_text: comment,
      post_id: post_id,
    });

    if (!error && data) {
        var new_comment=data[0]
        new_comment.author={
          profile_image_url:session.user.profileImageUrl,
          first_name:session.user.firstName,
          last_name:session.user.lastName,
          id:session.user.id
          }
        setComment("")
        setComments([new_comment,...comments])
      
    } else {
        // If failed
      window.alert(error?.message);
    }
  };

    

  return (
      <div>
          <h4 className='text-2xl mx-0 mt-5 font-sans px-0 my-4 font-medium w-full'>Comments</h4>
        <div className="flex mx-auto   mb-4 font-sans ">
          <form className="w-full max-w-4xl bg-white rounded-lg text-xs px-4 pt-2" onSubmit={addComment}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full mb-2 mt-2">
                <textarea onChange={(e)=>onChange(e.target.value)}
                  id="comment"
                  name="comment"
                  className="py-4 text-xs bg-white rounded-lg border border-gray-300 leading-normal resize-none w-full h-24  font-medium placeholder-gray-700 focus:outline-none focus:bg-white" 
                  placeholder="Add a comment"
                  defaultValue={comment}
                  value={comment}
                />
                </div>
                <div  className="w-full md:w-full flex items-start md:w-full ">
                    <div className="">
                      <input disabled={comment?false:true} type='submit' className="disabled:bg-gray-300 h-7 bg-gray-800  text-white font-medium py-1 px-4 border border-gray-400 rounded-2xl tracking-wide mr-1 hover:bg-indigo-800" value='Respond'/>
                    </div>
                </div>
              </div>
          </form>
        </div>
      
        <CommentList comments={comments} setComments={setComments}/>
      
      </div>
     

  )
}