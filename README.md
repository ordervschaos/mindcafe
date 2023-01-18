This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Next step
- add a dish to a meal
  - on save, create a dish 
    - create dish model
    - create UI
      - create a en editor
    - create logic to save the meal
- show list of dishes in edit meal UI

- Add the new dish to the list of dishes in the meal
- Edit a dish
  - 
- Delete a dish

----------------
- Fix bug where the latest dish replaces the previous one - done
- Create cafe  - /cafe
  - get all meals - done
    and the first in line dish - done

- Show the dishes based on a pointer
  - on click of done, shift the pointer to the next dish




- Beautify
  - cards
  - buttons - done


- Show some cards only when the scheduled time comes
  - example: show the Tonight's watch card only when it is 7:00 PM
  - Meal Schedule
    - Daily 7:00 PM, expires in 5 hours
  - Schedule structure
    - Frequency
      - Daily
    - Time
      - between 7:00 PM and 12 am

Another example:
  - Breakfast
    - Daily 11:00 AM, expires in 5 hours



- Logic for fetching
  - if no schedule, fetch 
  - if schedule, fetch if the schedule is met
    - Associate a schedule with a meal
      <!-- - frequency -->
      - time
      - expiry time

    <!-- - Dropdown
      - Daily, Weekly, Monthly, Yearly -->
    - Time picker
      - all the time at 15 minutes interval
    - expiry time - 
      - input for value
      - drop down for unit
      
- Model for storing schedule
  - timing
  - expiry time

Show up at 7:00 PM,
expires in 5 hours

Make the schedule editable
  - time dropdown should change the time

- similarly for the expirity time
- add day of week option
  - weekly filter



5th Dec 2022
- deploy to vercel
  - push to github



hide eaten cards
- create a toast for displaying number of finished meals - done


10th Dec 22
- Create a way to view multiple of dishes 
  - /cafe/meal/:id
  - have the latest card
    - [Show Next] button
      - marks the current one as done
      - loads the next dish in line 


- next: 

- Unread first
  - so....everytime I see a card and mark it as eaten, I don't need to see it for a while
  - this "while" is a question mark. What is this while?
  - If it's one day, i don;t want to see it till next day
  - When do I wanna see it next?
    -  Somethings you do daily
    - Something weekly
      So, does that mean, each of these meals haev a frewuncy
       - Of course, all Meals have frequency
       - So, each me yeahal needs to have a default frequncy of a day and they persist till end of day Yeah yeah you can say that once Hai four XN hour time yes X what is that actually work in real life real life
       Could be based on schedule
       Aaho it be based on kya Aap
       what do I want here?
i think Yeah frequency approach please more stable
- So if I tick something off at 11pm. Next I wanna see it only by 12 AM
- Which Men's dad local time the god stick that they are the factors if it has been taken the same day don't short call Josh guard
- 

 implementation
 - Create a table for recording ethan dishes [x]
 - create an entry every time a meal is ticked off 
 - Don't show me has been consumed that day
 - 









  - 
- order stuff by time 
  - Persistent
  - Timed
  - Weekly special
  - Monthly special





- What are the pain points
  - the order of meals should be by time
  - time should be displayed
  - no time meals should be at last
  - 


- Ability to disable a meal