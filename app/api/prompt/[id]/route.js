import {connectToDb} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    try {
        await connectToDb()
        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) {
            return new Response(`Prompt with ID ${params.id} does not exist`, {
                status: 404
            })
        }

        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (e) {
        console.error(e)
        return new Response('Failed to fetch prompt', {
            status: 500
        })
    }
}

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();
    try {
        await connectToDb()

        const existingPrompt = await Prompt.findById(params.id).populate('creator')
        if (!existingPrompt) {
            return new Response(`Prompt with ID ${params.id} does not exist`, {
                status: 404
            })
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })
    } catch (e) {
        console.error(e)
        return new Response('Failed to update prompt', {
            status: 500
        })
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDb()

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Deleted", {
            status: 200
        })
    } catch (e) {
        console.error(e)
        return new Response('Failed to delete prompt', {
            status: 500
        })
    }
}