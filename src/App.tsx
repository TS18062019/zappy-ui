import { Button } from "@mui/material";
import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useState } from "react";

function App() {

  const [client, setClient] = useState<Client>();
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {

    const c = new Client({
      brokerURL: "ws://192.168.0.105:8080/ws"
    });

    c.onConnect = frame => {
      setConnected(true);
      console.log('Connected: ', frame);
      c.subscribe('/zappy/activePeers', (msg) => {
        console.log(msg.body);
      });
    }

    c.onWebSocketError = error => {
      console.error('Error with websocket', error);
    }

    c.onStompError = frame => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    }

    setClient(c);

    return () => disconnect();
  }, []);

  const sendMessage = useCallback(() => {
    client?.publish({
      destination: "/app/files",
      body: JSON.stringify([
        "/home/tanmoy/Downloads/text"
      ])
    });
  }, [client]);

  const connect = useCallback(() => {
    client?.activate();
  }, [client]);

  const disconnect = useCallback(() => {
    setConnected(false);
    client?.deactivate();
  }, [client]);

  return (
    <>
      {!connected && <Button onClick={connect}>Connect</Button>}
      {
        connected && (
          <>
            <Button onClick={sendMessage}>Send</Button>
            <Button onClick={disconnect}>Disconnect</Button>
          </>
        )
      }
    </>
  )
}

export default App
