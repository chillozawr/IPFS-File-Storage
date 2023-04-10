import { useEffect, useState } from 'react';
import './App.css';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { Buffer as BufferPolyfill } from 'buffer';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useAppSelector } from './hooks/redux';
import Storage from './pages/Storage';
import { useActions } from './hooks/actions';

function App() {
  const [IPFSNode, setIPFSNode] = useState<IPFSHTTPClient | undefined>();
  const { address } = useAppSelector((state) => state.address);
  const { changeAccount } = useActions();
  let ipfs: IPFSHTTPClient | undefined;
  // const { setNodeIPFS } = useActions();
  const auth =
    'Basic ' +
    BufferPolyfill.from(
      import.meta.env.VITE_INFURA_PROJECT_ID +
        ':' +
        import.meta.env.VITE_INFURA_API_SECRET_KEY
    ).toString('base64');

  useEffect(() => {
    try {
      ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: auth,
        },
      });
    } catch (e: any) {
      console.error('IPFS Error', e);
      ipfs = undefined;
    }
    setIPFSNode(ipfs);
    if (sessionStorage.getItem('account')) {
      changeAccount(sessionStorage!.getItem('account')!);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/yourstorage'} element={<Storage />} />
      </Routes>
    </div>
  );
}

export default App;
