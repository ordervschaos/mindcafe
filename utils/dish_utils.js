export const printCurrentDishIndex = (meal) => {
  return meal.next_dish_index+1;
}

export const getNextDishIndex = (meal) => {
  return (meal.next_dish_index + 1) % meal.dish.length
}


export const getPrevDishIndex = (meal) => {
  return (meal.next_dish_index + meal.dish.length - 1) % meal.dish.length
}