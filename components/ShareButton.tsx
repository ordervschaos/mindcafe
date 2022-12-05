import { ShareIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';


import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

export default function ShareButton({ dish_id }) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  var post_url = window.location.hostname + "/rave/" + dish_id

  var post_body = "Check out this recommendation on Ravve:"
  var post_subject = "Check out this recommendation"
  return (
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button className="rounded-md mr-4 p-2 hover:bg-gray-50 ">

          <ShareIcon onClick={showShareMenu ? () => setShowShareMenu(false) : () => setShowShareMenu(true)} className="h-5 w-5 text-gray-400" aria-hidden="true" />

        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="pt-1">

            <Menu.Item>


              <a
                href="#"
                className='text-gray-700 w-full block px-4 py-2 text-sm'
              >
                <div className='inline-block m-2'>
                  <TwitterShareButton
                    url={post_url}
                    title={post_body}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
                <div className='inline-block m-2'>
                  <FacebookShareButton
                    url={post_url}
                    quote={post_body}
                    hashtag={'#nextshare'}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
                <div className='inline-block m-2'>

                  <RedditShareButton
                    url={post_url}
                    title={post_body}
                  >
                    <RedditIcon size={32} round />
                  </RedditShareButton>

                </div>
                <div className='inline-block m-2'>
                  <WhatsappShareButton
                    url={post_url}
                    title={post_body}
                    separator=":: "
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
                <div className='inline-block m-2'>

                  <LinkedinShareButton url={post_url}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
                <div className='inline-block m-2'>
                  <EmailShareButton
                    url={post_url}
                    subject={post_subject}
                    body={post_body}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>

                </div>


              </a>

            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
