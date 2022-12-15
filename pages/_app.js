import { WithUser, WithUserProp } from "@clerk/clerk-react";
import { SignIn } from "@clerk/nextjs";


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





import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn,UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/router';


import '../styles/globals.css'
//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ['/'];

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);
  
  




  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  // pageProps.user=user;
  
  
  var userButton = <UserButton showName={true}	/>
  var ShortUserButton = <UserButton showName={false}	/>
  return getLayout(
    <ClerkProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <WithUser>
              {(user) => (
                <Component {...pageProps} user={{...user,userButton,ShortUserButton}}/>  
              )}
            </WithUser>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;



