import React, { useState, useEffect } from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'

import Form from './components/Form'
import DevItem from './components/DevItem'


function App() {

	const [devs, setDevs] = useState([])

	useEffect(() => {
		getDevsFromApi()
		async function getDevsFromApi() {
			const response = await api.get('/devs')
			setDevs(response.data)
		}
	}, [])

	async function handleAddDev(data) {
		const response = await api.post('/devs', data)

		setDevs([...devs, response.data])

	}

	return (

		<div id="app">

			<aside>

				<strong>Cadastrar</strong>
				<Form onSubmit={handleAddDev} />

			</aside>

			<main>

				<ul>
					{devs.map(dev => (
						<DevItem key={dev._id} dev={dev} />
					))}
				</ul>

			</main>

		</div>

	);
}

export default App;

