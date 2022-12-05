import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "@clerk/nextjs";
import Blocks from 'editorjs-blocks-react-renderer';
import Comments from './Comments'
import AuthorButton from './AuhtorButton'
import {
  PencilSquareIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import BoookmarkButton from './BookmarkButton';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}



export default function RaveView({ post }) {
  const { session } = useSession()

  try {
    JSON.parse(post.review)


  } catch {
    post.review = JSON.stringify({
      version: "2.11.10",
      blocks: [
        {
          type: "paragraph",
          data: {
            text: post.review
          }
        }
      ],
    })
  }
  return (



    <div className='font-serif '>
      <div className="flex w-full items-center space-x-6 pb-3">


        <div className=''>
          <AuthorButton author={post.author} />
   
        </div>
        <div className=''>
          <dt className="sr-only">Published on</dt>

          <dd className="text-base text-xs text-gray-300 font-sans font-light"> <div className='text-gray-300  inline-block'>・</div>{formatDate(post.created_at.split('T')[0])}</dd>
        </div>
      </div>
      {/* action buttons row */}
      <div className='flex items-center space-x-2 mb-3'>


        <div className='flex-grow'></div>
        <div className=''>
          <ShareButton post_id={post.id} />
        </div>
        {session && session.user.id == post.author_id &&

          <div className=''>
            <Link href={"/meal/" + post.id + "/edit"}>
              <a className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Edit</span>
                <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />

              </a>
            </Link>
          </div>
        }
      </div>



      <h1 className='text-4xl mb-12 '>{post.title}</h1>

      {post.link &&
        <div className='mb-6 overflow-hidden'>
          <a href={post.link} target='_blank' rel='noreferrer' className='flex items-center space-x-2'>
            <LinkIcon className='h-5 w-5 text-gray-400' />
            <span className='text-gray-400 font-light'>{post.link}</span>
          </a>
        </div>
      }
      {/* <Card.Eyebrow as="time" dateTime={post.created_at} decorate>
      {formatDate(post.created_at.split('T')[0])}
    </Card.Eyebrow> */}

      <Blocks data={JSON.parse(post.review)} config={{
        embed: {
          className: "max-w-full my-4",
        },
        paragraph: {
          className: "my-4",
        },
      }}/>

      <div className='mt-24 flex items-center space-x-2 mb-3'>

        <div className=''>
          <LikeButton post_id={post.id} />
        </div>
        <div className='flex-grow'></div>
        <div className=''>
          <BoookmarkButton post_id={post.id} />
        </div>

      </div>
      {/* full width divider */}
      <div className='w-full h-0.5 bg-gray-200  mb-12'></div>
      <Comments post_id={post.id} comments_list={post.comments} />
    </div>

  )
}