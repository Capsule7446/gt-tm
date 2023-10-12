import { useEffect } from 'react';
import './App.css'
import { MyDialog } from "./components/MyDialog.jsx";
import { findBindingNode } from './utility/index.js';
import { useState } from 'react';
import {jsonMockData} from "./data/index.js";

function App() {
	const [open, setOpen] = useState(false)
	const [rqData, setRqData] = useState({})
	useEffect(() => {
		const nodes = findBindingNode()
		nodes.forEach(item => {
			//TODO: create button
			const btn = document.createElement('button')
			btn.innerText = 'demo'
			// btn
			btn.onclick = () => {
				setOpen(true)
				setRqData(jsonMockData)
			}
			//TODO: append button
			item.appendChild(btn)
		})
	}, [])
	return <MyDialog open={open} setOpen={setOpen} rqData={rqData} />
}

export default App