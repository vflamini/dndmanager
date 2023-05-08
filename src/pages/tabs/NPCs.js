import {useState} from 'react';
import Modal from 'react-modal';
import '../../css/inventory.css';

export default function NPCs({npcs}){
    const [showNPCModal, setShowNPCModal] = useState(false);
    const [selectedNPC, setSelectedNPC] = useState({});

    const produceNPCInfo = (npc) => {
        return (
            <div className="item" onClick={
                () => {
                    setSelectedNPC(npc);
                    setShowNPCModal(true)
                }
            }>
                {npc.name}
                {/* <br></br>
                {npc.race}, {npc.class}
                <br></br>
                Location: {npc.location} */}
            </div>
        );
    }

    const cancelModal = () => {
        setShowNPCModal(false);
    }

    return (
        <>
            <Modal
                isOpen={showNPCModal}
                onRequestClose={cancelModal}
                contentLabel="Example Modal"
                style={{overlay: {
                    height: "100vh",
                    width: "100vw"
                }}}
            >
                <div className="item-popup">
                <button className="cancel-modal-btn" onClick={cancelModal}>X</button>
                <h1>{selectedNPC.name}</h1>
                <h3>Race: {selectedNPC.race}</h3>
                <h3>Type: {selectedNPC.class}</h3>
                <h3>Location: {selectedNPC.location}</h3>
                <h3>Store: none</h3>
                <img src="nolanhighsmith.png"></img>
                </div>
            </Modal>
            <div id="npcs">
                {Object.keys(npcs).map(key => produceNPCInfo(npcs[key]))}
            </div>
        </>
    );
}