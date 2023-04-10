import MenuBar from '../components/appBar/MenuBar';
import FileDashboard from '../components/filesDashboard/fileDashboard';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { Buffer as BufferPolyfill } from 'buffer';
import FileList from '../components/filesList/FileList';
import { getAllFiles } from '../utils/interact';
import { useActions } from '../hooks/actions';
import Search from '../components/search/Search';

const Storage: React.FC = () => {
  const [IPFSNode, setIPFSNode] = useState<IPFSHTTPClient | undefined>();
  const { address } = useAppSelector((state) => state.address);
  const { addFile } = useActions();
  let ipfs: IPFSHTTPClient | undefined;
  const auth =
    'Basic ' +
    BufferPolyfill.from(
      '2Msny8qhAwxHlHQOOJPPs7dwD9m' + ':' + '808d6815feb12705130aeaa3f47c4356'
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

    const getFiles = async () => {
      const uploadedFiles = await getAllFiles(address);
      console.log(uploadedFiles);
      uploadedFiles.map((file: any) => {
        addFile({
          fileName: file!.name,
          fileCID: file!.cid,
          fileType: file!.fileType,
          fileSize: file!.fileSize,
          fileURL: file!.fileUrl,
        });
      });
      return uploadedFiles;
    };
    getFiles().catch(console.error);
  }, []);

  return (
    <>
      <MenuBar />
      <Search />
      <FileList node={IPFSNode} />
      <FileDashboard node={IPFSNode} />
    </>
  );
};

export default Storage;
