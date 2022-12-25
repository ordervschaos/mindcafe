import {
  TrashIcon,
} from '@heroicons/react/24/outline'

import _ from 'lodash';
import { BookmarkIcon } from '@heroicons/react/20/solid'
// Get icon nams from: https://unpkg.com/browse/@heroicons/react@2.0.11/24/outline/
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import Image from  'next/image'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);





export default function Comments({comments,setComments}) {
  const {session} = useSession()

 
  
    

  return (
      <div>
           <div className="flex flex-col gap-4 pt-12 font-sans ">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-md p-4">
             <div className="text-base font-medium">
                <div className="inline-block h-5 w-5 rounded-full">
                  <Image alt="comment" src={comment.author.profile_image_url}  width={40} height={40} className="rounded-full" />
                </div>

                <span className="text-gray-800 font-light text-xs ml-2">{comment.author.first_name} {comment.author.last_name}</span>
              </div>
            <p className="font-light text-xs mt-2 whitespace-pre	">{comment.comment_text}</p>
            {session && session.user && comment.author.id==session.user.id && 
        <div className='float-right'>
          
            <TrashIcon onClick={async () => {
              const { data, error } = await supabase
                .from('comments')
                .delete()
                .match({ id: comment.id })
              if (error) {
                console.log('error', error)
              } else {
                setComments(comments.filter((c) => c.id !== comment.id))
                
                console.log('data', data)
              }
            }} className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />

              
        </div>
        }
          </div>
        ))}
      </div>
      
      </div>
     

  )
}