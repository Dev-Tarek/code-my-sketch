import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw"

import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";


const canvasToImage = (canvas, backgroundColor) => {

    let w = canvas.width;
    let h = canvas.height;
    let context = canvas.getContext('2d');
    let data = context.getImageData(0, 0, w, h);

    //store the current globalCompositeOperation
    let compositeOperation = context.globalCompositeOperation;
    //set to draw behind current content
    context.globalCompositeOperation = "destination-over";

    //set background color
    context.fillStyle = backgroundColor;
    //draw background / rect on entire canvas
    context.fillRect(0,0,w,h);

    //get the image data from the canvas
    let imageData = canvas.toDataURL("image/png");

    //clear the canvas
    context.clearRect (0,0,w,h);

    //restore it with original / cached ImageData
    context.putImageData(data, 0,0);        

    //reset the globalCompositeOperation to what it was
    context.globalCompositeOperation = compositeOperation;

    //return the Base64 encoded data url string
    return imageData;
}

const style = theme => ({
    root: {
        width: 'fit-content',
        margin: 'auto',
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    canvas: {
        border: '1px solid black',
        width: 'fit-content',
        margin: 'auto',
    }
});

class Sketcher extends Component {
    state = {
        color: "black",
        brushRadius: 0.5,
        lazyRadius: 10,
        canvasHeight: 600,
    };

    componentDidMount = () => {
        const canvas = document.getElementById('canvasContainer').firstChild;
        const drawingLayer = canvas.childNodes[1];
        this.setState({
            drawingLayer: drawingLayer,
        });
    }

    downloadImage = () => {
        const img = canvasToImage(this.state.drawingLayer, 'white')
        let link = document.createElement('a');
        link.download = 'Sketch.jpg';
        link.href = img;
        console.log(link)
        link.click();
    }
    
    toggleLazyBrush = () => {
        const lazy = this.state.lazyRadius;
        this.setState({
            lazyRadius: lazy? 0 : 10,
        })
    }

    render() {
        const { classes } = this.props;
        const height = 0.7 * window.outerHeight;
        return (
            <div className={classes.root}>
                <div className={classes.canvas} id="canvasContainer" >
                    <CanvasDraw
                        ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                        brushColor={this.state.color}
                        brushRadius={this.state.brushRadius}
                        lazyRadius={this.state.lazyRadius}
                        canvasWidth={height * 1440 / 2000}
                        canvasHeight={height}
                        backgroundColor="rgba(255,255,255)"
                    />
                </div>
                <div>
                    <Button color="secondary" onClick={() => {this.saveableCanvas.clear();}}>Clear</Button>
                    <Button onClick={() => {this.saveableCanvas.undo();}}>Undo</Button>
                    <Button onClick={this.toggleLazyBrush}>Lazy Brush</Button>
                    <Button onClick={this.downloadImage}>Download</Button>
                    <Button color="primary" onClick={() => this.props.convertHandler(canvasToImage(this.state.drawingLayer, 'white'))}>
                        Convert
                    </Button>
                </div>
            </div>
    )}
}

export default withStyles(style)(Sketcher);