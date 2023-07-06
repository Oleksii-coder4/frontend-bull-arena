import { memo, useMemo, useState } from "react";
import React from "react";
import img from './imgsAndAudio/matador.jpg'
import audio from './imgsAndAudio/mixkit-rhythmic-audience-clapping-loop-522.wav'
// export const Matador = memo( (
//     {applause, setMatarodPosition, matadorPosition}: 
//     {applause: number, setMatarodPosition: (param: number) => void, matadorPosition: number}
//     ) => {
//     const [bullPosition, setBullPosition] = useState(null)

//     // меняю позицию матадора только когда  изменяется позиция быка 
//     useMemo(() => {
//         if(bullPosition === matadorPosition) {
//             checkMatadorPosition()
//         }
//     }, [bullPosition])
//     let renderAudio: any 
//     let a: any
//     useMemo(() => {
//         if(applause === 3) {
//             console.log('only one time')
//             renderAudio = < audio style={{visibility: "hidden"}}controls autoPlay> <source src={audio} type="audio/mpeg" /> </audio>
//             a = <h1>Я отрондерился)</h1> 
//         }
//     }, [applause])

// },
//     (prevProps, nextProps) => {
//         return prevProps.applause === nextProps.applause 
//       }  
//  )

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

  render() {
    return (
      <div>
        <img className='matador' src={img} alt="matador" />
      </div>
    );
  }
}

export default OldMatador