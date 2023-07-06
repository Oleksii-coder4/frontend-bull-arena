import { memo, useMemo, useState } from "react";
import img from './imgsAndAudio/youngMatador.gif'
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
    useMemo(() => {
        if(applause === 3) {
            renderAudio = < audio style={{visibility: "hidden"}}controls autoPlay> <source src={audio} type="audio/mpeg" /> </audio>
            console.log('Рендер или не рендер, вот в чем вопрос...') 
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
        return prevProps.applause === nextProps.applause 
      }  
 )