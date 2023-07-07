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
class Matador extends React.Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      bullPosition: null,
    };
    this.getBullPosition = this.getBullPosition.bind(this)
    this.checkMatadorPosition = this.checkMatadorPosition.bind(this)
  }
  componentDidMount() {
    document.addEventListener('bullRun', this.getBullPosition);
    console.log(this.state.bullPosition)
  }
  getBullPosition = (event: Event) => {
    const customEvent = event as CustomEvent;
    this.setState({ bullPosition: customEvent.detail.position });
    document.removeEventListener('bullRun', this.getBullPosition);
  };
  checkMatadorPosition() {
    const futureMatadorPosition = Math.floor(Math.random() * 8);
    if (futureMatadorPosition !== this.state.bullPosition) {
      console.log(`Matador is moving from ${ this.props.matadorPosition } to ${ futureMatadorPosition }`);
      this.props.setMatarodPosition(futureMatadorPosition);
    } else {
      this.checkMatadorPosition();
    }
  }
  componentDidUpdate(prevProps: MyComponentProps, prevState: MyComponentState) {
    document.addEventListener('bullRun', this.getBullPosition);
    console.log(this.state.bullPosition)
    if (this.state.bullPosition === this.props.matadorPosition) {
      this.checkMatadorPosition();
    }
  }

  render() {
    const { applause } = this.props;
    if (applause === 3) {
      console.log('Audio Is Playing - La la la la la la la la la la la lala');
    }
    return (
      <div>
        <img className='matador' src={img} alt="matador" />
      </div>
    );
  }
}
export default memo(Matador, (prevProps, nextProps) => {
  if (nextProps.applause === 3 && prevProps.applause !== 3) {
    return false;
  }
  return true;
});