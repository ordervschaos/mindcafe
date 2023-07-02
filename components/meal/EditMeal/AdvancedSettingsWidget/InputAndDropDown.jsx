import { supabaseClient } from 'utils/supabaseClient'
import { useSession } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function ExpiryDropDown({ meal }) {

  var [expiresInValue,expiresInUnit]=meal.expiresIn?meal.expiresIn.split(" "):["24","hours"]

  const { session } = useSession();
  const [expiryUnit, setExpiryUnit] = useState(expiresInUnit)
  const [expiryValue, setExpiryValue] = useState(expiresInValue)
  async function updateExpiry() {
    const supabase = await supabaseClient(session);
    var expiryString=`${expiryValue} ${expiryUnit}`
    var updateResponse = await supabase
      .from("meal")
      .update({ expiresIn: expiryString }).match({ id: meal.id, owner_id: session.user.id });
    console.log("updated expiry", updateResponse.data[0].expiresIn)
  

  }
  



  useEffect(() => {
    setTimeout(updateExpiry, 1000)
  }, [expiryUnit,expiryValue,updateExpiry])
  return (
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-800">
        Expires in
      </label>
      <form className="relative mt-1 rounded-md shadow-sm" onChange={updateExpiry}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">⏳</span>
        </div>
        <input
          onChange={(e)=>setExpiryValue(e.target.value)}
          type="number"
          name="price"
          id="price"
          value={expiryValue}

          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="60"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            duration unit
          </label>
          <select onChange={(e)=>setExpiryUnit(e.target.value)} value={expiryUnit} 
            id="currency"
            name="currency"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>minutes</option>
            <option>hours</option>
          </select>
        </div>
      </form>
    </div>
  )
}
