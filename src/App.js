import {useState, useEffect} from 'react';
import Login from './pages/Login';
import PlayerList from './pages/PlayerList';
import CreatePlayer from './pages/CreatePlayer';
import Player from './pages/Player';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import DungeonMaster from './DM/DungeonMaster';

export default function App() {
    //const [player, setPlayer] = useState(null);

    const useSessionStorage = (keyName, defaultValue) => {
      const [storedValue, setStoredValue] = useState(() => {
        try {
          const value = window.sessionStorage.getItem(keyName);
    
          if (value) {
            return JSON.parse(value);
          } else {
            window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
          }
        } catch (err) {
          return defaultValue;
        }
      });
    
      const setValue = newValue => {
        try {
          window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
      };
    
      return [storedValue, setValue];
    };

    const [player, setPlayer] = useSessionStorage('player', null);
    
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/playerlist",
          element: <PlayerList setPlayer={setPlayer}/>
        },
        {
          path: "/createplayer",
          element: <CreatePlayer />
        },
        {
          path: "/player",
          element: <Player player={player}/>
        },
        {
          path: "/dm",
          element: <DungeonMaster />
        }
    ])

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
    
}