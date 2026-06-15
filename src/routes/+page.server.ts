import type { PageServerLoad } from "./$types";

export const load : PageServerLoad = async ({fetch})=>{
    const res = await fetch("https://dhun-backend.vercel.app/api/songs")
    
    if (!res.ok) {
        throw new Error("server error")
    }
    const data = await res.json()


    return {
        data
    }
}