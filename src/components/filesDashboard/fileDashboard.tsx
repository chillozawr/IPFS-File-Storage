import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useState } from 'react';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { loadCurrentFile } from '../../utils/interact';
import { nodeProps } from '../../utils/types';

const FileInput = styled(Input)({
  display: 'none',
});

const UploadButton = styled(Button)({
  marginLeft: '16px',
});

const FileDashboard: React.FC<nodeProps> = (props: nodeProps) => {
  const [open, setOpen] = useState(false);
  const { addFile } = useActions();
  const { address } = useAppSelector((state) => state.address);

  const [file, setFile] = useState<File | null>(null);
  const handleUpload = async () => {
    const selectedFile = await file!.arrayBuffer();
    console.log(file!.name.split('.').pop());
    const added = await props.node!.add(selectedFile);

    await loadCurrentFile(
      address,
      added.cid.toString(),
      file!.name,
      file!.size,
      `https://ipfs.io/ipfs/${added.cid.toString()}`,
      file!.name.split('.').pop()!
    );
    addFile({
      fileName: file!.name,
      fileCID: added.cid.toString(),
      fileType: file!.name.split('.').pop()!,
      fileSize: file?.size!,
      fileURL: `https://ipfs.io/ipfs/${added.cid.toString()}`,
    });
    handleClose();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFile(event.target.files![0]);
    console.log(await event.target.files![0].arrayBuffer());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  return (
    <div>
      <Fab
        sx={{ position: 'absolute', bottom: 0, right: 0, mr: 1, mb: 1 }}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          {!file ? (
            <>
              <label htmlFor="file-input">
                <Button variant="outlined" component="span">
                  Choose File
                </Button>
              </label>
              <FileInput
                id="file-input"
                type="file"
                onChange={handleFileChange}
              />
            </>
          ) : (
            <div>
              <strong>{file.name}</strong> ({file.size} bytes)
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <UploadButton
            variant="contained"
            color="primary"
            onClick={handleUpload}
          >
            Upload
          </UploadButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileDashboard;
