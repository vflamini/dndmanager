import { useEffect, useState } from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Inventory from './tabs/Inventory';
import {ip} from '../config/ip';

export default function Player(props) {

    const [playerInfo, setPlayerInfo] = useState({
        name: props.player,
        race: null,
        class: null,
        level: null,
        exp: null,
        gold: null
    })

    

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
        fetchPlayerData();
    }, [])
    return (
      <>
        <div id="player">
            <Tabs>
                <TabList>
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
            </Tabs>
        </div>
      </>
    );
  }