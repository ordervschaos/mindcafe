import React from "react";
import {formatDate} from 'utils/utils'

export default function ShowAllResponses({ response,onClick }) {
  console.log("response", response)
  return   (
  <div className=' bg-gray-100 mr-2 rounded cursor-pointer' onClick={onClick}>
    <div className="p-4 ">
      <div>
        <div className="text-gray-400 text-smallest pb-2">
          {formatDate(response.created_at)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: response.content }}></div>

      </div>
    </div>
</div>)
}