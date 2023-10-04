import React, { useEffect, useContext } from 'react'
import messi from '../assets/messi.webp'
import user from '../assets/user.png'
import ball from '../assets/ball.png'
import { ChatContext } from '../context/chatContext'

export const MainBar = () => {
	const {
		value,
		setValue,
		message,
		setMessage,
		prevChats,
		setPreChats,
		currentTitle,
		setCurrentTitle,
	} = useContext(ChatContext)
	const getMessages = async () => {
		const options = {
			method: 'POST',
			body: JSON.stringify({
				message: value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			const res = await fetch('http://localhost:8000/completions', options)
			const data = await res.json()
			setMessage(data?.choices[0].message)
			setTimeout(() => {
				setValue('')
			}, 1000)
		} catch (e) {
			console.error(e)
		}
	}
	const currentChat = prevChats.filter(
		(prevChat) => prevChat.title === currentTitle
	)

	useEffect(() => {
		if (!currentTitle && value && message) {
			setCurrentTitle(value)
		}
		if (currentTitle && value && message) {
			setPreChats((prevChats) => [
				...prevChats,
				{ title: currentTitle, role: 'user', message: value },
				{ title: currentTitle, role: message.role, content: message.content },
			])
		}
	}, [message, currentTitle])

	const roleImages = {
		assistant: {
			src: messi,
			alt: 'Messi',
		},
		user: {
			src: user,
			alt: 'User',
		},
	}

	return (
		<section className='mainBar'>
			{!currentTitle && <h1 className='mainBar__title'>Title</h1>}
			<ul className='mainBar__feed'>
				{currentChat?.map((chat, index) => {
					const image = roleImages[chat.role]

					return (
						<li
							key={index}
							className={`mainBar__feed-item ${
								chat.role === 'assistant' ? 'mainBar__feed-item--assistant' : ''
							}`}
						>
							<img src={image.src} className='mainBar__role' alt={image.alt} />
							<p className='mainBar__message'>{chat.content || chat.message}</p>
						</li>
					)
				})}
			</ul>
			<div className='mainBar_bottom-section'>
				<div className='input-container'>
					<input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						type='text'
						placeholder='Type a message'
					/>
					<button onClick={getMessages} id='submit'>
						<img src={ball} className='mainBar__role' alt='submit' />
					</button>
				</div>
				<p className='info'>
					ChatGPT may produce inaccurate information about people, places, or
					facts.
				</p>
			</div>
		</section>
	)
}
