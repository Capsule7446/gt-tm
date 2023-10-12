import { useEffect } from 'react';
import './App.css'
import { MyDialog } from "./components/MyDialog.jsx";
import { findBindingNode } from './toolkit';
import { useState } from 'react';

function App() {
	const [open, setOpen] = useState(false)
	const [rqData, setRqData] = useState({})
	useEffect(() => {
		const nodes = findBindingNode()
		nodes.forEach(item => {
			//TODO: create button
			const btn = document.createElement('button')
			// btn
			btn.onclick = () => {
				setOpen(true)
				setRqData({ "demo": "demo" })
			}
			item.appendChild(btn)
			//TODO: append button
		})
	}, [])
	return <MyDialog open={open} setOpen={setOpen} rqData={rqData} />
}

export default App