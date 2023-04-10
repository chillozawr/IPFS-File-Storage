import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';

export interface Connection {
  status: string;
  address: string;
}

export interface txParams {
  to: string;
  from: string;
  data: string;
}

export interface nodeProps {
  node: IPFSHTTPClient | undefined;
}
