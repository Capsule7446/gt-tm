import * as React from 'react';
import {useState} from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Radio,
	RadioGroup,
	styled,
	Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {MyDataView} from './MyDataView';
import {URLGroup} from '../data';
import {GM_xmlhttpRequest} from '$';

const MyDialogPaperStyled = styled(Paper)(({theme}) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.button,
	textAlign: 'left',
	color: theme.palette.text.secondary,
	padding: theme.spacing(1),
}));

export const MyDialog = (prop) => {
	const [groupIndex, setGroupIndex] = React.useState(0)
	const [itemIndex, setItemIndex] = React.useState(0)
	const [url, setUrl] = React.useState('')
	const [rsData, setRsData] = useState('')
	const handleChange = (groupI, itemI) => {
		setGroupIndex(groupI)
		setItemIndex(itemI)
		setUrl(URLGroup[groupI].Urls[itemI].Url)
	};

	const textChange = (e) => {
		setUrl(e.target.value)
	}

	const PostAPI = () => {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
			},
			data: prop.rqData,
			onload: function (response) {
				if (response.status === 200) {
					setRsData(response.responseText)
				} else {
					console.error('Request failed with status:', response.status);
				}
			},
			onerror: function (error) {
				console.error('Request error:', error);
			}
		});
	}
	return (
			<Dialog fullWidth={true} maxWidth={'xl'} open={prop.open} onClose={() => prop.setOpen(false)}>
				<DialogTitle>ReSend</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Grid container justifyContent="center">
								<Grid item xs={9}>
									<Paper
											component="form"
											sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
									>
										<InputBase
												sx={{ml: 1, flex: 1}}
												inputProps={{'aria-label': 'search google maps'}}
												onChange={textChange}
												value={url}
										/>
										<Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
										<IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={() => {
											console.log('send')
										}}>
											<SendIcon/>
										</IconButton>
									</Paper>
								</Grid>
							</Grid>
							<br/>
							<Grid container justifyContent={'center'}>
								{
									URLGroup.map((group, groupI) => {
										return (<Grid item>
											<MyDialogPaperStyled>
												<FormControl>
													<FormLabel id={`radio-buttons-group-label-${group.Group}`}>{group.Group}</FormLabel>
													<RadioGroup row aria-labelledby="radio-buttons-group-label" name="radio-buttons-group">
														{group.Urls.map((item, itemI) => {
															return (
																	<FormControlLabel value={groupI + '-' + itemI}
																	                  control={<Radio
																			                  onChange={() => handleChange(groupI, itemI)}
																			                  name="radio-buttons"/>}
																	                  label={item.Name}/>
															)
														})}
													</RadioGroup>
												</FormControl>
											</MyDialogPaperStyled>
										</Grid>)
									})
								}
							</Grid>

						</Grid>
						<Grid item xs={6}>
							<MyDialogPaperStyled>
								<Typography variant="h5" component="h5">Request Data</Typography>
								<hr/>
								<MyDataView data={JSON.stringify(prop.rqData)}/>
							</MyDialogPaperStyled>
						</Grid>
						<Grid item xs={6}>
							<MyDialogPaperStyled>
								<Typography variant="h5" component="h5">Response Data</Typography>
								<hr/>
								<MyDataView data={rsData}/>
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