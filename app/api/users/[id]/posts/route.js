import {connectToDb} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDb()
        const prompts = await Prompt.find({creator: params.id}).populate('creator')

        return new Response(JSON.stringify(prompts), {
            status: 201
        })
    } catch (e) {
        console.error(e)
        return new Response('Failed to fetch all user prompts', {
            status: 500
        })
    }
}