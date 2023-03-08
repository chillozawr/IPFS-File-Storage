import { useEffect, useState } from "react";
import * as IPFS from "ipfs-core";
import "./App.css";
import ConnectMetamask from "./components/connectButton/ConnectMetamask";
import FileInput from "./components/fileInput/FileInput";
import { useActions } from "./hooks/actions";
import { nodeProps } from "./utils/types";

function App() {
  const [IPFSNode, setIPFSNode] = useState<any>(null);
  // const { setNodeIPFS } = useActions();
  useEffect(() => {
    const startNode = async () => {
      const node = await IPFS.create();
      setIPFSNode(node);
      console.log("IPFS NODE STARTED...");
    };

    startNode().catch(console.error);
  }, []);

  return (
    <div className="App">
      <ConnectMetamask />
      <FileInput node={IPFSNode} />
    </div>
  );
}

export default App;
