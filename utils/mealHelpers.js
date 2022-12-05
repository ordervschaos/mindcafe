// define data structure for the input

const moment = require("moment/moment");
var debug = require('debug') // dev is env variable


/*
 * * * * * *
 | | | | |
 | | | | day of week (0 - 6) (Sunday=0)
 | | | month (1-12)
 | | day of month 1-31
 | hour 0-23
 minute

*/
var meals = [

  {
    name: "Thought for the day",
    schedule: {
      repeat: {
        min: 0,
        hour: 20,
        dayOfMonth: null,
        dayOfWeek: 6,
        month: 11,
      },
      perishesIn: 60,
    },
    lastEatenDish: 1,
    dishes: [
      {
        id: 1,
        content: "Today is a good day"
      },
      {
        id: 2,
        content: "Be present"
      },
      {
        id: 3,
        content: "Be grateful"
      },
      {
        id: 4,
        content: "Be kind"
      },
    ]

  },

]


// function to pick meals for the current time
function pickMealsForNow(meals) {
  var now = new Date();
  var pickedMeals = meals.filter(function (meal) {
    var schedule = meal.schedule;
    var repeat = schedule.repeat;
    var perishesIn = schedule.perishesIn;
    if(repeat.dayOfWeek){//if day of week is defined, it's similar to a daily schedule with a day of week restriction
      if(repeat.dayOfWeek != now.getDay()){
        return false;
      }
    }
    
    
    var repeatDate = new Date(now.getFullYear(), repeat.month?repeat.month-1:now.getMonth(), repeat.dayOfMonth?repeat.dayOfMonth:now.getDate(), repeat.hour, repeat.min, 0, 0);
    
    var perishDate = new Date(repeatDate.getTime() + perishesIn * 60000);
    console.log(repeatDate);
    console.log(now);
    console.log(perishDate);
    return repeatDate <= now && now <= perishDate;
  });
  return pickedMeals;
}





// function to pick next dish in the meal

function pickNextDish(meal) {
  console.log(meal);
  var now = new Date();
  var dishes = meal.dishes;
  var lastEatenDish = meal.lastEatenDish;
  console.log(lastEatenDish);
  console.log(dishes);
  var nextDish = dishes[lastEatenDish];
  return nextDish;
}


console.log(pickMealsForNow(meals))


var now=moment()
var nowJS=new Date()
var todayYear = nowJS.getFullYear()
var todayMonth = nowJS.getMonth()
var todayDate = nowJS.getDate()
var todayDayOfWeek = nowJS.getDay()

function isMealToBeShownNow (timing,expiresIn, weeklySchedule) {


  if(weeklySchedule){
    if(weeklySchedule.indexOf(todayDayOfWeek.toString()) == -1){
      return false;
    }
  }
if(timing){
  var meal_schedule={
    timing:{
      hour:timing.split(":")[0],
      minute:timing.split(":")[1],
    },
    
  }
  if(expiresIn){
    meal_schedule.expiration={
      value:expiresIn.split(" ")[0],
      unit:expiresIn.split(" ")[1],
    }
  }else{
    meal_schedule.expiration={
      value:24,
      unit:"hours",
    }
  }

  var todaysMealTime= new Date(todayYear, todayMonth, todayDate, meal_schedule.timing.hour, meal_schedule.timing.minute, 0, 0)
  var mealPerishesAt = moment(todaysMealTime).add(meal_schedule.expiration.value,meal_schedule.expiration.unit ).toDate()
  console.log(todaysMealTime,mealPerishesAt,now)
  if(now.isBetween(todaysMealTime,mealPerishesAt)){
    console.log("yes")
    return true
  }else
  return false
  }
  return true
}


  module.exports = {
    pickMealsForNow: pickMealsForNow,
    pickNextDish: pickNextDish,
    meals:meals,
    isMealToBeShownNow:isMealToBeShownNow
  }
