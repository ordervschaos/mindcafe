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
