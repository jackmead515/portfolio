import React, { Component } from 'react';

export default class Bees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: {height: 300, width: 300},
      heading: 0,
      position: {
        x: 20,
        y: 20
      },
      destination: {
        x: 20,
        y: 20
      }
    }

    this.interval = null;
  }

  componentWillMount() {
    this.start();
  }

  componentWillUnmount() {
    this.pause();
  }

  getHeading() {
    const { position, bounds } = this.state;
    var angle = Math.random()*Math.PI*2;
    let randX = Math.cos(angle)*40;
    let randY = Math.sin(angle)*40;

    let destination = {x: position.x + randX, y: position.y + randY};

    if((destination.y < 0 || destination.x < 0) ||
       (destination.y > bounds.height || destination.x > bounds.width)) {
         return;
    }

    this.setState({destination, heading: angle});
  }

  distanceTo(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
  }

  pause() {
    clearInterval(this.interval);
  }

  start() {
    this.interval = setInterval(() => {
      let { position, destination, heading } = this.state;

      if(this.distanceTo(position.x, position.y, destination.x, destination.y) <= 10) {
          this.getHeading();
      } else {
        let stepX = Math.cos(heading)*2;
        let stepY = Math.sin(heading)*2;

        position.x += stepX; position.y += stepY;
        this.setState({position});
      }
    }, 10);
  }

   render() {
    const { position, bounds, heading } = this.state;

    return (
      <svg width={300} height={300}>
        <image
          xlinkHref="images/bee.png"
          x={position.x}
          y={position.y}
          height="20px"
          width="20px"
        />
      </svg>
    );
  }
}
