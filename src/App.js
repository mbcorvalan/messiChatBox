import './App.scss'
import { SideBar } from './components/SideBar'
import { MainBar } from './components/MainBar'
import { ChatProvider } from './context/chatContext'

const App = () => {
	return (
		<div className='app'>
			<ChatProvider>
				<SideBar />
				<MainBar />
			</ChatProvider>
		</div>
	)
}

export default App
