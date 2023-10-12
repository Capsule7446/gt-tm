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
	Typography,
	Radio
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

const URLGroup = [
	{
		Group: "UAT",
		Urls: [
			{ Name: "DEMO", Url: "http://demo1" },
			{ Name: "DEMO2", Url: "http://demo2" },
		]
	}
]

export const MyDialog = (prop) => {
	const [selectedValue, setSelectedValue] = React.useState(URLGroup[0].group + URLGroup[0].Urls[0].Name);
	const handleChange = (event) => {
		setSelectedValue(event.target.value);
	};
	return (
		<Dialog fullWidth={true} maxWidth={'xl'} open={prop.open} onClose={() => prop.setOpen(false)}>
			<DialogTitle>NMSL</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} >
						<MyDialogPaperStyled>
							<Grid container justifyContent="center">
								<Grid item xs={10}>
									{
										URLGroup.map(group => {
											if (group.Group == selectedValue.split('-')[0]) {
												return group.Urls.map(item => {
													if (item.Name == selectedValue.split('-')[1]) {
														return (<Typography variant="h6" gutterBottom>{item.Url}</Typography>)
													} else {
														return <></>
													}
												})
											} else {
												return <></>
											}
										})
									}
								</Grid>
							</Grid>
							<Grid container justifyContent="center">
								{
									URLGroup.map(group => {
										return (<Grid item xs={4}>
											{group.Urls.map(item => {
												return (<Radio onChange={handleChange} name="radio-buttons"
													checked={selectedValue === group.Group + '-' + item.Name} value={group.Group + '-' + item.Name}
													inputProps={{ 'aria-label': item.Url }} />)
											})}
										</Grid>)
									})
								}
							</Grid>
						</MyDialogPaperStyled>
					</Grid>
					<Grid item xs={6}>
						<MyDialogPaperStyled>
							<Typography variant="h5" component="h5">Request Data</Typography>
							<hr />
							<MyReactJson data={prop.rqData} />
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
				<Button onClick={() => prop.setOpen(false)}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}