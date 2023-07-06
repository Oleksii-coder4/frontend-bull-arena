import { memo, useMemo, useState } from "react";
import img from './imgsAndAudio/matador.jpg'
import audio from './imgsAndAudio/mixkit-rhythmic-audience-clapping-loop-522.wav'
export const Matador = memo( ({applause, setMatarodPosition, matadorPosition}: {applause: number, setMatarodPosition: (param: number) => void, matadorPosition: number}) => {
    const [bullPosition, setBullPosition] = useState(null)
    document.addEventListener('bullRun', function(event: Event) {
        const customEvent = event as CustomEvent
        setBullPosition(customEvent.detail.position)
    });

    function checkMatadorPosition() {
        let futureMatadorPosition =  Math.floor(Math.random() * 8) 
        if(futureMatadorPosition !== bullPosition) {
            console.log(`Matador is moving from ${matadorPosition} to ${futureMatadorPosition}`)
            setMatarodPosition(futureMatadorPosition)
            return null
        }else{
            return checkMatadorPosition()
        }
    }
    // меняю позицию матадора только когда  изменяется позиция быка 
    useMemo(() => {
        if(bullPosition === matadorPosition) {
            checkMatadorPosition()
        }
    }, [bullPosition])
    let renderAudio: any 
    let a: any
    useMemo(() => {
        if(applause === 3) {
            console.log('only one time')
            renderAudio = < audio style={{visibility: "hidden"}}controls autoPlay> <source src={audio} type="audio/mpeg" /> </audio>
            a = <h1>Я отрондерился)</h1> 
        }
    }, [applause])
    return (
        <div>
            {a}
            {renderAudio}
            <img className='matador' src={img} alt="matador" />
        </div>
    )
},
    (prevProps, nextProps) => {
        return prevProps.applause === nextProps.applause 
      }  
 )