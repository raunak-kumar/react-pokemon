import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
}

const PokemonThumb = ({ id, image, name, type, data }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const style = type + " thumb-container";
    function details() {
        setModalIsOpen(true)
    }
    return (
        <>
            <div className={style} onClick={details}>
                <div className="number"><small>#{id}</small></div>
                <img src={image} alt={name} />
                <div className="detail-wrapper">
                    <h3>{capitalize(name)}</h3>
                    <small>Type: {type}</small>
                </div>
            </div>
            <Modal isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => setModalIsOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-container">
                    <div className="poke-profile">
                        <div className={style}>
                            <div className="number"><small>#{id}</small></div>
                            <img src={image} alt={name} />
                            <div className="detail-wrapper">
                                <h3>{capitalize(name)}</h3>
                                <small>Type: {type}</small>
                            </div>
                        </div>
                    </div>
                    <div className="poke-details">
                        <table>
                            <tbody>
                                <tr>
                                    <td className={"poke-details-title"}>Abilities</td>
                                    <td>{modalIsOpen && data[id - 1].abilities.map((item, index) => {
                                        return <span key={"ability" + index} className={"abilities"}>{capitalize(item.ability.name)}</span>
                                    })}</td>
                                </tr>
                                <tr>
                                    <td className={"poke-details-title"}>Moves</td>
                                    <td>{modalIsOpen && data[id - 1].moves.map((item, index) => {
                                        return <span key={"move" + index} className={"moves"}>{capitalize(item.move.name)}</span>
                                    })}</td>
                                </tr>
                                <tr>
                                    <td className={"poke-details-title"}>Stats</td>
                                    <td>{modalIsOpen && data[id - 1].stats.map((item, index) => {
                                        return <span key={"stats" + index} className={"stats"}>{item.base_stat + " " + capitalize(item.stat.name)}</span>
                                    })}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={"close-modal"}><button onClick={() => setModalIsOpen(false)}>X</button></div>
                </div>
            </Modal>
        </>
    )
}

export default PokemonThumb
