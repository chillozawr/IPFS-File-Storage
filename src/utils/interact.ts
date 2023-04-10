import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import contractABI from '../contract/contract-abi.json';
import contractABIPg from '../contract/contract-abi-pg.json';
import { AbiItem } from 'web3-utils';
import { txParams } from './types';
import Web3 from 'web3';
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS_ETHEREUM;
const contractAddressPolygon = import.meta.env.VITE_CONTRACT_ADDRESS_POLYGON;

const alchemyKey = import.meta.env.VITE_ALCHEMY_API_KEY;
const alchemyKeyPolygon = import.meta.env.VITE_ALCHEMY_API_KEY_POLYGON;
const web3 = createAlchemyWeb3(alchemyKeyPolygon!);

export const fileStorageContract = new web3.eth.Contract(
  contractABIPg as AbiItem[],
  contractAddressPolygon
);

export const loadCurrentFile = async (
  address: string,
  cid: string,
  name: string,
  size: number,
  fileURL: string,
  fileType: string
) => {
  const txParams: txParams = {
    to: contractAddressPolygon,
    from: address,
    data: fileStorageContract.methods
      .addFile(cid, name, size, fileURL, fileType)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getFile = async (address: string, cid: string) => {
  const txParams: txParams = {
    to: contractAddressPolygon,
    from: address,
    data: fileStorageContract.methods.getFile(cid).encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });
    console.log('File deleted....');
  } catch (err: any) {
    console.log(err.message);
  }
};

export const deleteFileFromBlockchain = async (
  address: string,
  cid: string
) => {
  const txParams: txParams = {
    to: contractAddressPolygon,
    from: address,
    data: fileStorageContract.methods.deleteFile(cid).encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getAllFiles = async (address: string) => {
  const txParams: txParams = {
    to: contractAddressPolygon,
    from: address,
    data: fileStorageContract.methods.getAllFilesOfUser().encodeABI(),
  };
  try {
    const givenFiles = await fileStorageContract.methods
      .getAllFilesOfUser()
      .call({
        to: contractAddressPolygon,
        from: address,
      });
    return givenFiles;
  } catch (err: any) {
    console.log(err.message);
  }
};

export const connectWallet = async () => {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

export const formatSizeUnits = (bytes: any) => {
  if ((bytes >> 30) & 0x3ff)
    bytes = (bytes >>> 30) + '.' + (bytes & (3 * 0x3ff)) + 'GB';
  else if ((bytes >> 20) & 0x3ff)
    bytes = (bytes >>> 20) + '.' + (bytes & (2 * 0x3ff)) + 'MB';
  else if ((bytes >> 10) & 0x3ff)
    bytes = (bytes >>> 10) + '.' + (bytes & 0x3ff) + 'KB';
  else if ((bytes >> 1) & 0x3ff) bytes = (bytes >>> 1) + 'Bytes';
  else bytes = bytes + 'Byte';
  return bytes;
};

export const filesMock = [
  {
    fileCID: 'cid1',
    fileName: 'name1',
    fileType: 'type1',
    fileSize: 1,
    fileURL: 'url1',
  },
  {
    fileCID: 'cid2',
    fileName: 'name2',
    fileType: 'type2',
    fileSize: 2,
    fileURL: 'url2',
  },
  {
    fileCID: 'cid3',
    fileName: 'name3',
    fileType: 'type3',
    fileSize: 3,
    fileURL: 'url3',
  },
  {
    fileCID: 'cid4',
    fileName: 'name4',
    fileType: 'type4',
    fileSize: 4,
    fileURL: 'url4',
  },
  {
    fileCID: 'cid5',
    fileName: 'name5',
    fileType: 'type5',
    fileSize: 5,
    fileURL: 'url5',
  },
  {
    fileCID: 'cid6',
    fileName: 'name6',
    fileType: 'type6',
    fileSize: 6,
    fileURL: 'url6',
  },
  {
    fileCID: 'cid7',
    fileName: 'name7',
    fileType: 'type7',
    fileSize: 7,
    fileURL: 'url7',
  },
  {
    fileCID: 'cid8',
    fileName: 'name8',
    fileType: 'type8',
    fileSize: 8,
    fileURL: 'url8',
  },
  {
    fileCID: 'cid9',
    fileName: 'name9',
    fileType: 'type9',
    fileSize: 9,
    fileURL: 'url9',
  },
  {
    fileCID: 'cid10',
    fileName: 'name10',
    fileType: 'type10',
    fileSize: 10,
    fileURL: 'url10',
  },
];
