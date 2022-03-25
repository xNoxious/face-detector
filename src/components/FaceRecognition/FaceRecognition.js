import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
var arr = Object.values(boxes); // convert boxes object to array 

    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
                <div>
                {arr.map((box) => {     
                    return (<div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>) 
                 })}
                 </div>
            </div>
        </div>
    )
}

export default FaceRecognition;