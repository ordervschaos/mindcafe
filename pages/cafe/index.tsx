import { useEffect, useState } from 'react'

import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import type{ AuthData } from '@clerk/nextjs/dist/server/types'
import { GetServerSideProps } from 'next'



import Layout from '../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import CafeMealCard from '../../components/CafeMealCard';
import _ from 'lodash'
import TabMenu from '../../components/TabMenu';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
import {isMealToBeShownNow} from '../../utils/mealHelpers'
import EatenDishesCount from '../../components/EatenDishesCount';



export default function Home({user,meals}) {
 
  const [selectedTags, setSelectedTags] = useState([]);
  const [mealsList, setPostsList] = useState(meals);
  const [eatenDishesCount,setEatenDishesCount]=useState(0)

  

  return (
    <Layout user={user}>
      <div className="mt-6 max-w-3xl flow-root">
      <TabMenu selectedTab={""}/>
        <EatenDishesCount eatenDishesCount={eatenDishesCount}/>
        <ul role="list" className="lg:px-5">
          {mealsList && mealsList.map((meal) => (
            <CafeMealCard key={meal.id} meal={meal} setEatenDishesCount={setEatenDishesCount} eatenDishesCount={eatenDishesCount}/>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { userId }: AuthData = getAuth(ctx.req)
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  // Call an external API endpoint to get meals
  // var meal = await supabase.from("rave").select().eq('id', params.id);

  

  var meals_eaten_today_res=await supabase.from("eaten_meal").select(`meal_id`).eq('eater_id',user.id).eq('for_date',new Date().toISOString().split('T')[0])
  console.log("meals_eaten_today_res",meals_eaten_today_res)
  var meals_eaten_today=meals_eaten_today_res.data
  var meals_eaten_today_ids=meals_eaten_today.map(function(o) { return o.meal_id; })
  
  console.log("meals_eaten_today_ids",meals_eaten_today_ids)

  var meals_res = await supabase.from("meal").select(`
  id, owner_id, name,schedule,next_dish_index,timing,expiresIn,weeklySchedule,
  dish(content, id, meal_id, owner_id, created_at)
  `).eq('owner_id',user.id).order('created_at', { ascending: false });
  var meals = meals_res.data
  var meals_view_data=[]

  



  
  for(var i=0;i<meals.length;i++){
    var meal = meals[i]

    //discard eateen meals
    if(meals_eaten_today_ids.includes(meal.id))
      continue

    if(meal.timing || meal.weeklySchedule){
      // console.log("timing",meal.timing)
      if(!isMealToBeShownNow(meal.timing,meal.expiresIn,meal.weeklySchedule))
        continue
    }

    processMealForDisplay:{
      //pricess timing 
      var timing=_.get(meal,"timing","24:0")
      if(timing!=null)
        meal.timing=`${timing.split(":")[0]}:${Number(timing.split(":")[1]).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}`


    
     

    // next dish
      var next_dish_index=meal.next_dish_index%meal.dish.length
      var meal={
        ...meal,
        next_dish:meal.dish[next_dish_index],
        num_of_dishes:meal.dish.length
      }
      // delete meal.dish
      meals_view_data.push(meal)
    }

    
  }
  
  //sort by schedule timing hour
  meals_view_data = _.sortBy(meals_view_data, function(o) { 
    if(!o.timing)
      return 24*60

    return o.timing.split(":")[0]*60 + Number(o.timing.split(":")[1])      
    })
  
  console.log("meals",meals.map(function(o) { return o.timing; }))
  


  



  // By returning { props: { meals } }, the Blog component
  // will receive `meals` as a prop at build time
  return {
    props: {
      meals:meals_view_data,
      ...buildClerkProps(ctx.req)
    },
  }
}