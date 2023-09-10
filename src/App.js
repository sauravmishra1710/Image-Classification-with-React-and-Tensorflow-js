import './App.css';
import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [classificationResults, setResults] = useState([])

    const imageRef = useRef()
    const fileInputRef = useRef()

    function toggleResultHolderDisplay(hideResultsFrame) {
      const resultsHolderFrame = document.getElementsByClassName('resultsHolder')[0];
      if (!resultsHolderFrame) return;

      if (hideResultsFrame) {
        resultsHolderFrame.style.display = 'none';
      }
      else {
        resultsHolderFrame.style.display = 'block';
      }
    }

    const loadModel = async () => {
        setIsModelLoading(true)
        try {
            const model = await mobilenet.load({ version: 2,
              alpha: 1.0 });
            setModel(model);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
    }

    const uploadImage = (e) => {
      toggleResultHolderDisplay(true);
        const { files } = e.target
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0])
            setImageURL(url)
        } else {
            // cancel open file dialog
            setImageURL(null)
          }
    }

    // Predict the probable classes of the image
    const classifyImage = async () => {
        const classificationResults = await model.classify(imageRef.current)
        setResults(classificationResults)
        toggleResultHolderDisplay(false);
    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
        loadModel()
    }, [])

    if (isModelLoading) {
        return (<h1 className="modelloading">Loading Mobilenet Model...</h1>)
    }

    return (
        <div className="App">
            <h1 className='header'>Image Identification</h1>
            <div className='inputHolder'>
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                {imageURL && <button className='button' onClick={classifyImage}>Identify Image</button>}
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Image Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {classificationResults.length > 0 && <div className='resultsHolder'>
                        {classificationResults.map((result, index) => {
                            return (
                                <div className='result' key={result.className}>
                                    <span className='name'>{result.className}</span>
                                    <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default App;
