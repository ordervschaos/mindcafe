import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

var statistics = [
  {
    icon: "/icons/like.svg",
    number: "129,864,880",
    description: "Books"
  },
  {
    icon: "/icons/like.svg",
    number: "2,62,80,00,000",
    description: "Hours of Videos in Youtube"
  },
  {
    icon: "/icons/like.svg",
    number: "600,000,000",
    description: "Blogs"
  },
  {
    icon: "/icons/like.svg",
    number: "80,000,000",
    description: "Songs in Spotify alone"
  },

]

export default function Main() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth',
    block: 'start'});

  };

  return (
    <section className="text-dark-brown body-font">
      <section className=" flex max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row ">
        <div className="  pt-48 lg:py-24  md:py-20  flex    md:flex-row  items-justify">
          <div  className="mx-5 sm:mx-12 md:mx-12 text-center sm:w-full  lg:flex-grow md:w-full  pt-6 flex flex-col  mb-40 ">
            <h1  className="mb-5 text-start sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-dark-brown">
              A place for sharing and discovering <b>greatness</b>
            </h1>
            {/* <p className="mb-4 xl:w-3/4 text-dark-brown text-lg">
              We are here to help you find the gems in it.
            </p> */}
            <div className="flex">
              <button 
                className="cursor-pointer bg-gray-800  inline-flex  px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform border rounded-lg"
                onClick={handleClick}
              >
                <div  className="">Find out more</div>
              </button>
              <Link href="/cafe">

                <div
                  className="inline-flex cursor-pointer items-center px-5 py-3 mt-2 font-medium text-gray-00 transition duration-500 ease-in-out transform bg-transparent border border-gray-700 border-2 ml-3 rounded-lg bg-white-400"
                >
                  <div  className="justify-center">Get started</div>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex w-1/2 flex-row-reverse mt-10 mr-0 w-full hidden lg:inline-block  sm:mr-0  mb-0 lg:mb-0 ">
            
            <div>
            <Image
            className="w-full"
              alt="iPhone-12"
              src="/hero_bg.png"
              width={400}
              height={400}
            />
            <div className="flex-grow"/>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto scroll-my-36	" ref={ref}   >
        <div className="container px-5 mx-auto  lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-6xl Avenir font-semibold text-dark-brown">
              Internet is a sea of mediocrity.
            </h1>
            <h1 className="mb-8 text-6xl Avenir font-semibold text-light-brown">
            More is not more anymore. Look at the sheer amount of stuff we have:
          </h1>
            
          </div>
          <div className=" py-24 ">
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-12 mr-2 mb-16  lg:grid-cols-4 ">
              {statistics.map((statistic) => (
                <div key={statistic.description} className="col-span-1  pr-2">
                  <div className="block font-bold text-2xl">
                    {statistic.number}+
                  </div>
                  <div className="block text-dark-brown text-lg font-medium">
                    {statistic.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h1 className="mb-8 mt-12 text-2xl Avenir font-semibold text-dark-brown text-center">
             Bottom line: We have more content than what we can consume in <span className="text-red-900">20000</span> life-times.
          </h1>
        </div>
        <div className="container px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 mt-48 text-6xl Avenir font-semibold text-dark-brown">
              But, every now and then, we come across <b>gold</b>
            </h1>
            <h1 className="mb-8 text-6xl Avenir font-semibold text-light-brown">
            ⎯something which is worthwhile our ephemeral life here.
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-dark-brown">
            
            </h1>
            <h1 className="mb-8 mt-24 text-2xl Avenir font-semibold text-dark-brown">
              <b>When you do, come here and rave about it.</b>
            </h1>

            <h1 className="mb-8 text-2xl Avenir font-semibold text-light-brown">
              And let like minded people find about it. 
            </h1>
          </div>
        </div>
        {/* <div className="container px-5 mx-auto lg:px-24 ">
          <div ="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-6xl Avenir font-semibold text-dark-brown">
              We have 4000 weeks to live
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-dark-brown">
              The limit of the internet is not the amount of content, but the amount of time we have to consume it.
            </h1>
          </div>
        </div>
        <div className="container px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-6xl Avenir font-semibold text-dark-brown">
              More is not more anymore
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-dark-brown">
              Stop looking for the new stuff--it's mostly going to be more of mediocrity.
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-dark-brown">
               It's time to start digging for gold.
            </h1>
          </div>
        </div> */}
        <div className="container mt-24 px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 mt-14 text-6xl Avenir font-semibold text-dark-brown">
              So, what gold have you found recently?
            </h1>
            <button className="bg-gray-800 m-auto p-4 rounded text-white mt-12 mb-8  text-2xl Avenir font-semibold">
              <Link href="/cafe">Start sharing here</Link>
            </button>
            <h1 className="text-center mt-12 mx-auto mb-8 text-2xl Avenir font-semibold text-dark-brown">

              And, checkout the

              <div className="">
                <Link href="/cafe">
                <div
                className="cursor-pointer sm:m-2 md:m-auto lg:m-auto p-auto text-center  inline-flex items-center px-3 lg:px-5 md:px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform border rounded-lg bg-gray-800"
              >
                  <span className="justify-center">stuff others are raving about.</span>
              </div>
                  
                </Link>
              </div>
            </h1>

            <div className="mb-48"/>
          </div>
        </div>


        {/* <div className="container px-5 mt-72 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 mt-14 text-6xl Avenir font-semibold text-dark-brown">
              So, you are asking why not go for the most popular stuff?
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-dark-brown">
              You know the answer deep down. Try looking for the most popular books, most viewed Youtube videos, most listened to songs. Now, think about your favourite books, songs, videos.
            </h1>
            <h1 className="mb-8 text-2xl Avenir font-semibold text-dark-brown">
            Short answer:
              <div className="underline">
                <Link href="https://hbr.org/2002/11/the-flaw-of-averages">
                   Popularity is a flawed metric
                </Link>
              </div>
            </h1>
          </div>
        </div> */}
      </section>

      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl Avenir font-semibold text-dark-brown">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-dark-brown">
              Enter your email address and we&apos;ll send you a curated list of greatness every week.
            </h1>
            <input
              placeholder="jack@example.com"
              name="email"
              type="email"
              autoComplete="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-dark-brown font-semibold hover:border-gray-900"
            ></input>{" "}
            <div
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-800"
              
            >

              <span className="justify-center">Subscribe</span>
            </a>
          </div> */}
        </div>
      </section>
    </section>
  );
}