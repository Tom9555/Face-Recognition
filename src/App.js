import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Sparkle from './Components/Particles/Particles';
import Clarifai from 'clarifai';
import './App.css';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
	apiKey: '8b275c32dc4d43f999acf0007877e2d5',
});
class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
		};
	}
	calculateFaceLoaction = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};
	displayFaceBox = (box) => {
		this.setState({ box: box });
	};
	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};
	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });

		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) => {
				this.displayFaceBox(this.calculateFaceLoaction(response)).catch((err) =>
					console.log(err)
				);
			});
	};
	onRouteChange = (route) => {
		if (route === 'signin') {
			this.setState({ isSignedIn: false });
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className='App'>
				<Sparkle />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

				{this.state.route === 'home' ? (
					<div>
						{' '}
						<Logo />
						<Rank />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === 'signin' ? (
					<Signin onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
