import ReactJson from 'react-json-view'
import * as React from 'react';

export const MyReactJson = (prop) => {
    return (<ReactJson
        src={prop.data}
        displayDataTypes={false} iconStyle={"square"} displayObjectSize={false}
        collapseStringsAfterLength={false} collapsed={2}
        enableClipboard={(copy) => navigator.clipboard.writeText(JSON.stringify(copy.src))} />)
}