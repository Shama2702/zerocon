import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';
import './Cap.css'
// import PropTypes from "prop-types";
import {
    rootUrl
} from './../../../redux'
import CloseButton from './../../../components/CloseButton';
import { Button } from 'react-bootstrap';
let stream = null;
let trialInterval = null;


const SunglassTrial = (props) => {
    const productUrl = props.img_url.replace('bg-white.jpg', 'transparent.png');
    useEffect(() => {
        const loadModel = async () => {
            console.log("load model called");
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
            ]).then(startVideo());
        }
        loadModel();
        return () => {
            try {
                stream.getTracks().forEach(track => track.stop());
                window.clearInterval(trialInterval);
            } catch (error) {
                console.log("Video can not stop", error);
            }
        }
    }, []);



    const startVideo = async () => {
        const video = document.getElementById('video-stream');
        let constraints = {
            audio: false,
            video: {
                facingMode: "user"
            }
        };
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
        } catch (error) {
            console.log("Video can not play", error);
        }
    }

    const handleVideo = () => {
        console.log('Video play handler called');
        const video = document.getElementById('video-stream');
        var canvas = document.getElementById("canvas-overlay");
        var image = document.getElementById("productOverlayImage");
        
        var positionX = 0;
        var positionY = 0;
        var zoom = 0;

        var leftBtn = document.getElementById('leftBtn');
        var rightBtn = document.getElementById('rightBtn');
        var downBtn = document.getElementById('downBtn');
        var upBtn = document.getElementById('upBtn');
        var zoomOutBtn = document.getElementById('zoomOutBtn');
        var zoomInBtn = document.getElementById('zoomInBtn');

        leftBtn.addEventListener('click', ()=> {
            positionX -= 5;
        })
        rightBtn.addEventListener('click', ()=> {
            positionX += 5;
        })
        downBtn.addEventListener('click', ()=> {
            positionY += 5;
        })
        upBtn.addEventListener('click', ()=> {
            positionY -= 5;
        })
        zoomInBtn.addEventListener('click', ()=> {
            zoom += 5;
        })
        zoomOutBtn.addEventListener('click', ()=> {
            zoom -= 5;
        })


        var displaySize = {
            width: video.offsetWidth,
            height: video.offsetHeight
        };
        faceapi.matchDimensions(canvas, displaySize);


        trialInterval = setInterval(async () => {

            console.log(positionX);

            const detectionResult = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();


            // console.log(detectionResult.length);

            if (detectionResult.length === 0) {
                return;
            }

            var canvasContext = canvas.getContext("2d");
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);

            try {
                const detections = [detectionResult[0].detection];
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                // faceapi.draw.drawFaceLandmarks(canvasContext, detectionResult);

                const box = resizedDetections[0].box;
                const imgWidth = box.width;
                const imgHeight = box.height - 10;
                const x = box.x;
                const y = box.y - imgHeight / 5;
                canvasContext.drawImage(image, x-(20+zoom/2)+positionX, y-100+positionY, imgWidth+40+zoom, imgHeight+zoom);
                // canvasContext.fillStyle = "#FF0000";
                // canvasContext.fillRect(x, y, imgWidth, imgHeight);

                // console.log(resizedDetections);
            } catch (error) {
                console.log("overlay error: ", error);
            }

        }, 100);
    }

    return (
        <div className="sunglassTrial__bg-overlay p-5">
            <div className="sunglassTrial__content m-auto bg-light rounded p-3">
                <div className="d-flex">
                    <div className="ml-auto">
                        <CloseButton action={props.toggleTrial} />
                    </div>
                </div>
                <div className="position-relative">
                    <img className="d-none" id="productOverlayImage" src={`${rootUrl}${productUrl}`} alt="Sunglass" />
                    <video id="video-stream" autoPlay playsInline onPlay={handleVideo} />
                    <canvas id="canvas-overlay"></canvas>
                </div>

                <div className="sunglassTrial__controler mt-5">
                    <div className="d-flex justify-content-center">
                        <Button className="m-1" id="zoomOutBtn" variant="secondary"><i className="fas fa-search-minus"></i></Button>
                        <Button className="m-1" id="zoomInBtn" variant="secondary"><i className="fas fa-search-plus"></i></Button>
                        <Button className="m-1" id="leftBtn" variant="secondary" ><i className="fas fa-arrow-left"></i></Button>
                        <Button className="m-1" id="rightBtn" variant="secondary" ><i className="fas fa-arrow-right"></i></Button>
                        <Button className="m-1" id="downBtn" variant="secondary"><i className="fas fa-arrow-down"></i></Button>
                        <Button className="m-1" id="upBtn" variant="secondary"><i className="fas fa-arrow-up"></i></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SunglassTrial

