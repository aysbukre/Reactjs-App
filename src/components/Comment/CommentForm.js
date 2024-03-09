import React, { useEffect, useRef, useState } from "react";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";


function CommentForm(props) {
    const { postId,  userId, userName } = props;
    const [text,setText]=useState("");

    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : localStorage.getItem("tokenKey")
                },
                body: JSON.stringify({
                    postId:postId,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSumbit = () =>{
        saveComment();
        setText("");

    }
    const handleChange = (value)=>{
        setText(value);
    }
    

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent : "flex-start",
            alignItems : "center",
        }}>
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none" }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName[0].toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            onClick={handleSumbit}
                        >Comment</Button>
                    </InputAdornment>}
                value={text}
                style={{ color: "black", backgroundColor: 'white' }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;