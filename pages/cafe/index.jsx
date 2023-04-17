import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { useState } from 'react'
import Layout from '../../components/Layout'
import CafeMealCard from '../../components/cafe/CafeMealCard';
import EatenDishesCount from '../../components/cafe/EatenDishesCount';
import CafeModal from '../../components/cafe/CafeModal';
import { getTodaysMealsList, getMealsEatenTodayIds, getMeals } from 'utils/utils'


export default function Home({ user, meals, count_meals_eaten_today }) {

  const [mealsList, setMealsList] = useState(meals);
  const [eatenMealsCount, setEatenMealsCount] = useState(count_meals_eaten_today)
  const [openModal, setOpenModal] = useState(true)
  const [mealIndex, setMealIndex] = useState(0)

  function showMealPreview(meal_id) {
    setMealIndex(mealsList.findIndex((m) => m.id === meal_id))
    setOpenModal(true)
  }

  function scrollNextDishToTop(current_meal_id) {
    var meal_index = mealsList.findIndex((m) => m.id === current_meal_id)
    var next_meal_index = meal_index + 1
    if (next_meal_index < mealsList.length) {
      var next_meal = mealsList[next_meal_index]
      var next_meal_element = document.getElementById(next_meal.id)
      next_meal_element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }



  return (
    <Layout user={user}>
      <div className="mt-6 ma  x-w-3xl flow-root">

        <EatenDishesCount eatenMealsCount={eatenMealsCount} total={mealsList.length}/>

        <ul role="list" className="lg:px-5">
          {mealsList && mealsList.length > 0 &&
            <CafeModal mealIndex={mealIndex} setMealIndex={setMealIndex} openModal={openModal} setOpenModal={setOpenModal} mealsList={mealsList} setEatenMealsCount={setEatenMealsCount} eatenMealsCount={eatenMealsCount} />
          }
          {mealsList && mealsList.map((meal) => (
            <div key={meal.id}>
              <CafeMealCard key={meal.id} meal={meal} scrollNextDishToTop={scrollNextDishToTop} showMealPreview={showMealPreview} setEatenMealsCount={setEatenMealsCount} eatenMealsCount={eatenMealsCount} />
            </div>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withServerSideAuth(async ({ req }) => {
  var { userId } = req.auth;
  var meals = await getMeals(userId)

  var meals_eaten_today_ids = await getMealsEatenTodayIds(userId)

  
  var todays_meals = getTodaysMealsList(meals, meals_eaten_today_ids)




  
 

  return {
    props: {
      meals: todays_meals,
      count_meals_eaten_today: meals_eaten_today_ids ? meals_eaten_today_ids.length : 0
    },
  }
},
  { loadUser: true }
);
  // Call an external API endpoint to get meals
  // var meal = await supabase.from("rave").select().eq('id', params.id);











