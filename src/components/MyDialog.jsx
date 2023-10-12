import * as React from 'react';
import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Paper,
	styled,
	Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MyReactJson } from './MyReactJson';

const jsonMockData = {
	"string": "this is jsonMockData test string",
	"integer": 42,
	"array": [
		1,
		2,
		3,
		"test",
		null
	],
	"float": 3.14159,
	"object": {
		"first-child": true,
		"second-child": false,
		"last-child": null
	},
	"string_number": "1234",
	"date": "2023-10-07T07:24:14.537Z"
}

const MyDialogPaperStyled = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.button,
	textAlign: 'left',
	color: theme.palette.text.secondary,
	padding: theme.spacing(1),
}));



export const MyDialog = () => {
	const [open, setOpen] = useState(true)
	return (<Dialog fullWidth={true} maxWidth={'xl'} open={open} onClose={() => setOpen(false)}>
		<DialogTitle>電文【】</DialogTitle>
		<DialogContent>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<MyDialogPaperStyled>

					</MyDialogPaperStyled>
				</Grid>
				<Grid item xs={6}>
					<MyDialogPaperStyled>
						<Typography variant="h5" component="h5">Request Data</Typography>
						<hr />
						<MyReactJson data={jsonMockData} />
					</MyDialogPaperStyled>
				</Grid>
				<Grid item xs={6}>
					<MyDialogPaperStyled>
						<Typography variant="h5" component="h5">Response Data</Typography>
						<hr />
						<MyReactJson data={jsonMockData} />
					</MyDialogPaperStyled>
				</Grid>
				<Grid item xs={12}>
					<MyDialogPaperStyled style={{ display: "flex", justifyContent: "center" }}>
						<Button variant="contained" endIcon={<SendIcon />}>Send</Button>
					</MyDialogPaperStyled>
				</Grid>
			</Grid>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => setOpen(false)}>Close</Button>
		</DialogActions>
	</Dialog>)
}