import { memo, useMemo, useState } from "react";
import React from "react";
import img from './imgsAndAudio/matador.jpg'
import audio from './imgsAndAudio/mixkit-rhythmic-audience-clapping-loop-522.wav'

interface MyComponentState {
    bullPosition: number | null;
}
interface MyComponentProps {
  applause: number
  setMatarodPosition: (position: number) => void;
  matadorPosition: number
}
  
class OldMatador extends React.Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      bullPosition: null,
    };
    this.checkMatadorPosition = this.checkMatadorPosition.bind(this)
    // this.handleBullRun = this.handleBullRun.bind(this)
  }


  componentDidUpdate(prevProps: MyComponentProps, prevState: MyComponentState) {
    document.addEventListener('bullRun', (event: Event) => {
      const customEvent = event as CustomEvent;
      this.setState({ bullPosition: customEvent.detail.position });
    } );
    if (prevState.bullPosition !== this.state.bullPosition) {
      if (this.state.bullPosition === this.props.matadorPosition) {
        this.checkMatadorPosition();
      }
    }
  }

  checkMatadorPosition() {
    let futureMatadorPosition = Math.floor(Math.random() * 8);
    if (futureMatadorPosition !== this.state.bullPosition) {
      console.log(`Matador is moving from ${this.props.matadorPosition} to ${futureMatadorPosition}`);
      this.props.setMatarodPosition(futureMatadorPosition);
    } else {
      this.checkMatadorPosition();
    }
  }
  shouldComponentUpdate(nextProps: MyComponentProps) {
    if (nextProps.applause !== this.props.applause) {
      return true; // Обновляем компонент
    }
    return false; // Не обновляем компонент
  }

  render() {
    return (
      <div>
        <img className='matador' src={img} alt="matador" />
      </div>
    );
  }
}

export default OldMatador