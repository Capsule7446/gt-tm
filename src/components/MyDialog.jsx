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
	Radio,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	TextField
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
	const [groupIndex, setGroupIndex] = React.useState(0)
	const [itemIndex, setItemIndex] = React.useState(0)
	const [url, setUrl] = React.useState('')
	const handleChange = (groupI, itemI) => {
		setGroupIndex(groupI)
		setItemIndex(itemI)
		setUrl(URLGroup[groupI].Urls[itemI].Url)
	};
	const textChange = (e) =>{
		setUrl(e.target.value)
	}
	return (
		<Dialog fullWidth={true} maxWidth={'xl'} open={prop.open} onClose={() => prop.setOpen(false)}>
			<DialogTitle>NMSL</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} >
						<MyDialogPaperStyled>
							<Grid container justifyContent="center">
								<Grid item>
									<TextField
										id="standard-multiline-flexible"
										multiline
										value={url}
										onChange={textChange}
										variant="standard" />
								</Grid>
								<Grid item xs={2}>
									<MyDialogPaperStyled style={{ display: "flex", justifyContent: "center" }}>
										<Button variant="contained" endIcon={<SendIcon />}>Send</Button>
									</MyDialogPaperStyled>
								</Grid>
							</Grid>
							<Grid container justifyContent="center">
								{
									URLGroup.map((group, groupI) => {
										return (<>
											<Grid item>
												<FormControl>
													<FormLabel id={`radio-buttons-group-label-${group.Group}`}>{group.Group}</FormLabel>
													<RadioGroup row aria-labelledby="radio-buttons-group-label" name="radio-buttons-group" >
														{group.Urls.map((item, itemI) => {
															return (
																<FormControlLabel value={groupI+'-'+itemI}
																	control={<Radio
																		onChange={() => handleChange(groupI, itemI)}
																		name="radio-buttons" />}
																	label={item.Name} />
															)
														})}
													</RadioGroup>
												</FormControl>
											</Grid>
										</>)
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
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => prop.setOpen(false)}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}