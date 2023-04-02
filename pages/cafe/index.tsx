import { withServerSideAuth } from "@clerk/nextjs/ssr";


import { useEffect, useState } from 'react'


import { GetServerSideProps } from 'next'



import Layout from '../../components/Layout'
import { createClient } from "@supabase/supabase-js";
import CafeMealCard from '../../components/CafeMealCard';
import _ from 'lodash'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
import { isMealToBeShownNow } from '../../utils/mealHelpers'
import EatenDishesCount from '../../components/EatenDishesCount';

import CafeModal from '../../components/CafeModal';



export default function Home({ user, meals, count_meals_eaten_today }) {


  const [mealsList, setMealsList] = useState(meals);
  const [eatenDishesCount, setEatenDishesCount] = useState(count_meals_eaten_today)
  const [openModal, setOpenModal] = useState(true)
  const [mealIndex, setMealIndex] = useState(0)

  function showMealPreview(meal_id) {
    setMealIndex(mealsList.findIndex((m) => m.id === meal_id))
    setOpenModal(true)
  }

  return (
    <Layout user={user}>
      <div className="mt-6 ma  x-w-3xl flow-root">

        <EatenDishesCount eatenDishesCount={eatenDishesCount} />
        <ul role="list" className="lg:px-5">
          {mealsList && mealsList.length > 0 &&
            <CafeModal mealIndex={mealIndex} setMealIndex={setMealIndex} openModal={openModal} setOpenModal={setOpenModal} mealsList={mealsList} setEatenDishesCount={setEatenDishesCount} eatenDishesCount={eatenDishesCount} />
          }
          {mealsList && mealsList.map((meal) => (
            <div key={meal.id}>
              <CafeMealCard key={meal.id} meal={meal} showMealPreview={showMealPreview} setEatenDishesCount={setEatenDishesCount} eatenDishesCount={eatenDishesCount} />
            </div>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideAuth(async ({ req }) => {
  var { userId } = req.auth;
  // fetch data
  var meals_eaten_today_res = await supabase.from("eaten_meal").select(`meal_id`).eq('eater_id', userId).eq('for_date', new Date().toISOString().split('T')[0])
  var meals_eaten_today = meals_eaten_today_res.data
  var meals_eaten_today_ids = meals_eaten_today.map(function (o) { return o.meal_id; })


  var meals_res = await supabase.from("meal").select(`
  id, owner_id, name,schedule,next_dish_index,timing,expiresIn,weeklySchedule,
  dish(content, id, meal_id, owner_id, created_at)
  `).eq('owner_id', userId ).neq('archived',true).order('created_at', { ascending: false });
  var meals = meals_res.data
  var meals_view_data = []


  if(!meals)
    meals = []



  for (var i = 0; i < meals.length; i++) {
    var meal = meals[i]

    //discard eateen meals
    if (meals_eaten_today_ids.includes(meal.id))
      continue

    if (meal.timing || meal.weeklySchedule) {
      if (!isMealToBeShownNow(meal.timing, meal.expiresIn, meal.weeklySchedule))
        continue
    }

    processMealForDisplay: {
      //pricess timing 
      var timing = _.get(meal, "timing", "24:0")
      if (timing != null)
        meal.timing = `${timing.split(":")[0]}:${Number(timing.split(":")[1]).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}`

      // next dish
      var next_dish_index = meal.next_dish_index % meal.dish.length
      var meal = {
        ...meal,
        next_dish: meal.dish[next_dish_index],
        num_of_dishes: meal.dish.length
      }
      // delete meal.dish
      if(meal.next_dish)
        meals_view_data.push(meal)
    }


  }

  //sort by schedule timing hour
  meals_view_data = _.sortBy(meals_view_data, function (o) {
    if (!o.timing)
      return 24 * 60

    return o.timing.split(":")[0] * 60 + Number(o.timing.split(":")[1])
  })

  return {
    props: {
      meals: meals_view_data,
      count_meals_eaten_today: meals_eaten_today ? meals_eaten_today.length : 0
    },
  }
},
  { loadUser: true }
);
  // Call an external API endpoint to get meals
  // var meal = await supabase.from("rave").select().eq('id', params.id);











