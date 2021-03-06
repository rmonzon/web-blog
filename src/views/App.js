import React, { Component } from 'react';
import bottomLogo from '../images/leaper-footer.png'
import logo from '../images/color-logo.png'
import { Link } from 'react-router'
import './App.css';

class App extends Component {

    constructor (props) {
        super(props);

        this.state = { userLoggedIn: false };

        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.callBackAuthState = this.callBackAuthState.bind(this);
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(this.callBackAuthState);
    };

    callBackAuthState = (user) => {
        if (user) {
            // User is signed in.
            this.setState({ userLoggedIn: true});
        } else {
            // No user is signed in.
            this.setState({ userLoggedIn: false});
        }
    };

    handleLogOutClick = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }, (error) => {
            // An error happened.
            console.log(error);
        });
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <div className="header-bar">
                        <Link to="/">
                            <img className="App-logo" src={logo} alt="logo" />
                        </Link>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {this.state.userLoggedIn ?
                                <li>
                                    <Link to="/new_post">Create Post</Link>
                                </li> : null
                            }
                            {!this.state.userLoggedIn ?
                                <li>
                                    <Link to="/login">Sign In</Link>
                                </li> : null
                            }
                            {!this.state.userLoggedIn ?
                                <li>
                                    <Link to="/register">Create Account</Link>
                                </li> : null
                            }
                            {this.state.userLoggedIn ?
                                <li>
                                    <Link to="/" onClick={this.handleLogOutClick}>Log out</Link>
                                </li> : null
                            }
                        </ul>
                    </div>
                    <div className="site-heading">
                        <h2>Magic Leap</h2>
                        <hr className="small"/>
                        <span className="subheading">Engineering Blog</span>
                    </div>
                </div>

                <div className="body-container">
                    {this.props.children}
                </div>

                <div className="footer">
                    <p>Copyright © 2016 Magic Leap, Inc. </p>
                    <img src={bottomLogo} alt="bottom-Logo"/>
                </div>
            </div>
        );
    }
}

export default App;
