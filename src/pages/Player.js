import { useEffect, useState } from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Inventory from './tabs/Inventory';
import NPCs from './tabs/NPCs';
import {ip} from '../config/ip';
import '../css/playerscreen.css';

export default function Player(props) {

    const [playerInfo, setPlayerInfo] = useState({
        name: props.player,
        race: null,
        class: null,
        level: null,
        exp: null,
        gold: null,
        items: {}
    })

    const [npcs, setNPCs] = useState({})

    useEffect(() => {
        const fetchPlayerData = async () => {
            await fetch(ip + '/api/get/players/full_name/' + playerInfo.name)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPlayerInfo({
                    ...playerInfo,
                    race: data[0].race,
                    class: data[0].p_class,
                    level: data[0].player_level,
                    exp: data[0].exp,
                    gold: data[0].gold
                })
            }).catch(error => {
                console.log(error);
                return;
            })
        }
        const fetchPlayerItems = async () => {
            await fetch(ip + '/api/get/items/item_owner/' + playerInfo.name)
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    setPlayerInfo(prevInfo => ({
                        ...prevInfo,
                        items: {
                            ...prevInfo.items,
                            [item.item_name]: {
                                id: item.item_id,
                                owner: item.item_owner,
                                effects: item.effects,
                                equipped: item.equipped,
                                type: item.item_type,
                                is_hidden: item.is_hidden,
                                access_diff: item.access_diff,
                                price: item.price,
                                amount: item.amount,
                                notes: item.notes
                            }
                        }
                    }))
                })
            })
        }
        const fetchNPCItems = async () => {
            await fetch(ip + "/api/get/items")
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    if (npcs[item.item_owner]){
                        setNPCs(prevNPCs => ({
                            ...prevNPCs,
                            [item.item_owner]: {
                                ...prevNPCs[item.item_owner],
                                items: {
                                    ...prevNPCs[item.item_owner].items,
                                    [item.item_name]: {
                                        id: item.item_id,
                                        owner: item.item_owner,
                                        effects: item.effects,
                                        equipped: item.equipped,
                                        type: item.item_type,
                                        is_hidden: item.is_hidden,
                                        access_diff: item.access_diff,
                                        price: item.price,
                                        amount: item.amount,
                                        notes: item.notes
                                    }
                                }
                            }
                        }))
                    }
                })
            })
        }
        const fetchNPCs = async () => {
            await fetch(ip + '/api/get/npcs')
            .then(res => res.json())
            .then(data => {
                data.forEach(npc => {
                    if (npc.players_avail.includes(playerInfo.name)){
                        setNPCs(prevNPCs => ({
                            ...prevNPCs,
                            [npc.full_name]: {
                                name: npc.full_name,
                                race: npc.race,
                                class: npc.n_class,
                                location: npc.char_location,
                                notes: npc.notes,
                                players_avail: npc.players_avail,
                                items: {}
                            }
                        }))
                    }
                })
            })
        }
        fetchPlayerData();
        fetchPlayerItems();
        fetchNPCs();
        fetchNPCItems();
    }, [])
    return (
      <>
        <div id="player">
            <Tabs selectedTabClassName="selected-tab">
                <TabList className="player-tab">
                    <Tab>
                        Inventory
                    </Tab>
                    <Tab>
                        Equipped
                    </Tab>
                    <Tab>
                        Quests
                    </Tab>
                    <Tab>
                        NPCs
                    </Tab>
                    <Tab>
                        Locations
                    </Tab>
                    <Tab>
                        Shop Lists
                    </Tab>
                </TabList>

                <TabPanel>
                    <Inventory playerInfo={playerInfo}/>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <NPCs npcs={npcs}/>
                </TabPanel>
            </Tabs>
        </div>
      </>
    );
  }