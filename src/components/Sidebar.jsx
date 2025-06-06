import React from 'react'
import { FaGripVertical } from 'react-icons/fa'
function Sidebar() {
    const list = ['Label', 'Input', 'Button']

    const handleOnDragStart = (e) => {
        console.log('on drag start')
        console.log(e.target.lastChild.innerText)
        e.dataTransfer.setData("text/plain", e.target.lastChild.innerText)
    }

    const handleOnDragEnd = (e) => {
        console.log('on drag end')
    }

    return (
        <div className="sidebar">
            <h1>Blocks</h1>
            <div className="list">
                {list.map(item =>
                    <div draggable
                        onDragStart={handleOnDragStart}
                        onDragEnd={handleOnDragEnd}
                        key={item} className="list-item">
                        <FaGripVertical style={{ color: '#D5D5D5', fontSize: '18px' }} />
                        <p>{item}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
