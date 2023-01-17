import React from 'react'
import PostItem from './PostItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const PostList = ({ posts, title, remove }) => {
	if (!posts.length) {
		return <h1 style={{ textAling: 'center' }}>Posts is not defined</h1>
	}

	return (
		<div>
			<h1 style={{ textAling: 'center' }}>{title}</h1>
			<TransitionGroup>
				{posts.map((post, index) => (
					<CSSTransition key={post.id} timeout={500} className='post'>
						<PostItem remove={remove} number={index + 1} post={post} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	)
}
export default PostList
