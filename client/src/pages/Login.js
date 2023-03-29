import {NavLink} from 'react-router-dom';

export default function Login() {
    return (
      <>
        <div id="login">
            <NavLink exact to="/playerlist" style={{display: "block"}}>
                <button>Player Login</button>
            </NavLink>
            <NavLink exact to="/dm" style={{display: "block"}}>
              <button>DM Login</button>
            </NavLink>
            
        </div>
      </>
    );
  }