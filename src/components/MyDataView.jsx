import ReactJson from 'react-json-view'
import * as React from 'react';


export const MyDataView = (prop) => {
    const xml = "XML"
    const json = "JSON"
    const unk = "Unknown"
    const determineDataType = (parameter) => {
        try {
            const jsonData = JSON.parse(parameter);
            return json;
        } catch (jsonError) {
            try {
                const parser = new DOMParser();
                const xmlData = parser.parseFromString(parameter, 'application/xml');
                if (xmlData.getElementsByTagName('parsererror').length === 0) {
                    return xml;
                }
            } catch (xmlError) {
                // 参数既不是 JSON 也不是 XML
            }
        }
        return unk;
    }
    return (<>
        {determineDataType(prop.data) == json ? (
            <ReactJson
                src={prop.data}
                displayDataTypes={false} iconStyle={"square"} displayObjectSize={false}
                collapseStringsAfterLength={false} collapsed={2}
                enableClipboard={(copy) => navigator.clipboard.writeText(JSON.stringify(copy.src))} />
        ) : <></>}
        {determineDataType(prop.data) == xml ? <XMLViewer xml={prop.data} /> : <></>}
    </>)
}