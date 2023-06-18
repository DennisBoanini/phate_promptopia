"use client";

import {useEffect, useState} from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({data, handleTagClick}) => (
    <div className={'mt-16 prompt_layout'}>
        {data.map(post => (
            <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))}
    </div>
)

export default function Feed() {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearchText(event.target.value)
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json();
            setPosts(data)
        }

        fetchPost()
    }, [])

    useEffect(() => {
        if (searchText !== undefined) {
            setTimeout(() => {
                const fetchPost = async () => {
                    const response = await fetch(`/api/prompt?q=${searchText}`)
                    const data = await response.json();
                    setPosts(data)
                }

                fetchPost()
            }, 500)
        }
    }, [searchText])

    return (
        <section className={'feed'}>
            <form className={'relative flex-center w-full'}>
                <input
                    type="text"
                    placeholder={'Search for a tag or a username'}
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className={'search_input peer'}/>
            </form>

            <PromptCardList data={posts} handleTagClick={tag => setSearchText(tag)}/>
        </section>
    );
}