import { useEffect, useState } from 'react';
import {expToLevel} from '../../info/leveling';
import Modal from 'react-modal';
import '../../css/inventory.css'

export default function Inventory({playerInfo}) {
  
  const [expToNextLevel, setExpToNextLevel] = useState(expToLevel(playerInfo.level));
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setExpToNextLevel(expToLevel(playerInfo.level));
  }, [expToLevel(playerInfo.level)])
    
  const cancelModal = () => {
    setShowItemModal(false);
  }

  return (
    <>
      <Modal
        isOpen={showItemModal}
        onRequestClose={cancelModal}
        contentLabel="Example Modal"
        style={{overlay: {
            height: "100vh",
            width: "100vw"
        }}}
      >
        <div className="item-popup">
          <button className="cancel-modal-btn" onClick={cancelModal}>X</button>
          <h1>{selectedItem} (xAmount)</h1>
          <h3>Equipped: </h3>
          <h3>Type: </h3>
          <h3>Effects: </h3>
          <img src="cookingutensils.png"></img>
        </div>
      </Modal>
      <div class="playerinfo">
        <h2>{playerInfo.name}</h2>
        <h3>{playerInfo.race}</h3>
        <h4>{playerInfo.class}</h4>
        Level: {playerInfo.level}
        <br></br>
        {playerInfo.exp}/{expToNextLevel}
        <br></br>
        Gold: {playerInfo.gold}
        <br></br>
      </div>
      <div className="inventory">
        {Object.keys(playerInfo.items).map(key => {
            return (
              <div className="item" onClick={
                () => {
                  setShowItemModal(true);
                  setSelectedItem(key);
                }
              }>
                  {key}
              </div>
            );
        })}
      </div>
    </>
  );
}