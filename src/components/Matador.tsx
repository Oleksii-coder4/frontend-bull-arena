import { memo, useEffect, useMemo, useState } from "react";
import img from './imgsAndAudio/youngMatador.gif'
import audio from './imgsAndAudio/mixkit-rhythmic-audience-clapping-loop-522.wav'
export const Matador = memo( ({applause, setMatarodPosition, matadorPosition}: {applause: number, setMatarodPosition: (param: number) => void, matadorPosition: number}) => {
    const [bullPosition, setBullPosition] = useState(null)
    document.addEventListener('bullRun', function getBullPosition(event: Event) {
        const customEvent = event as CustomEvent
        setBullPosition(customEvent.detail.position)
        document.removeEventListener('bullRun', getBullPosition)
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
    useEffect(() => {
        if(bullPosition === matadorPosition) {
            checkMatadorPosition()
        }
    }, [bullPosition])
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