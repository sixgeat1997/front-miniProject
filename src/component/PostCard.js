import React, { useEffect } from 'react'
import PostFrom from './PostFrom'
import { allAction } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import Card from './Card'

const PostCard = () => {

    const postreduc = useSelector(state => state.postreduc)
    const Allaction = bindActionCreators(allAction, useDispatch())
    console.log(postreduc);

    useEffect(() => {
        Allaction.getPost()
    }, [])

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
            {

                postreduc.reverse().map((p, index) => (
                    // postreduc.map((p, index) => (
                    <div key={index} style={{ margin: 10 }} >
                        <Card {...p} />
                    </div>
                ))
            }

        </div>
    )


}

export default PostCard

