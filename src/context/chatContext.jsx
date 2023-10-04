import React, { createContext, useState } from 'react'

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
	const [value, setValue] = useState('')
	const [message, setMessage] = useState('')
	const [prevChats, setPreChats] = useState([])
	const [currentTitle, setCurrentTitle] = useState('')

	return (
		<ChatContext.Provider
			value={{
				value,
				setValue,
				message,
				setMessage,
				prevChats,
				setPreChats,
				currentTitle,
				setCurrentTitle,
			}}
		>
			{children}
		</ChatContext.Provider>
	)
}
