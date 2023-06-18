"use client";

import Form from "@components/Form";
import {useState} from "react";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreatePrompt() {
    const { data: session } = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    async function createPrompt(event) {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type={'Create'}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}/>
    );
}