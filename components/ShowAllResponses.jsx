import React from "react";


import {getAllResponsesOfADish} from 'utils/utils'


import { useSession } from "@clerk/nextjs";

import { supabaseClient } from 'utils/supabaseClient'
import DisplayResponse from "components/DisplayResponse";

export default function ShowAllResponses({ dish, handleClickOnDisplayedResponse }) {
  const { session } = useSession();

  const [responses, setResponses] = React.useState(null)

  React.useEffect(() => {
    getAllResponsesOfADish(dish.id, session).then((responses) => {
      console.log("responses22", responses)
      setResponses(responses)
    }).catch((error) => {
      console.log("error", error)
    }
    )
  }
    , [dish.id, session])

  

  return (
    <div className="w-full">
      {responses&&responses.map((response) => {
        return <div className="my-2">
          <DisplayResponse response={response} onClick={handleClickOnDisplayedResponse} />
        </div>
      })}
    </div>
  )
}


