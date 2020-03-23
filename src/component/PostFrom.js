import React, { useState } from 'react'

const PostFrom = () => {

    const [post, setPost] = useState({
        activity: '',
        address: '',
        date: '',
        name: '',
        hours: 0,
        people: 0
    })



    return (
        <div>
            <input type="text" onChange={(e) => setPost({ ...post, activity: e.target.vale })} /> <br />
            <input type="text" onChange={(e) => setPost({ ...post, address: e.target.vale })} /> <br />
            <input type="text" onChange={(e) => setPost({ ...post, date: e.target.vale })} /> <br />
            <input type="text" onChange={(e) => setPost({ ...post, name: e.target.vale })} /> <br />
            <input type="number" onChange={(e) => setPost({ ...post, hours: e.target.vale })} /> <br />
            <input type="number" onChange={(e) => setPost({ ...post, people: e.target.vale })} /> <br />

        </div>
    )
}

export default PostFrom