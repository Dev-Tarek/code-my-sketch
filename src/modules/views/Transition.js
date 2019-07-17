import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const style = theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(43deg, gray, rgba(255,255,255,0.8))',
    },
    text: {
        marginTop: theme.spacing(5),
        '&:after': {
            content: "'.'",
            animation: 'ellipsis 1.5s infinite',
            textAlign: 'left',
        },
    }
});


function TransitionScreen(props){
    const { classes } = props;

    if(props.transition)
    setTimeout(() => {
        if(props.transitionDir==='home')
            props.viewHandler('home')
        else props.viewHandler('editor')
    }, 3000)
    
    return <div className={classes.root}>
        <CircularProgress style={{width: '100px', height: '100px'}} />
        <Typography className={classes.text} variant="h6">{props.loadingText}</Typography>
    </div>
}

export default withStyles(style)(TransitionScreen);