"use client";

import {useRouter, useSearchParams} from "next/navigation";
import Form from "@components/Form";
import {useEffect, useState} from "react";

export default function UpdatePrompt() {
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const promptId = useSearchParams().get('id')
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    async function updatePrompt(event) {
        event.preventDefault();
        setEditing(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setEditing(false)
        }
    }

    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                const response = await fetch(`/api/prompt/${promptId}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json()
                    setPost({
                        prompt: data.prompt,
                        tag: data.tag
                    })
                }
            } catch (e) {
                console.error(e)
            }
        }

        if (promptId) {
            getPromptDetails()
        }
    }, [promptId])

    return (
        <Form
            type={'Edit'}
            post={post}
            setPost={setPost}
            submitting={editing}
            handleSubmit={updatePrompt}/>
    );
}