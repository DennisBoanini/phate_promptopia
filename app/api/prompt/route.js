import {connectToDb} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    const query = request.nextUrl.searchParams.get('q');

    try {
        await connectToDb()
        const prompts = await Prompt.find({
            "$or": [
                { "prompt" : { "$regex": query ?? '', "$options":"i"} },
                { "tag" :   { "$regex": query ?? '', "$options":"i"} }
            ]
        }).populate('creator')

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (e) {
        console.error(e)
        return new Response('Failed to fetch all prompts', {
            status: 500
        })
    }
}