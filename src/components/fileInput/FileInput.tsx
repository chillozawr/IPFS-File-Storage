import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { loadCurrentFile } from '../../utils/interact';
import { nodeProps } from '../../utils/types';

const FileInput: React.FC<nodeProps> = (props: nodeProps) => {
  const { address } = useAppSelector((state) => state.address);

  const [file, setFile] = useState<File | null>(null);
  const handleUpload = async () => {
    const selectedFile = await file!.arrayBuffer();
    const added = await props.node.add(selectedFile);
    await loadCurrentFile(address, added.cid.toString());
    console.log(added.cid.toString());
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFile(event.target.files![0]);
    console.log(await event.target.files![0].arrayBuffer());
  };

  return (
    <div>
      <input
        // style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      {/* <label htmlFor="raised-button-file"> */}
      <Button component="span" onClick={handleUpload}>
        Upload
      </Button>
      {/* </label> */}
    </div>
  );
};

export default FileInput;
