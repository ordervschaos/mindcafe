import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { supabaseServerSide } from "../utils/supabaseClient";


export const getServerSideProps = withServerSideAuth(async ({ req, resolvedUrl }) => {
  if (!req.auth.userId)
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in?redirectTo=/create",
      }
    }
  const supabase = await supabaseServerSide(req.auth);



  var meal = await supabase.from("meal").insert([
    {  owner_id: req.auth.userId },
  ]);


  return {
    redirect: {
      permanent: false,
      destination: "meal/" + meal.data[0].id + "/edit",
    }
  }
});

export default function Create() { }