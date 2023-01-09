import React, { useMemo, useState } from 'react'
import PostFilter from './components/PostFilter'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyModal from './components/UI/modal/MyModal'
import './styles/App.css'

// rfce - reactFunctionalComponentExport

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'HTML', body: 'HyperText Markup Language' },
		{ id: 2, title: 'CSS', body: 'This is Cascading Style Sheets' },
		{ id: 3, title: 'JavaScript', body: 'Programming Language' },
	])

	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)

	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) =>
				a[filter.sort].localeCompare(b[filter.sort])
			)
		}
		return posts
	}, [filter.sort, posts])

	const sortedAndSelectPosts = useMemo(() => {
		return sortedPosts.filter(post =>
			post.title.toLowerCase().includes(filter.query.toLowerCase())
		)
	}, [filter.query, sortedPosts])

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	// Получаем post из дочернего компонента
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	console.log('Ok, its working@!!')

	return (
		<div className='App'>
		<MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
			Create user
		</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			{/* TimeCode 1:26 */}

			<PostFilter filter={filter} setFilter={setFilter} />
			<PostList
				remove={removePost}
				posts={sortedAndSelectPosts}
				title='Posts'
			/>
		</div>
	)
}

export default App
