import React from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import SelectButton from '../layouts/FileSelectButton';
import SendButton from '../layouts/IconButton';
import Loading from '../layouts/LinearProgress';
import { Button } from '@material-ui/core';

const style = theme => ({
    root: {
        paddingTop: theme.spacing(12),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(12),
        paddingLeft: theme.spacing(2),
    },
    clearButton: {
        cursor: 'pointer',
        color: 'red',
    },
    fileName: {
        color: 'blue',
    },
    buttonsDiv: {
        width: 'fit-content',
        margin: 'auto',
    },
    fileInfo: {
        textAlign: 'center',
    },
    uploadStatus: {
        textAlign: 'center',
    }
});

function UploadComponent(props){
    const { classes } = props;
    return <React.Fragment>
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom align="center">
                {props.helpText}
            </Typography>
            <div className={classes.buttonsDiv}>
                <SelectButton label='Select' inputHandle={props.selectHandler} />
                <SendButton label='Send' handler={() => props.uploadHandler(false)} disabled={(props.file === '' || props.loaded > 0)} />
            </div>
            {props.file?
                <p className={classes.fileInfo}>
                    <i>Selected: <span className={classes.fileName}>{props.file.name}</span> </i>
                    <b className={classes.clearButton} onClick={props.clearHandler}>X</b>
                </p> : null
            }
            {props.loaded === 100? 
                <div className={classes.buttonsDiv}>
                    <Button color="primary" variant="outlined"> Continue </Button>
                </div> : null
            }
        </div>
        <p className={classes.uploadStatus}>
            <i>
                {props.loaded === 100? 'Uploading complete.' : props.loaded? 'Uploading: ' + props.loaded + '%' : null }
            </i>
        </p>
        {props.loaded? <Loading value={props.loaded} /> : null}
    </React.Fragment>
}

export default withStyles(style)(UploadComponent);