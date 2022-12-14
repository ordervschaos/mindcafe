import { useEffect, useState } from 'react'
import moment from 'moment';

import { useSession } from "@clerk/nextjs";
import Layout from '../../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import _ from 'lodash'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
import {isMealToBeShownNow} from '../../../utils/mealHelpers'
import CafeMealView from '../../../components/CafeMealView';

export default function Home({user,meals}) {
 
  const [selectedTags, setSelectedTags] = useState([]);
  const [mealsList, setPostsList] = useState(meals);
  const [eatenDishesCount,setEatenDishesCount]=useState(0)

  

  return (
    <Layout user={user}>
      <div className="mt-6 max-w-3xl flow-root">

          {mealsList && mealsList.map((meal) => (
            <CafeMealView key={meal.id} meal={meal} setEatenDishesCount={setEatenDishesCount} eatenDishesCount={eatenDishesCount}/>
          ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  // Call an external API endpoint to get meals
  // var meal = await supabase.from("rave").select().eq('id', params.id);
  var meals_res = await supabase.from("meal").select(`
  id, owner_id, name,schedule,next_dish_index,timing,expiresIn,weeklySchedule,
  dish(content, id, meal_id, owner_id, created_at)
  `).order('created_at', { ascending: false }).eq("id",params.id);
  var meals = meals_res.data
  var meals_view_data=[]

  // meals = meals.sort( function(o) { 
  //   console.log("o",o.timing)
  //   // console.log("value",_.get(o,"timing",24) )
  //   return o.timing
  // })

  
  for(var i=0;i<meals.length;i++){
    var meal = meals[i]

   
    // {
    //   "timing":{
    //     "hour": 12,
    //     "minute": 30
    //   },
    //   "expiration":{
    //     "value": 1,
    //     "unit": "day"
    //   }
    // }
   
    if(meal.timing || meal.weeklySchedule){
      // console.log("timing",meal.timing)
      if(!isMealToBeShownNow(meal.timing,meal.expiresIn,meal.weeklySchedule))
        continue
    }

    processMealForDisplay:{
      var next_dish_index=meal.next_dish_index%meal.dish.length
      var meal={
        ...meal,
        next_dish:meal.dish[next_dish_index],
        num_of_dishes:meal.dish.length
      }
      meals_view_data.push(meal)
    }

    
  }
  //sort by schedule timing hour
  
  


  



  // By returning { props: { meals } }, the Blog component
  // will receive `meals` as a prop at build time
  return {
    props: {
      meals:meals_view_data
    },
  }
}