import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";


class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      client:null,
      connected: false};
  }

  connectWs = () =>{
    console.log('voy a entrar');
    const client = new W3CWebSocket('wss://echo.websocket.org');
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      this.setState({connected: true})
    };
    client.onmessage = (message) => {
      console.log(message);
    };
    this.setState({client:client});
  }

  disconnectWs = () =>{
    console.log('me voy a desconectar');
    const {client}=this.state
    client.onclose = () =>{
      console.log('WebSocket Client DISConnected');
      this.setState({
        client: null,
        connected: false})
    }
    client.close()

  }

  send_message = () =>{
    console.log('voy a enviar algo');
    this.state.client.send(JSON.stringify({
     type: "contentchange",
     content: 'este es un texto'
   }));
  }

  render() {
    return (
      <div>
        Practical Intro To WebSockets.
        <div>{this.state.connected ? 'conectado' : 'no conectado'}</div>
        {this.state.connected ?
          <button onClick={this.disconnectWs} > Disconnect </button>
          :
           <button onClick={this.connectWs} > Connect </button>
        }

        <button onClick={this.send_message}> Click Me! </button>
      </div>
    );
  }
}

export default App;
