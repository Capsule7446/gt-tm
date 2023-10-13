import { useEffect } from 'react';
import './App.css'
import { findBindingNode } from './utility/index.js';
import { useState } from 'react';
import { XMLMockData, jsonMockData, jsonMockData2 } from "./data/index.js";
import { GrayLogBTN2 } from './toolkit';

function App() {
	const [open, setOpen] = useState(false)
	const [rqData, setRqData] = useState('')
	const data = [XMLMockData, jsonMockData, jsonMockData2]
	useEffect(() => {
		const nodes = findBindingNode()
		nodes.forEach((item, index) => {
			//TODO: create button
			const btn = document.createElement('button')
			btn.innerText = 'demo'
			// btn
			btn.onclick = () => {
				setOpen(true)
				setRqData(data[index])
			}
			//TODO: append button
			item.appendChild(btn)
		})
	}, [])
	return <GrayLogBTN2 open={open} setOpen={setOpen} rqData={rqData} />
}

export default App