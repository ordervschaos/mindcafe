
import EditMeal from '../../../components/EditMeal'
import FocusLayout from '../../../components/FocusLayout'

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);




export default function Edit({meal,user}) {
  return (
    <>
      <EditMeal user={user} meal={meal}/>
    </>
  )
}



Edit.getLayout = function getLayout(page) {
  return (
    <FocusLayout>{page}</FocusLayout>
  )
}


export async function getServerSideProps({ params }) {
  // Call an external API endpoint to get meals
  var meal = await supabase.from("meal").select(`
  id, owner_id, name,schedule,next_dish_index,timing,expiresIn,weeklySchedule,
  dish(content, id, meal_id, owner_id, created_at)
  `).eq('id', params.id);
  
  meal = meal.data[0]
  meal.dishes=meal.dish

  // By returning { props: { meals } }, the Blog component
  // will receive `meals` as a prop at build time
  return {
    props: {
      meal,
    },
  }
}
