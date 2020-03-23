import React from 'react'
import PostFrom from './PostFrom'

const PostCard = () => {

    const post = () => {
        if (localStorage.getItem('data') == 5935512038 + "") {

            return (
                <div>
                    <PostFrom />
                </div>
            )
        }
    }

    return (
        <div>

            {post()}
        </div>
    )


}

export default PostCard

