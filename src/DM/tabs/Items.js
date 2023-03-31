import {useState} from 'react';
import {ip} from '../../config/ip';

export default function Items({players}){
    const [itemInfo, setItemInfo] = useState({
        name: "",
        owner: players[Object.keys(players)[0]].name,
        effects: [""],
        type: "",
        is_hidden: "no",
        access_diff: "",
        price: 0,
        amount: 1,
        notes: ""
    })

    const [entity, setEntity] = useState("player");


    const handleChange = (event) => {
        setItemInfo({
            ...itemInfo,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log("adding item");
        await fetch(ip + "/api/createitem", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                item_name: itemInfo.name,
                item_owner: itemInfo.owner,
                effects: itemInfo.effects.toString(),
                equipped: "no",
                item_type: itemInfo.type,
                is_hidden: itemInfo.is_hidden,
                access_diff: itemInfo.access_diff,
                price: itemInfo.price,
                amount: itemInfo.amount,
                notes: itemInfo.notes
            })
        }).then(res => {
            setItemInfo({
                name: "",
                owner: players[Object.keys(players)[0]].name,
                effects: [""],
                type: "",
                is_hidden: "no",
                access_diff: "",
                price: 0,
                amount: 1,
                notes: ""
            })
            return;
        }).catch( error => {
            console.log(error);
            return;
        })
    }

    const handleEntity = event => {
        event.preventDefault();
        setEntity(event.target.value)
    }

    const handleOwner = event => {
        event.preventDefault();
        setItemInfo(prevItem => ({
            ...prevItem,
            owner: event.target.value
        }))
    }

    const addEffect = event => {
        event.preventDefault();
        setItemInfo(prevItem => ({
            ...prevItem,
            effects: [...prevItem.effects, ""]
        }))
    }

    const handleEffect = event => {
        setItemInfo(prevItem => ({
            ...prevItem,
            effects: [...prevItem.effects.slice(0, prevItem.effects.length - 1), event.target.result]
        }))
    }
    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            <form onSubmit={handleSubmit}>
                <label for="entity">
                    Entity:
                </label>
                <select id="entity" name="entity" style={{marginTop: "15px"}} onChange={handleEntity} value={entity}>
                    <option value="player">Player</option>
                    <option value="npc">NPC</option>
                </select> 
                <label for="namelist">
                    For:
                </label>
                <select id="namelist" name="namelist" onChange={handleOwner} value={itemInfo.owner}>
                    {Object.keys(players).map(key => {
                        return (
                            <option value={key}>{key}</option>
                        );
                    })}
                </select>
                <label>
                    Item Name:
                    <input type="text" name="name" value={itemInfo.name} onChange={handleChange} />
                </label>
                <button onClick={addEffect}>+</button>
                <label for="effect0">
                    Effect:
                </label>
                {itemInfo.effects.map((effect, idx) => {
                    return (
                        <input type="text" name={"effect"+idx} value={itemInfo.effects[idx]} onChange={handleEffect} />
                    );
                })}  
                <label>
                    Price:
                    <input type="number" name="price" value={itemInfo.price} onChange={handleChange} />
                </label>
                <label>
                    Notes:
                    <input type="text" name="notes" value={itemInfo.notes} onChange={handleChange} />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={itemInfo.type} onChange={handleChange} />
                </label>
                <label>
                    Amount:
                    <input type="number" name="amount" value={itemInfo.amount} onChange={handleChange} />
                </label>
                <label>
                    Is Hidden?:
                    <input type="text" name="is_hidden" value={itemInfo.is_hidden} onChange={handleChange} />
                </label>
                <label>
                    Store Access Difficulty:
                    <input type="text" name="access_diff" value={itemInfo.access_diff} onChange={handleChange} />
                </label>
                
                <button>Create Item</button>
                
                
            </form>
        </div>
    );
}