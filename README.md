# React & TensorFlow.js

This project was bootstrapped for you with [Create React App](https://github.com/facebook/create-react-app).

A simple image classification app created using tensorflow-js and react. The app uses the `MobileNet` model for image classification.

## MobileNet
MobileNets are small, low-latency, low-power models parameterized to meet the resource constraints of a variety of use cases. They can be built upon for classification, detection, embeddings and segmentation similar to how other popular large scale models, such as Inception, are used.

MobileNets trade off between latency, size and accuracy while comparing favorably with popular models from the literature.

This TensorFlow.js model does not require you to know about machine learning. It can take as input any browser-based image elements (<img>, <video>, <canvas> elements, for example) and returns an array of most likely predictions and their confidences.

For more information about MobileNet, check out this readme in tensorflow/models.

## API
### Loading the model
mobilenet is the module name, which is automatically included when you use the <script src> method. When using ES6 imports, mobilenet is the module.

```
mobilenet.load({
    version: 1,
    alpha?: 0.25 | .50 | .75 | 1.0,
    modelUrl?: string
    inputRange?: [number, number]
  }
)
```
For users of previous versions (1.0.x), the API is:

```
mobilenet.load(
    version?: 1,
    alpha?: 0.25 | .50 | .75 | 1.0
)
```

**Args:**

- version: The MobileNet version number. Use 1 for MobileNetV1, and 2 for MobileNetV2. Defaults to 1.
- alpha: Controls the width of the network, trading accuracy for performance. A smaller alpha decreases accuracy and increases performance. 0.25 is only available for V1. Defaults to 1.0.
- modelUrl: Optional param for specifying the custom model url or tf.io.IOHandler object. Returns a model object.
- inputRange: Optional param specifying the pixel value range expected by the trained model hosted at the modelUrl. This is typically [0, 1] or [-1, 1].
- mobilenet is the module name, which is automatically included when you use the <script src> method. When using ES6 imports, mobilenet is the module.

### Making a classification
You can make a classification with mobilenet without needing to create a Tensor with MobileNet.classify, which takes an input image element and returns an array with top classes and their probabilities.

If you want to use this for transfer learning, see the infer method.

This method exists on the model that is loaded from mobilenet.load.

```
model.classify(
  img: tf.Tensor3D | ImageData | HTMLImageElement |
      HTMLCanvasElement | HTMLVideoElement,
  topk?: number
)
```

**Args:**
- img: A Tensor or an image element to make a classification on.
- topk: How many of the top probabilities to return. Defaults to 3.
- Returns a Promise that resolves to an array of classes and probabilities that looks like:

```
[{
  className: "Egyptian cat",
  probability: 0.8380282521247864
}, {
  className: "tabby, tabby cat",
  probability: 0.04644153267145157
}, {
  className: "Siamese cat, Siamese",
  probability: 0.024488523602485657
}]
```

## Available Scripts

In the project directory, you can run:

### `npm start`

We've already run this for you in the `Codespaces: server` terminal window below. If you need to stop the server for any reason you can just run `npm start` again to bring it back online.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) in the built-in Simple Browser (`Cmd/Ctrl + Shift + P > Simple Browser: Show`) to view your running application.

The page will reload automatically when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
