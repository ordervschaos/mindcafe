import { isMealToBeShownNow } from 'utils/mealHelpers'
import _ from 'lodash'
import { createClient } from "@supabase/supabase-js";
import { supabaseClient } from 'utils/supabaseClient'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const getMealsEatenTodayIds = async(userId)=>{
  var meals_eaten_today_res = await supabase.from("eaten_meal").select(`meal_id`).eq('eater_id', userId).eq('for_date', new Date().toISOString().split('T')[0])
  var meals_eaten_today = meals_eaten_today_res.data
  var meals_eaten_today_ids = meals_eaten_today.map(function (o) { return o.meal_id; })
  meals_eaten_today_ids = [...new Set(meals_eaten_today_ids)]
  return meals_eaten_today_ids
}


export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date) {
  var d = new Date(date);
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString(undefined, options)
}

export const getMealsForWidget = async (userId) => {
  var meals_res = await supabase.from("meal").select(`
  id, owner_id, name, updated_at`).eq('owner_id', userId ).neq('archived',true).order('updated_at', { ascending: false });
  var meals = meals_res.data || []
  return meals.filter(meal=>!!meal.name)
}


export const getMeals = async (userId) => {
  var meals_res = await supabase.from("meal").select(`
  id, owner_id, name,schedule,next_dish_index,timing,expiresIn,weeklySchedule,
  dish(content, id, meal_id, owner_id, created_at, accepts_responses)
  `).eq('owner_id', userId ).neq('archived',true).order('created_at', { ascending: false });
  var meals = meals_res.data || []
  meals.forEach(meal=>{
    meal.dish = meal.dish.filter(dish=>!!dish.content)
  })
  return meals.filter(meal=>!!meal.name)
}
export const getTodaysMealsList = (meals, meals_eaten_today_ids) => {
  var meals_view_data = []
  for (var i = 0; i < meals.length; i++) {
    var meal = meals[i]

    //mark eateen meals
    if (meals_eaten_today_ids.includes(meal.id))
      meal.done = true

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
  // push done meals to the end
  meals_view_data = _.sortBy(meals_view_data, function (o) {
    if (o.done)
      return 1
    return 0
  })

  return meals_view_data
}

export const getAllResponsesOfADish = async (dish_id,session) => {

  const supabase_client = await supabaseClient(session)

  var responses_res = await supabase_client.from("response").select(`
  id, dish_id, content, created_at, owner_id
  `).eq('dish_id', dish_id).order('created_at', { ascending: false });
  var responses = responses_res.data || []
  return responses
}
