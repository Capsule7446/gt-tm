import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputBase,
    InputLabel,
    ListSubheader,
    Menu,
    MenuItem,
    Paper,
    Select,
    styled,
    Typography
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SendIcon from '@mui/icons-material/Send';
import { MyDataView } from '../components'
import { URLGroup } from '../data';
import { GM_xmlhttpRequest } from '$';
import { useEffect } from 'react';

const MyDialogPaperStyled = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.button,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
}));

const MySelect = () => {
    return (<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
        <Select native defaultValue="" id="grouped-select" label="Grouping">
            {
                URLGroup.map((group, index) => {
                    return (
                        <optgroup label={group.Name}>
                            {group.Items.map((item, ii) => <option value={(index + 1) * 10 + ii}>{item.Name}</option>)}
                        </optgroup>
                    )
                })
            }
        </Select>
    </FormControl>)
}

export const GrayLogBTN2 = (prop) => {
    const [url, setUrl] = useState('')
    const [rsData, setRsData] = useState('')
    const [isRq, setIsRq] = useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value) => {
        setUrl(value)
        setAnchorEl(null);
    };

    useEffect(() => {
        setIsRq(prop.rqData.includes('TRANRQ'))
    }, [prop.rqData])
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
            <DialogTitle>{isRq ? 'ReSend' : '格式化'}</DialogTitle>
            {isRq ? <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems={'center'}>
                            <Grid item xs={6}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        onChange={textChange}
                                        value={url}
                                    />
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <ListIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {
                                            URLGroup.map((group, index) => {
                                                return (
                                                    <>
                                                        <ListSubheader>{group.Name}</ListSubheader>
                                                        {group.Items.map((item, ii) =>
                                                            <MenuItem key={index * 10 + ii} onClick={() => handleSelect(item.Url)}>
                                                                {item.Name}
                                                            </MenuItem>
                                                        )}
                                                    </>
                                                )
                                            })
                                        }

                                    </Menu>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={PostAPI}>
                                        <SendIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={6}>
                        <MyDialogPaperStyled>
                            <Typography variant="h5" component="h5">Request Data</Typography>
                            <hr />
                            <MyDataView data={prop.rqData} />
                        </MyDialogPaperStyled>
                    </Grid>
                    <Grid item xs={6}>
                        <MyDialogPaperStyled>
                            <Typography variant="h5" component="h5">Response Data</Typography>
                            <hr />
                            <MyDataView data={rsData} />
                        </MyDialogPaperStyled>
                    </Grid>
                </Grid>
            </DialogContent> : <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MyDialogPaperStyled>
                            <MyDataView data={prop.rqData} />
                        </MyDialogPaperStyled>
                    </Grid></Grid></DialogContent>}
            <DialogActions>
                <Button onClick={() => prop.setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}