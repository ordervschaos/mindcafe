import { useEffect, useState } from 'react'
import moment from 'moment';

import { useSession } from "@clerk/nextjs";
import Layout from '../components/layouts/Layout'
import { createClient } from "@supabase/supabase-js";
import MealCard from '../components/meal/MealCard';
import _ from 'lodash'
import { GetServerSideProps } from 'next'
import { getMeals } from '../utils/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function Home({user,meals}) {
 
  const [mealsList, setMealsList] = useState(meals);


  

  return (
    <Layout user={user}>
      <div className="mt-6 max-w-3xl flow-root">


        <ul role="list" className="px-5">
          {mealsList && mealsList.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideAuth(async ({ req }) => {  const { userId } = req.auth;
  // Call an external API endpoint to get meals
  // var meal = await supabase.from("rave").select().eq('id', params.id);
  var meals = await getMeals(userId)
  var meals_view_data=[]
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
   

    processMealForDisplay:{
      var next_dish_index=meal.next_dish_index%meal.dish.length
      var meal={
        ...meal,
        next_dish:meal.dish[next_dish_index],
        num_of_dishes:meal.dish.length
      }
      delete meal.dish
      if(!meal.next_dish)
        meal.next_dish={content:""}


      meals_view_data.push(meal)
    }
    
  }

  
  


  



  // By returning { props: { meals } }, the Blog component
  // will receive `meals` as a prop at build time
  return {
    props: {
      meals:meals_view_data
    },
  }
},
{ loadUser: true }
);