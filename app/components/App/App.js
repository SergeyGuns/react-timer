import React from 'react'

import './App.css'

export default class App extends React.Component {

  constructor() { 
    super() 
      this.state = {
        startTime: Date.now(),
        diffTime:0,
        timeTrackOn: false,
        interval: null
      }
  }

  step() {
    if(this.state.timeTrackOn && Date.now() - this.state.startTime > 100) {
      // console.log(this)
      this.setState({
        diffTime: Date.now() - this.state.startTime,
        interval: requestAnimationFrame(this.step.bind(this))
      })
    }
  }



  handleSetTimer(e) {
    let value = !! +e.target.dataset.value
    this.setState({
      timeTrackOn: value,
      interval: requestAnimationFrame(this.step.bind(this))
    })
  }

  handleReset() {
    this.setState({
      startTime: Date.now(),
      diffTime:0,
    })
    cancelAnimationFrame(this.state.interval);
  }


  render() {

    let { diffTime } = this.state;

    return (
      <div className='App'>
        <h1>{diffTime}</h1>
        <div className='btn' data-value={1} onClick={this.handleSetTimer.bind(this)}>start</div>
        <div className='btn' data-value={0} onClick={this.handleSetTimer.bind(this)}>stop</div>
        <div onClick={this.handleReset.bind(this)}>reset</div>
      </div>
    )

  }
}

