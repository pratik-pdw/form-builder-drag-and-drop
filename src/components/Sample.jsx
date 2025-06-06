import React, { useState, useRef } from 'react'

function Sample() {


    const [active, setActive] = useState(false)
    const [initialX, setInitialX] = useState()
    const [initialY, setInitialY] = useState()
    const [currentX, setCurrentX] = useState()
    const [currentY, setCurrentY] = useState()
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const itemRef = useRef()

    const handleMouseDown = (e) => {
        setInitialX(e.clientX - offsetX)
        setInitialY(e.clientY - offsetY)

        if (e.target === itemRef.current) {
            setActive(true)
        }
    }

    const handleMouseMove = (e) => {
        if (active) {
            e.preventDefault();
            console.log(currentX, currentY)
            let currX = e.clientX - initialX
            let currY = e.clientY - initialY
            if (currX >= 0 && currY >= 0) {
                setCurrentX(currX)
                setCurrentY(currY)
            }

            setOffsetX(currentX)
            setOffsetY(currentY)

        }
    }

    const handleMouseUp = () => {
        setInitialX(currentX)
        setInitialY(currentY)
        setActive(false)
    }
    return (
        <div style={{ backgroundColor: 'dodgerblue', position: 'relative', width: '100vw', height: '100vh', }} className="somecanvas">
            <div
                ref={itemRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ transform: `translate3d(${currentX}px,${currentY}px,0)`, width: '100px', height: '100px', backgroundColor: 'gold' }} className="item"></div>
        </div>
    )
}

export default Sample
