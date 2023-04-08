import { useSession } from "@clerk/nextjs";
import { useEffect, useRef, useState } from 'react'
import { createClient } from "@supabase/supabase-js";





//import Editor
import FocusMenu from "../FocusMenu";

import dynamic from "next/dynamic";
const DishEditor = dynamic(() => import("./DishEditor"), { ssr: false });








export default function EditRave({dish,user}) {


  return (
    <div>

      <FocusMenu user={user}/>
      <div className="content-center	">

        <div className="md:grid md:grid-cols-1 md:gap-6 mx-auto	lg:w-[52rem]">
          <div  className="pl-2">

            <div className="">

              <DishEditor dish={dish}  />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}