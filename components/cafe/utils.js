export const getNextMealIndex=(cafe)=>{
  return (cafe.meals.length + cafe.current_meal_index + 1) % cafe.meals.length
}
export const getPrevMealIndex=(cafe)=>{
  return (cafe.meals.length + cafe.current_meal_index - 1) % cafe.meals.length
}