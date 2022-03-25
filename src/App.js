import './App.css';
import { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from "react-tsparticles";

const particlesOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "triangle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
};

const INITIAL_STATE = {
  input: '',
  imageUrl: '',
  boxes: {},
  route: 'signin', // Yes, yes, I can use React Router but this app will have 4 routes and it's premature optimization at this point.
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    console.log('data,', data)
    let boxesArray = [];

    for (let i = 0; i < data.length; i++) {

      let boundingBox = data[i].region_info.bounding_box;

      boxesArray.push({
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height),
      });
    }

    return boxesArray;
  };

  displayFacebox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(INITIAL_STATE)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(process.env.BACKEND_URL + '/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(process.env.BACKEND_URL + 'imageCount', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);

        }
        this.displayFacebox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App" >
        <Particles className='particles'
          id="tsparticles"
          options={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' ?
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin' ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    )
  }
};

export default App;
