import {supabaseServerSide} from "../utils/supabaseClient";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import RaveCard from "../components/DishCard";
import Layout from "../components/Layout";


export default function userBookmarks({ user,posts }) {
  return (
    <Layout user={user}>
      <h2 className='mt-12 font-extrabold text-4xl'>Bookmarks</h2>
      <div className="mt-6 max-w-3xl flow-root">

        {posts.map((post) => (
          <RaveCard key={post.id} post={post} />

        ))}
      </div>
    </Layout>
  );
}



export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  const supabase = await supabaseServerSide(req.auth);

  if(!req.auth.userId)
    return{
      redirect: {
        permanent: false,
        destination: "/sign-in?redirectTo=/create",
      }
    }

  var bookmarks_res= await supabase.from("bookmark").select().match({
    user_id: req.auth.userId,
  }).order('created_at', { ascending: false });
  var bookmarks = bookmarks_res.data
  
  // bookmarks.map((bookmark) => bookmark.post_id)
  var posts_res = await supabase.from("rave").select().filter("id","in",`(${bookmarks.map((bookmark) => bookmark.post_id).join(',')})`).order('created_at', { ascending: false });
  console.log("posts-0-0000000=0======")
  console.log(posts)
  var posts = posts_res.data

  var user_ids=posts.map((post)=>post.author_id)
  var users
  users=await fetch(`https://api.clerk.dev/v1/users?ids=${user_ids.join(',')}`, {
    headers: {
      'Authorization': `Bearer ${process.env.CLERK_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  users = await users.json()
  



  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
})