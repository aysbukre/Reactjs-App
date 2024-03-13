import React, { useEffect, useRef, useState } from "react";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import { PostWithAuth, RefreshToken } from "../../services/HttpService";


function CommentForm(props) {
    const { postId,  userId, userName ,setCommentRefresh} = props;
    const [text,setText]=useState("");

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        //History.go(0)
      }

    const saveComment = () => {
        PostWithAuth("/comments",{
            postId: postId, 
            userId : userId,
            text : text,
          })
          .then((res) => {
            if(!res.ok) {
                RefreshToken()
                .then((res) => { if(!res.ok) {
                    logout();
                } else {
                   return res.json()
                }})
                .then((result) => {
                    console.log(result)

                    if(result != undefined){
                        localStorage.setItem("tokenKey",result.accessToken);
                        saveComment();
                        setCommentRefresh();
                    }})
                .catch((err) => {
                    console.log(err)
                })
            } else 
            res.json()
        })
          .catch((err) => {
            console.log(err)
          })
    }

    const handleSumbit = () =>{
        saveComment();
        setText("");
        setCommentRefresh();

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