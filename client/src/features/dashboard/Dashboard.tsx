import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { store } from '../../app/store';
import {
  advicesStateArray,
  initialLoadItems,
  likeAction
} from './dashboardSlice';
import {
  changeRole,
  loggedUser,
} from '../login/loginSlice';
import styles from './Dashboard.module.css';
import '../../App.css'

interface IAdvice {
  id: number,
  name: string,
  location: string
  category: string
  likes: number
}

interface User {
  id: number,
  email: string,
  role: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '1vw',
    },
  }),
);

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const advicesSelector = useSelector(advicesStateArray);
  const loggedUserSelector = useSelector(loggedUser);
  const { history } = useReactRouter()
  const classes = useStyles();

  useEffect(() => {
    !store.getState() && dispatch(initialLoadItems());
    !loggedUserSelector &&  history.push('/login');
  }, [])

  const likeFunction= (advice: IAdvice, user: User) => {
    dispatch(likeAction(advice));
    dispatch(changeRole(user))
  };

  let user = loggedUserSelector;

  const Item = (advice: IAdvice) => (
    <React.Fragment>
        <Grid item xs={12} sm={4}>
          <div className="advice-item">
            <Paper className={classes.paper}>
              <b>Title</b>
              <p>{advice.name}</p>
              <b>Location</b>
              <p>{advice.location}</p>
              <b>Category</b>
              <p>{advice.category}</p>
              <p><span><b>Likes: </b></span>{advice.likes}</p>
              <i className="fa fa-thumbs-o-up" onClick={() => likeFunction(advice, user)}></i>
            </Paper>
          </div>
        </Grid>
      </React.Fragment>
  )
  
  const adviceList = advicesSelector.advices.map((advice: IAdvice) =>
      <Item
        id={advice.id}
        name={advice.name}
        location={advice.location}
        category={advice.category}
        likes={advice.likes}
        key={advice.id}
      />
  )

  return (
    <div>
      <div id="res"></div>
      <div className="flex-wrapper advice-list">
        {adviceList}
      </div>
    </div>
  )
}
  