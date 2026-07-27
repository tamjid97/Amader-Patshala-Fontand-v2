"use server"

import { revalidateTag } from "next/cache";
import { isAccessTokenExist } from "./batchTime";

type PostState = {
  success: true,
    statusCode: number,
    message: string,
    data: Record<string, undefined>
}


export const picUplade = async ( prevState : PostState , fromData : FormData )=>{

  console.log(
    {title : fromData.get("title"),
    pictureUrl : fromData.get("pictureUrl"),
    description : fromData.get("description")}
  );

  const payload = {
    title : fromData.get("title"),
    pictureUrl : fromData.get("pictureUrl"),
    description : fromData.get("description")
  }


  const accessToken = await isAccessTokenExist()

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/pictures`,{
    method : "POST",
    headers :{
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json"
    },
    body : JSON.stringify(payload)
  });

  const result = await res.json();

  
    if(result.success){
        revalidateTag("my-posts", {
            expire : 0
        })
    }

    return result
}