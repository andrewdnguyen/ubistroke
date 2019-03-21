import React, { Component } from 'react';
import './VideoScroll.css';

class VideoScroll extends Component {
  constructor(props){
    super(props);
  }



  render() {
    return (
      <div className="info-side">
      <section class="container">
  <div class="content">
      <h1>Scroll to Begin</h1>
      <p>Start it like this..</p>
  </div>
</section>

<section class="container">
  <div class="content">
      <h1>Step 1</h1>
      <p>Start it like this..</p>
  </div>
</section>

<section class="container">
  <div class="content">
      <h1>Step 2</h1>
      <p>Start it like this..</p>
  </div>
</section>

<section class="container">
  <div class="content">
      <h1>Step 3</h1>
      <p>Start it like this..</p>
  </div>
</section>

<section class="container">
  <div class="content">
      <h1>Step 4</h1>
      <p>Start it like this..</p>
  </div>
</section>

<div id="set-height"></div>

<video id="v0" tabindex="0" autobuffer preload>
  <source type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' src="fingers.mp4"></source>
</video>
      </div>
    )
  }
}

export default VideoScroll;
