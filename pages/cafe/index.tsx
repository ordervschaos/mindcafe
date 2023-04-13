import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import CafeMealCard from '../../components/cafe/CafeMealCard';
import EatenDishesCount from '../../components/cafe/EatenDishesCount';
import CafeModal from '../../components/cafe/CafeModal';
import { getTodaysMealsList, getMealsEatenTodayIds, getMeals } from 'utils/utils'

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
  // Convert this to a function
  

  

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











