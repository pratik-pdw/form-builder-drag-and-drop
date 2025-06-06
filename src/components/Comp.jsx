import React, { useState, useEffect, useRef } from 'react'

function Comp({ id, elType, text, x, y, fontSize = 16, fontWeight = 400, setSelectedElement, editComponent, deleteComponent, updateCoordinates }) {

    const [active, setActive] = useState(false)
    const [initialX, setInitialX] = useState()
    const [initialY, setInitialY] = useState()
    const [currentX, setCurrentX] = useState(x)
    const [currentY, setCurrentY] = useState(y)
    const [offsetX, setOffsetX] = useState(x)
    const [offsetY, setOffsetY] = useState(y)
    const [isFocused, setIsFocused] = useState(false)
    const elRef = useRef()


    useEffect(() => {
        console.log('Button rendered first time')
        setCurrentX(x)
        setCurrentY(y)
        setOffsetX(x)
        setOffsetY(y)
        // elRef.current.style.transform = `translate3d(${currentX}px, ${offsetY}px,0)`
        // elRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px,0)`
    }, [x, y])

    const handleMouseDown = (e) => {
        setInitialX(e.clientX - offsetX)
        setInitialY(e.clientY - offsetY)

        if (e.target === elRef.current) {
            setActive(true)
        }
    }

    const handleMouseMove = (e) => {
        if (active) {
            e.preventDefault();

            if (currentX < 0) {
                setCurrentX(0)
            }
            else if (e.target.clientWidth + currentX <= e.target.offsetParent.clientWidth)
                setCurrentX(e.clientX - initialX)
            else
                setCurrentX(currentX - 1)

            if (currentY < 0) {
                setCurrentY(0)
            }
            else if (e.target.clientHeight + currentY <= e.target.offsetParent.clientHeight) {
                setCurrentY(e.clientY - initialY)
            } else {
                setCurrentY(currentY - 1)
            }


            // console.log(e.target.clientWidth + currentX, e.target.offsetParent.clientWidth)
            setOffsetX(currentX)
            setOffsetY(currentY)
        }
    }

    const handleMouseUp = (e) => {
        setInitialX(currentX)
        setInitialY(currentY)
        setActive(false)
        updateCoordinates(id, currentX, currentY)
    }

    const handleKeyDown = (e) => {
        if (e.code.toLowerCase() === 'delete') {
            deleteComponent(id)
        } else if (e.code.toLowerCase() === 'enter') {
            editComponent({ id, elType, text, fontSize, fontWeight, x: currentX, y: currentY })
        }
    }

    return React.createElement(
        elType === 'label' ? 'button' : elType,
        {
            ref: elRef,
            placeholder: elType === 'input' ? text : undefined,
            className: `comp comp__${elType}`,
            style: {
                fontSize: `${fontSize}px`,
                fontWeight,
                transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
                border: isFocused ? '2px solid #D95409' : 'none'
            },
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
            onMouseMove: handleMouseMove,
            onKeyDown: handleKeyDown,
            onFocus: () => {
                setIsFocused(true)
                setSelectedElement(id)
            },
            onBlur: () => {
                setIsFocused(false)
                setSelectedElement(null)
            }
        },
        elType !== 'input' ? text : undefined
    )
}

export default Comp;
