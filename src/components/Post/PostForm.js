import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "@emotion/styled";
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import { Button, Input, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
}));

function PostForm(props) {
    const { userId, userName, refreshPosts } = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);
    
    const savePost = () => {
        fetch("/posts",

            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : localStorage.getItem("tokenKey")
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSumbit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        setTitle(value)
        setIsSent(false);

    }

    const handleText = (value) => {
        setText(value)
        setIsSent(false);

    }

    const handleClose =(event,reason) => {
        if(reason==='clickaway'){
            return;
        }
        setIsSent(false);
    }
    return (
        <div>
            <Snackbar open ={isSent} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity="success">Your Post is Sended.</Alert>
            </Snackbar>
            

            <Card sx={{ width: 800, margin: 5 }}>
                <CardHeader
                    avatar={
                        <Link color="inherit" component={Link} to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none" }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName[0].toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adorment-amount"
                        multiline
                        placeholder="title"
                        InputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}

                    >

                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adorment-amount"
                            multiline
                            placeholder="text"
                            InputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}

                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        onClick={handleSumbit}
                                    >Post</Button>
                                </InputAdornment>}
                        >

                        </OutlinedInput>
                    </Typography>
                </CardContent>

            </Card>
        </div>

    )
}

export default PostForm;
