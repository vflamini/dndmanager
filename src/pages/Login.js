import {NavLink} from 'react-router-dom';
import '../css/login.css';

export default function Login() {
    return (
      <>
        <div id="login">
            <img src="applogo.png"></img>
            <NavLink exact to="/playerlist" style={{display: "block"}}>
              <button className="animated-button1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                  Player Login
              </button>
            </NavLink>
            <NavLink exact to="/dm" style={{display: "block"}}>
              <button className="animated-button1">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                DM Login
              </button>
            </NavLink>
            
        </div>
      </>
    );
  }