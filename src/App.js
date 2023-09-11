import './App.css';
import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import CircularProgress from "@mui/material/CircularProgress"; // refer: https://mui.com/material-ui/react-progress/#circular-indeterminate
import Box from "@mui/material/Box";

function App() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [classificationResults, setResults] = useState([])

    const imageRef = useRef()
    const fileInputRef = useRef()

    function showResultHolderDisplay(showResultsFrame) {
      const resultsHolderFrame = document.getElementsByClassName('resultsHolder')[0];
      if (!resultsHolderFrame) return;

      if (showResultsFrame) {
        resultsHolderFrame.style.display = 'block';
      }
      else {
        resultsHolderFrame.style.display = 'none';
      }
    }

    function showPageDivider(showDivider) {
      const divider = document.getElementsByClassName('divider')[0];
      if (!divider) return;

        if (showDivider) divider.style.display = 'block';
        else divider.style.display = 'none';
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
      showResultHolderDisplay(false);
      showPageDivider(false);
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
        showResultHolderDisplay(true);
        showPageDivider(true);
    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
        loadModel()
    }, [])

    if (isModelLoading) {
        return (
          <div className="modelloading">
          <h1 className="">Loading Mobilenet Model...</h1>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress/>
          </Box>
          </div>
        );
    }

    return (
        <div className="App">
            <h1 className='pageHeader'>Image Classification</h1>
            <div className='buttonsHolder'>
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                {imageURL && <button className='classifyButton' onClick={classifyImage}>Classify Image</button>}
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Image Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    <div className="divider"></div>
                    {classificationResults.length > 0 && <div className='resultsHolder'>
                    <h1 className="classificationResults">Classification Results</h1>
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
