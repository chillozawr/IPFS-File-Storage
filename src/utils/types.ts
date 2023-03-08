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
  node: any;
}
