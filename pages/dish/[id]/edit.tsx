
import EditDish from '../../../components/dish/EditDish'
import FocusLayout from '../../../components/FocusLayout'

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);




export default function Edit({dish,user}) {

  
  return (
    <>
      <EditDish user={user} dish={dish}/>
      
    </>
  )
}



Edit.getLayout = function getLayout(page) {
  return (
    <FocusLayout>{page}</FocusLayout>
  )
}


export async function getServerSideProps({ params }) {
  // Call an external API endpoint to get dishs
  var dish = await supabase.from("dish").select().eq('id', params.id);
  console.log(dish)
  dish = dish.data[0]
  // By returning { props: { dishs } }, the Blog component
  // will receive `dishs` as a prop at build time
  return {
    props: {
      dish,
    },
  }
}
