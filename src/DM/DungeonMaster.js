import { useEffect, useState } from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Players from './tabs/Players';
import NPCs from './tabs/NPCs';
import {ip} from '../config/ip';
import {expToLevel} from '../info/leveling';
import Items from './tabs/Items';

export default function DungeonMaster() {
    const [players, setPlayers] = useState({});
    const [npcs, setNPCs] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            await fetch(ip + '/api/get/players')
            .then(res => res.json())
            .then(data => {
                data.forEach(player => {
                    setPlayers(prevPlayers => ({
                        ...prevPlayers,
                        [player.full_name]: {
                            name: player.full_name,
                            race: player.race,
                            class: player.p_class,
                            level: player.player_level,
                            exp: player.exp,
                            maxexp: expToLevel(player.player_level),
                            gold: player.gold,
                            items: {}
                        }
                    }))
                })
            })
        }
        const fetchItems = async () => {
            await fetch(ip + '/api/get/items')
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    if(players[item.item_owner]){
                        setPlayers(prevPlayers => ({
                            ...prevPlayers,
                            [item.item_owner]: {
                                ...prevPlayers[item.item_owner],
                                items: {
                                    ...prevPlayers[item.item_owner].items,
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
                    } else if (npcs[item.item_owner]){
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
                setLoading(false);
            })
        }
        const fetchNPCs = async () => {
            await fetch(ip + '/api/get/npcs')
            .then(res => res.json())
            .then(data => {
                data.forEach(npc => {
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
                })
            })
        }
        fetchPlayers();
        fetchNPCs();
        fetchItems();
    }, [isLoading])

    return (
      <>
        <div id="dm">
            <Tabs selectedTabClassName="selected-tab">
                <TabList className="player-tab">
                    <Tab>
                        Players
                    </Tab>
                    <Tab>
                        NPCs
                    </Tab>
                    <Tab>
                        Shops
                    </Tab>
                    <Tab>
                        Quests
                    </Tab>
                    <Tab>
                        Locations
                    </Tab>
                    <Tab>
                        Items
                    </Tab>
                </TabList>

                <TabPanel>
                    <Players players={players}/>
                </TabPanel>
                <TabPanel>
                    <NPCs npcs={npcs} players={players} />
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <Items players={players} />
                </TabPanel>
            </Tabs>
        </div>
      </>
    );
  }