import {useState} from 'react';
import "rsuite/dist/rsuite.min.css";
import { Checkbox, CheckboxGroup } from "rsuite";
import Modal from "react-modal";
import {ip} from '../../config/ip';
import '../../css/players_dm.css';

export default function NPCs({npcs: npcs, players: players}) {
    
    const [newNPCInfo, setNewNPCInfo] = useState({
        name: "",
        race: "",
        class: "",
        shop: "",
        location: ""
    })

    const [showPlayersAvailModal, setShowPlayersAvailModal] = useState(false);
    const [selectedNPC, setSelectedNPC] = useState("");
    const [currentPlayersAvail, setCurrentPlayersAvail] = useState(
        Object.keys(players)
    );

    const produceNPCInfo = (npc) => {
        return (
            <div className="info-box">
                <span>
                    {npc.name}
                    <br></br>
                    {npc.race}, {npc.class}
                </span>
                <span>
                    Shop: none
                </span>
                <span>
                    <button onClick={
                        () => {
                            setShowPlayersAvailModal(true);
                            setSelectedNPC(npc.name);
                        }
                    }>Make Available</button>
                    <button onClick={
                        async () => {
                            await pullAvailability(npc.name);
                        }
                    }>Pull Availability</button>
                </span>
                <div className="break"></div>
                <div className="inventory">
                    {Object.keys(npc.items).map(key => {
                        return (
                            <div className="item">
                                {key}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const handleChange = event => {
        setNewNPCInfo(prevNewNPCInfo => ({
            ...prevNewNPCInfo,
            [event.target.name]: event.target.value
        }))
    }

    const createShopIfExists = async (shop, shopkeep, location) => {
        if (shop !== "") {
            await fetch(ip + "/api/get/shops/" + shop)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            }).catch(async err => {
                await fetch(ip + "/api/createshop", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        shop_name: shop,
                        shopkeep: shopkeep,
                        location_name: location
                    })
                })
            })
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(newNPCInfo);
        console.log("adding npc");
        await fetch(ip + "/api/createnpc", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                full_name: newNPCInfo.name,
                race: newNPCInfo.race,
                n_class: newNPCInfo.class,
                char_location: newNPCInfo.location,
                notes: ""
            })
        }).then(res => {
            createShopIfExists(newNPCInfo.shop, newNPCInfo.name, newNPCInfo.location);
            setNewNPCInfo({
                name: "",
                race: "",
                class: "",
                location: "",
                shop: ""
            })
            return;
        }).catch( error => {
            console.log(error);
            return;
        })
    }

    const setPlayersAvail = async () => {
        await fetch(ip + "/api/updateplayersavail/npcs/full_name", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_value: selectedNPC,
                players_avail: currentPlayersAvail.toString()
            })
        })
        cancelModal();    
    }

    const pullAvailability = async (npc) => {
        await fetch(ip + "/api/updateplayersavail/npcs/full_name", {
            method: 'POST',
            body: JSON.stringify({
                id_value: npc,
                players_avail: ""
            })
        })
        cancelModal();    
    }

    const cancelModal = () => {
        setCurrentPlayersAvail(Object.keys(players));
        setShowPlayersAvailModal(false);
    }

    return (
        <>
            <Modal
                isOpen={showPlayersAvailModal}
                onRequestClose={setPlayersAvail}
                contentLabel="Example Modal"
                style={{overlay: {
                    height: "35%",
                    width: "42%"
                }}}
            >
                <h5>Select Players to Make NPC Available To:</h5>
                <CheckboxGroup
                    inline
                    name="nameschecks"
                    value={currentPlayersAvail}
                    onChange={(value) => {
                        setCurrentPlayersAvail(value);
                    }}
                >
                    {Object.keys(players).map(key => {
                        return (<Checkbox value={key}>{key}</Checkbox>);
                    })}
                </CheckboxGroup>
                <button onClick={setPlayersAvail}>Make Available</button>
                <button onClick={cancelModal}>Cancel</button>
            </Modal>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={newNPCInfo.name} onChange={handleChange} />
                </label>
                <label>
                    Race:
                    <input type="text" name="race" value={newNPCInfo.race} onChange={handleChange} />
                </label>
                <label>
                    Class:
                    <input type="text" name="class" value={newNPCInfo.class} onChange={handleChange} />
                </label>
                <label>
                    Shop:
                    <input type="text" name="shop" value={newNPCInfo.shop} onChange={handleChange} />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" value={newNPCInfo.location} onChange={handleChange} />
                </label>
                <button>Create NPC</button>
            </form>
            <div id="npcs" className="boxes-layout">
                {Object.keys(npcs).map(key => produceNPCInfo(npcs[key]))}
            </div>
        </>
    );
}