"use client";

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Profile from "@components/Profile";
import {useEffect, useState} from "react";
import prompt from "@models/prompt";

export default function MyProfile() {
    const {data: session} = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [deleting, setDeleting] = useState(false);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const confirmResponse = confirm('Are you sure to delete this post?')
        if (confirmResponse) {
            setDeleting(true)
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter(p => p._id !== post._id);
                setPosts(filteredPosts)
            } catch (e) {
                console.error(e)
            } finally {
                setDeleting(false)
            }
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();
            setPosts(data)
        }

        if (session?.user.id) {
            fetchPost()
        }
    }, [])

    return (
        <Profile
            name={'My'}
            description={'Welcome to your personalized profile page'}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}/>
    );
}