import React from 'react'
import Modal from './Modal'
import { nanoid } from 'nanoid'
import Comp from './Comp'
class Canvas extends React.Component {


    constructor(props) {
        super(props)
        const localStorageData = JSON.parse(localStorage.getItem('elementsOnCanvas'));
        this.state = {
            elementsOnCanvas: localStorageData ? localStorageData : [],
            isModalOpen: false,
            modalProps: {},
            selectedElement: null
        }
    }

    openModal = (modalProps) => {
        console.log(modalProps)
        this.setState({ isModalOpen: true, modalProps: modalProps })
    }


    componentDidUpdate() {
        localStorage.setItem('elementsOnCanvas', JSON.stringify(this.state.elementsOnCanvas))
    }


    closeModal = (elementToAdd) => {
        console.log(elementToAdd)
        if (elementToAdd.id) {
            const elements = this.state.elementsOnCanvas;
            const index = elements.findIndex(el => el.id === elementToAdd.id)
            elements[index] = { ...elementToAdd }

            this.setState({ elementsOnCanvas: elements })
        } else {

            this.setState({ elementsOnCanvas: [...this.state.elementsOnCanvas, { ...elementToAdd, id: nanoid() }] })
        }

        this.setState({ isModalOpen: false })
        this.forceUpdate()
    }

    handleDragOver = (e) => {
        e.preventDefault();
    }

    handleOnDrop = (e) => {
        console.log(e)
        const elType = e.dataTransfer.getData('text/plain').toLowerCase()
        const x = e.clientX
        const y = e.clientY
        console.log("CANVAS: DATA", elType)
        if (elType)
            this.openModal({ elType, x, y, text: "", fontSize: "", fontWeight: "" })
    }


    editComponent = (component) => {
        this.openModal(component)
    }

    deleteComponent = (id) => {
        console.log('delte')
        const filteredElements = this.state.elementsOnCanvas.filter(el => el.id !== id)
        this.setState({ elementsOnCanvas: [...filteredElements] })
    }

    updateCoordinates = (id, x, y) => {
        const elements = this.state.elementsOnCanvas;
        const index = elements.findIndex(el => el.id === id)
        elements[index] = { ...elements[index], x, y }
        this.setState({ elementsOnCanvas: elements })
    }


    setSelectedElement = (key) => {
        this.setState({ selectedElement: key })
    }

    setIsModalOpen = (value) => {
        this.setState({ isModalOpen: value })
    }

    render() {
        return (
            <React.Fragment>
                <div
                    onKeyDown={this.handleKeyDown}
                    className="canvas"
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleOnDrop}
                >
                    {this.state.elementsOnCanvas.map((elProps) => {
                        return <Comp
                            updateCoordinates={this.updateCoordinates}
                            editComponent={this.editComponent}
                            deleteComponent={this.deleteComponent}
                            key={elProps.id} {...elProps}
                            setSelectedElement={this.setSelectedElement} />
                    }
                    )}
                </div>
                {this.state.isModalOpen && <Modal {...this.state.modalProps} setIsModalOpen={this.setIsModalOpen} closeModal={this.closeModal} />}
            </React.Fragment>
        )
    }

}

export default Canvas
