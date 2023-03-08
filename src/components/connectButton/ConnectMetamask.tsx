import { useState } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { connectWallet } from "../../utils/interact";

const ConnectMetamask: React.FC = () => {
  const { changeAccount } = useActions();
  const [status, setStatus] = useState("");
  const { address } = useAppSelector((state) => state.address);

  const connectWalletPressed = async () => {
    const { status, address } = await connectWallet();
    setStatus(status);
    changeAccount(address);
  };

  return (
    <div>
      <button onClick={connectWalletPressed}>
        {address.length > 0
          ? `Connected to ${String(address).substring(0, 6)}`
          : "CONNECT WALLET"}
        {status}
      </button>
    </div>
  );
};

export default ConnectMetamask;
