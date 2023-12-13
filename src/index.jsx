/* I declare that the lab work here submitted is original
except for source material explicitly acknowledged,
and that the same or closely related material has not been
previously submitted for another course.
I also acknowledge that I am aware of University policy and
regulations on honesty in academic work, and of the disciplinary
guidelines and procedures applicable to breaches of such
policy and regulations, as contained in the website.
University Guideline on Academic Honesty:
https://www.cuhk.edu.hk/policy/academichonesty/
Student Name :
Student ID :
Class/Section : CSC2720 T04
Date : 13/10/2023
*/
import ReactDOM from "react-dom/client";
import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

// import "./mongodb_connection.js"

const data = [
  { filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK" },
  { filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK" },
  { filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem" },
  { filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings" },
  { filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus" },
];

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Simple SPA</h1>
        <BrowserRouter>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Item><Link to="/">Home</Link></Nav.Item>
                <Nav.Item><Link to="/gallery">Features</Link></Nav.Item>
                <Nav.Item><Link to="/slideshow">Slideshow</Link></Nav.Item>
                </Nav>
                <Nav>
                <Nav.Item><Link to="/login">Login</Link></Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/slideshow" element={<Slideshow />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

class NoMatch extends React.Component {
  render() {
    return <main><h2>404 - Not Found</h2></main>;
  }
}

class Home extends React.Component {
  render() {
    return (<main>
      <h2>Home</h2>
      <img src={"diagram.jpg"} className="w-100" />
    </main>);
  }
}

class Gallery extends React.Component {
  render() {
    return (
      <main className="container">
        {data.map((file, index) => <FileCard i={index} key={index} />)}
      </main>
    );
  }
}

class FileCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected: -1 };
  }

  handleOnMouseEnter(index, e) {
    this.setState({ selected: index });
  }

  handleOnMouseLeave(index, e) {
    this.setState({ selected: -1 });
  }

  render() {
    let i = this.props.i;
    return (
      <div className="card d-inline-block m-2" style={{ width: this.state.selected == i ? 400 : 200 }} onMouseEnter={(e) => this.handleOnMouseEnter(i, e)} onMouseLeave={(e) => this.handleOnMouseLeave(i, e)}>
        <img src={"images/" + data[i].filename} className="w-100" />
        <div className="card-body">
          <h6 className="card-title">{data[i].filename}</h6>
          <p className="card-text">{data[i].year}</p>
        </div>
      </div>
    );
  }
}
//a
class Slideshow extends React.Component {
  static order = [0, 1, 2, 3, 4]; // Define a order array to store the order of the images
  static currentImage = 0; // Define the current image index to 0
  // Define the state of the slideshow
  constructor(props) {
    super(props);
    this.state = {
      action: -1, // Define the action, -1 means init, 0 means start, 1 means stop, 2 means shuffle
      isPlayingSlideShow: false, // Set the state to false, when it is first time played, set the state to true
      isStopedSlideShow: false, // Set the state to false, when it is stopped, set the state to true
      interval: 1500 // Set the interval to 1500, define the time interval between each image
    }
  }

  // Define the function to chagne the inertval
  changeInterval(time, e) {
    let newInterval = this.state.interval + time;
    // Set the lower bound of the interval
    if (newInterval < 200) {
      newInterval = 200;
    }
    Slideshow.CurrentInterval = newInterval;
    this.setState({ interval: newInterval });

    // Update the new time interval
    clearInterval(this.interval);

    // Start interval
    this.interval = setInterval(() => {
      this.changeImage();
    }, this.state.interval);
  }

  // Define the function to change the current index
  changeImage() {
    if (Slideshow.currentImage == 4) {
      Slideshow.currentImage = 0;
    } else {
      Slideshow.currentImage++;
    }
    // Call the class to render the new image
    this.setState({ action: 0 });
  }

  // Start the slideshow
  start(e) {
    // To prevent the slideshow from starting again
    if (this.state.isPlayingSlideShow) { return; }

    // Set state to start the slideshow
    this.setState({ isPlayingSlideShow: true, action: 0 });

    // Start interval
    this.interval = setInterval(() => {
      this.changeImage();
    }, this.state.interval);
  }

  // Stop the slideshow
  stop(e) {
    // Set state to stop the slideshow
    this.setState({ isPlayingSlideShow: false, action: 1 });

    // Stop interval
    clearInterval(this.interval);
  }

  // Base on Fisher–Yates shuffle
  shuffle(e) {
    let length = Slideshow.order.length;

    // shuffle the order array
    for (let i = length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = Slideshow.order[i];
      Slideshow.order[i] = Slideshow.order[j];
      Slideshow.order[j] = temp;
    }

    this.setState({ action: 2 });
  }

  render() {
    let currentIndex = Slideshow.order[Slideshow.currentImage];

    return (
      <main>
        <div>
          <h2>Slideshow:</h2>
          <div className="container-fluid">
            <div className="row row-cols-auto">
              <div className="col m-0"><button type="button" className="m-0" onClick={(e) => this.start(e)}>Start slideshow</button></div>
              <div className="col m-0"><button type="button" className="m-0" onClick={(e) => this.stop(e)}>Stop slideshow</button></div>
              <div className="col m-0"><button type="button" className="m-0" onClick={(e) => this.changeInterval(+200, e)}>Slower</button></div>
              <div className="col m-0"><button type="button" className="m-0" onClick={(e) => this.changeInterval(-200, e)}>Faster</button></div>
              <div className="col m-0"><button type="button" className="m-0" onClick={(e) => this.shuffle(e)}>Shuffle</button></div>
            </div>
            <div className="row">
              <div className="col"><img src={"images/" + data[currentIndex].filename} /></div>
            </div>
            <div className="row">
              <div className="col">{data[currentIndex].filename}, {data[currentIndex].remarks}, {data[currentIndex].year}</div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);
