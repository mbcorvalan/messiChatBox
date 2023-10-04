import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext'

export const SideBar = () => {
	const { setMessage, setValue, setCurrentTitle, prevChats } =
		useContext(ChatContext)

	const uniqueTitles = Array.from(
		new Set(prevChats.map((prevChats) => prevChats.title))
	)

	const createNewChat = () => {
		setMessage(null)
		setValue('')
		setCurrentTitle(null)
	}

	const handleClick = (title) => {
		setCurrentTitle(title)
		setMessage(null)
		setValue('')
	}

	return (
		<section className='sidebar'>
			<button onClick={createNewChat} className='sidebar__new-chat'>
				New Chat
			</button>
			<ul className='sidebar__history'>
				{uniqueTitles.map((title, index) => (
					<li
						key={index}
						onClick={() => handleClick(title)}
						className='sidebar__history-item'
					>
						{title}
					</li>
				))}
			</ul>
			<nav className='sidebar__nav'>Made by B.C.A with ❤️</nav>
		</section>
	)
}
