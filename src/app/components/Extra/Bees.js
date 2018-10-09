import React, { Component } from 'react';
import { connect } from 'react-redux';

class Bees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: {height: props.windowHeight, width: props.windowWidth},
      heading: 0,
      position: {
        x: props.windowWidth/2,
        y: props.windowHeight/2
      },
      destination: {
        x: props.windowWidth/2,
        y: props.windowHeight/2
      }
    }

    this.outOfBoundSteps = 50;
    this.interval = null;
  }

  componentWillMount() {
    this.start();
  }

  componentWillUnmount() {
    this.pause();
  }

  getHeading() {
    const { mouseX, mouseY } = this.props;
    const { position, bounds } = this.state;
    let { destination } = this.state;
    var angle = Math.random()*Math.PI*2;
    let randX = Math.cos(-angle)*40;
    let randY = Math.sin(-angle)*40;

    if(this.distanceTo(position.x, position.y, mouseX, mouseY) <= 10) {
     destination = {x: mouseX + randX, y: mouseY + randY};
    } else {
      angle = Math.atan2(position.y - mouseY, mouseX - position.x);
      destination = {x: mouseX, y: mouseY};
    }

    if((destination.y < 0 || destination.x < 0) ||
       (destination.y > bounds.height || destination.x > bounds.width)) {
         return;
    }

    this.setState({destination, heading: angle});
  }

  outOfBounds() {
    let { position, destination, bounds } = this.state;

    if(position.x < 0 || position.y < 0 ||
      (position.y > bounds.height || position.x > bounds.width)) {
        return true;
    }
  }

  distanceTo(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
  }

  pause() {
    clearInterval(this.interval);
  }

  start() {
    this.interval = setInterval(() => {
      const { mouseX, mouseY } = this.props;
      let { position, destination, heading } = this.state;

      if(this.distanceTo(position.x, position.y, destination.x, destination.y) <= 10 ||
        (this.outOfBounds() && this.outOfBoundSteps === 0)) {
          this.mousePosChanged=false;
          this.outOfBoundSteps=50;
          this.getHeading();
      } else {
        let stepX = Math.cos(-heading)*2;
        let stepY = Math.sin(-heading)*2;

        this.outOfBoundSteps-=1;
        this.outOfBoundSteps = this.outOfBoundSteps < 0 ? 0 : this.outOfBoundSteps;
        position.x += stepX; position.y += stepY;
        this.setState({position});
      }
    }, 10);
  }

   render() {
    const { position, bounds, heading } = this.state;

    return (
      <div style={{position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', display: 'flex'}}>
        <svg width={bounds.width} height={bounds.height}>
          <image
            xlinkHref="images/bee.png"
            x={position.x}
            y={position.y}
            height="20px"
            width="20px"
          />
        </svg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    windowWidth: state.menu.windowWidth,
    windowHeight: state.menu.windowHeight,
    mouseX: state.menu.mouseX,
    mouseY: state.menu.mouseY
  };
}

export default connect(mapStateToProps)(Bees);
