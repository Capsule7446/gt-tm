import ReactJson from 'react-json-view'
import * as React from 'react';
import {useEffect, useState} from 'react';
import XMLViewer from "react-xml-viewer";


/**
 * 资料显示视图
 *
 * @param prop 资料
 * @returns {Element}
 * @constructor
 */
export const MyDataView = (prop) => {
	const xml = "XML"
	const json = "JSON"
	const unk = "Unknown"
	const [type, setType] = useState(unk)
	const [jsonData, setJsonData] = useState({})
	const [xmlData, setXmlData] = useState()
	const determineDataType = (parameter) => {
		console.log(parameter)
		let type = json
		try {
			const jsonData = JSON.parse(parameter);
			setJsonData(jsonData)
		} catch (jsonError) {
			type = unk
		}
		try {
			if (type === unk) {
				const parser = new DOMParser();
				const xmlData = parser.parseFromString(parameter, 'application/xml');
				if (xmlData.getElementsByTagName('parsererror').length === 0) {
					type = xml
					setXmlData(xmlData)
				}
			}
		} catch (xmlError) {
			type = unk
		}
		if (type === unk) {
			type = json
			setJsonData({
				"MyDataView": {
					"错误讯息": "解析资料错误，非JSON和XML格式"
				}
			})
		}
		console.log(type);
		return type;
	}

	useEffect(() => {
		setType(determineDataType(prop.data))
	}, [prop.data]);
	return (<>
		{type === json ? (
				<ReactJson
						src={jsonData}
						displayDataTypes={false} iconStyle={"square"} displayObjectSize={false}
						collapseStringsAfterLength={false} collapsed={2}
						enableClipboard={(copy) => navigator.clipboard.writeText(JSON.stringify(copy.src))}/>
		) : <></>}
		{type === xml ? <XMLViewer xml={xmlData}/> : <></>}
	</>)
}