import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import {
  loggedUser,
  logOutUser
} from '../login/loginSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function Header() {
  const dispatch = useDispatch();
  const loggedUserSelector = useSelector(loggedUser);
  const { history } = useReactRouter()
  const classes = useStyles();

  function onLogout() {
    dispatch(logOutUser())
  };

  return (
    <div className="App-header">
      {(loggedUserSelector.email !== "") ? (
        <div className={classes.root} style={{ width: '95%' }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start" style={{ alignContent: "center" }}>
                <span>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <HomeIcon style={{ color: 'white', transform: "scale(1)" }} />
                  </Link>
                </span>
                {loggedUserSelector.role !== "USER_BEGINNER" && (
                  <span>
                    <Link to="/add-new" style={{ color: 'white', textDecoration: 'none' }}>
                      Add new advice
                    </Link>
                  </span>)}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <span onClick={onLogout}>
                  <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                    logOutUser
                  </Link>
                </span>
              </Box>
            </Grid>
          </Grid>
        </div>
      ) : (
          <div>
            <span>
              <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>SignUp</Link>
            </span>
            <span>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
            </span>
          </div>
        )}
    </div>
  );
}
