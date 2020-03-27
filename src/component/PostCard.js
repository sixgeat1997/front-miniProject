import React, { useEffect } from 'react'
import PostFrom from './PostFrom'
import { allAction } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import Cards from './Cards'

const PostCard = () => {

    const postreduc = useSelector(state => state.postreduc)
    const Allaction = bindActionCreators(allAction, useDispatch())
    const loadding = useSelector(state => state.loadding)

    console.log(postreduc.length);

    useEffect(() => {
        Allaction.getPost()
    }, [])

    const post = () => {
        let cookie = localStorage.getItem('data')
        cookie = cookie.split('-')

        if ((+cookie[0] == 5935512038) || (+cookie[0] == 5935512030)) {
            return (
                <div>
                    <PostFrom />
                </div>
            )
        }
    }
    console.log(postreduc);
    if (loadding) {
        return (<div>loadding</div>)
    }
    else {
        return (
            <div  >
                <div>

                    {post()}
                    {

                        postreduc.length != 0 && postreduc.map((p, index) => (
                            // postreduc.map((p, index) => (
                            <div key={index} style={{ margin: 10 }} >
                                <Cards {...p} />

                            </div>
                        ))
                    }

                </div>
            </div>
        )

    }
}

export default PostCard

