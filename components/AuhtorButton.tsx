
import Image from 'next/image'
import Link from 'next/link'
export default function Home({ author }) {
  return (
    <Link href={"/cafe/u/" + author.id} >
      <div className="cursor-pointer  text-base font-medium">
        <div className="inline-block h-5 w-5 rounded-full" >
          <Image src={author.profile_image_url} alt="profile_pic" width={18} height={18} className="rounded-full" />
        </div>
        <div className="text-gray-800 align-middle pb-1 inline-block  font-light font-sans text-xs ml-2">
          {author.first_name && author.last_name &&
            author.first_name + ' ' + author.last_name
          }
          {(!author.first_name || !author.last_name) &&
            author.username
          }
        </div>
      </div>
    </Link>
  )
}