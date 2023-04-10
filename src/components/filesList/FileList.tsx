import { useAppSelector } from '../../hooks/redux';
import { nodeProps } from '../../utils/types';
import { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import iconfile from '../../assets/icons8-document.svg';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Box, Modal, Paper } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useActions } from '../../hooks/actions';
import { deleteFileFromBlockchain, filesMock } from '../../utils/interact';
import FileSaver from 'file-saver';
import recFileType from '../../utils/recFileType';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FileList: React.FC<nodeProps> = (props: nodeProps) => {
  const { address } = useAppSelector((state) => state.address);
  const { searchPhrase } = useAppSelector((state) => state.file);
  const { deleteFile } = useActions();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [url, setUrl] = useState<string>('');
  let { files } = useAppSelector((state) => state.file);
  let fileUrl: string;
  const handleGet = async (cid: string, fileType: string, fileName: string) => {
    const content = [];
    const stream = await props.node!.cat(cid);
    for await (const chunk of stream) {
      content.push(chunk);
    }
    const file = recFileType(fileType, content);
    fileUrl = URL.createObjectURL(file!);
    FileSaver.saveAs(file!, fileName);
  };

  const handleDelete = async (cid: string, size: number) => {
    await deleteFileFromBlockchain(address, cid);
    await deleteFile({ cid, size });
  };

  return (
    // <Grid
    //   container
    //   rowSpacing={1}
    //   columnSpacing={{ xs: 2, sm: 3, md: 3 }}
    //   sx={{ zIndex: 0 }}
    // >
    // {filesMock
    //   .filter((file) => file.fileName.includes(searchPhrase))
    //   .map((file) => {
    //     return (
    //       <Grid item xs={2} sm={4} md={12} key={file.fileCID}>
    //         <Item>
    //           <h3>{file.fileName}</h3>
    //           <img src={iconfile} alt="" />
    //           <button
    //             onClick={() => {
    //               handleGet(file.fileCID, file.fileType, file.fileName);
    //             }}
    //           >
    //             <FileDownloadIcon />
    //           </button>
    //           <button onClick={handleOpen}>
    //             <FileOpenIcon />
    //           </button>
    //           <button
    //             onClick={() => {
    //               handleDelete(file.fileCID);
    //             }}
    //           >
    //             <DeleteOutlineIcon />
    //           </button>
    //         </Item>
    //         <Modal
    //           open={open}
    //           onClose={handleClose}
    //           aria-labelledby="modal-modal-title"
    //           aria-describedby="modal-modal-description"
    //         >
    //           <iframe src={file.fileURL} width="100%" height="800px"></iframe>
    //         </Modal>
    //       </Grid>
    //     );
    //   })}
    // </Grid>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
        width: 1600,
      }}
    >
      {files
        .filter((file) => file.fileName.includes(searchPhrase))
        .map((file) => {
          return (
            <Box sx={{ m: 1 }} key={file.fileCID}>
              <Item>
                <h3>{file.fileName}</h3>
                <img src={iconfile} alt="" />
                <button
                  onClick={() => {
                    handleGet(file.fileCID, file.fileType, file.fileName);
                  }}
                >
                  <FileDownloadIcon />
                </button>
                <button onClick={handleOpen}>
                  <FileOpenIcon />
                </button>
                <button
                  onClick={() => {
                    handleDelete(file.fileCID, file.fileSize);
                  }}
                >
                  <DeleteOutlineIcon />
                </button>
              </Item>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <iframe src={file.fileURL} width="100%" height="800px"></iframe>
              </Modal>
            </Box>
          );
        })}
    </Box>
  );
};

export default FileList;
