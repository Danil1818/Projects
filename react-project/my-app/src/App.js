import React, { useState, useEffect } from 'react'
import { usePosts } from './hooks/usePosts'
import axios from 'axios'
import './styles/App.css'
import PostService from './API/PostService'
import PostFilter from './components/PostFilter'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyModal from './components/UI/modal/MyModal'
import MyLoader from './components/UI/loader/MyLoader'
import { useFetching } from './hooks/useFetching'

// rfce - reactFunctionalComponentExport

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
	const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
		const posts = await PostService.getAll()
		setPosts(posts)
	})

	useEffect(() => {
		fetchPosts()
	}, [])

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	// Получаем post из дочернего компонента
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className='App'>
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Create user
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<PostFilter filter={filter} setFilter={setFilter} />
			{postError &&
				<h1>Sorry is Error ${postError}</h1>
			}
			{isPostLoading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '50px',
					}}
				>
					<MyLoader />
				</div>
			) : (
				<PostList
					remove={removePost}
					posts={sortedAndSearchPosts}
					title='Posts'
				/>
			)}
		</div>
	)
}

export default App
