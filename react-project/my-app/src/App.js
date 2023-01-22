import React, { useState } from 'react'
import axios from 'axios'
import PostFilter from './components/PostFilter'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyModal from './components/UI/modal/MyModal'
import './styles/App.css'
import { usePosts } from './hooks/usePosts'

// rfce - reactFunctionalComponentExport

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	async function fetchPosts() {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/posts'
		)
		setPosts(response.data)
	}

	// Получаем post из дочернего компонента
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className='App'>
			<button onClick={fetchPosts}>Get Posts</button>
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Create user
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<PostFilter filter={filter} setFilter={setFilter} />
			<PostList
				remove={removePost}
				posts={sortedAndSearchPosts}
				title='Posts'
			/>
		</div>
	)
}

export default App
