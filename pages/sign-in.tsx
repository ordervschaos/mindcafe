import { WithUser } from "@clerk/clerk-react";
import {useSession} from '@clerk/nextjs'
import { withServerSideAuth } from "@clerk/nextjs/ssr";
// type UserStripProps = {
//   user_name: string;
// }

// const UserStrip = (props: WithUserProp<UserStripProps>) => {
//   const { user, user_name } = props;
//   return (
//     <>
//     <h1>{ user_name }</h1>
//     <div>
    

//     </div>
//     </>
//   );
// }

// export const UserStripWithUser = withUser(UserStrip);





import { ClerkProvider,RedirectToUserProfile, SignedIn, SignedOut, RedirectToSignIn,UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/router';


import Router from "../node_modules/next/router";


//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ['/'];

function MyApp() {

  
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);
  
  




  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  // pageProps.user=user;
  
  
  var userButton = <UserButton showName={true}	/>
  var ShortUserButton = <UserButton showName={false}	/>
  return (

        <>
         
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>


  );
}

export default MyApp;



export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  
  if(req.auth.userId){
   return {
      redirect:{
        destination:'/raves',
        permanent:false
      }
   }
  }
})