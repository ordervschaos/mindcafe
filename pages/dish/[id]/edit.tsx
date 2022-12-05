
import EditDish from '../../../components/EditDish'
import FocusLayout from '../../../components/FocusLayout'
import { useRouter } from 'next/router'

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);




export default function Edit({dish,user}) {
  const router = useRouter()
  return (
    <>
      <EditDish user={user} dish={dish}/>
      <button onClick={()=>{router.back()}}
        type="button"
        className=" inline-flex items-center rounded border border-transparent bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save and go back
      </button>
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
