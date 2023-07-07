import { memo, useEffect, useMemo, useRef, useState } from "react";
import img from './imgsAndAudio/youngMatador.gif'
import audio from './imgsAndAudio/mixkit-rhythmic-audience-clapping-loop-522.wav'
export const Matador = memo( ({applause, setMatarodPosition, matadorPosition}: {applause: number, setMatarodPosition: (param: number) => void, matadorPosition: number}) => {
    const [statePos, setBullPosition] = useState(null)
    let bullPositionNoState: any = useRef(null)
    useEffect(() => {
        const getBullPosition = (event: Event) => {
            const customEvent = event as CustomEvent
            bullPositionNoState.current = customEvent.detail.position
        };
        document.addEventListener('bullRun', getBullPosition);
        return () => {
          document.removeEventListener('bullRun', getBullPosition);
        };
      }, []);
    function checkMatadorPosition() {
        let futureMatadorPosition = 0
        while(futureMatadorPosition === bullPositionNoState.current) {
            futureMatadorPosition =  Math.floor(Math.random() * 8) 
        }
        console.log(`bullPosition - ${statePos}, bullPosition witout state - ${bullPositionNoState.current}`)
        console.log(`Matador is moving from ${matadorPosition} to ${futureMatadorPosition}`)
        setMatarodPosition(futureMatadorPosition)
    }
    // меняю позицию матадора только когда  изменяется позиция быка 
    useEffect(() => {
        console.log('use Effect' + bullPositionNoState.current)
        if(bullPositionNoState.current === matadorPosition) {
            checkMatadorPosition()
        }
    }, [bullPositionNoState.current, matadorPosition])
    let renderAudio: any 
    useEffect(() => {
        if(applause === 3) {
            console.log('Audio Is Playing - La la la la la la la la la la la lala')
        }
    }, [applause])
    return (
        <div>
            {renderAudio}
            <img className='matador' src={img} alt="matador" />
        </div>
    )
},
    (prevProps, nextProps) => {
        if(nextProps.applause === 3 && prevProps.applause !== 3)  {
            return false
        }
        return true
      }  
 )