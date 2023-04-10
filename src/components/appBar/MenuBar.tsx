import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useAppSelector } from '../../hooks/redux';
import { formatSizeUnits } from '../../utils/interact';

const MenuBar = () => {
  const { address } = useAppSelector((state) => state.address);
  const { files, storageCapacity } = useAppSelector((state) => state.file);

  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,
        },
      }}
      variant="permanent"
    >
      <Box>
        <Typography variant="h3" sx={{ color: 'black' }}>
          IPFS FILE STORAGE
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'neutral.700' }} />
      <Box>
        <Typography variant="h6" sx={{ color: 'black', my: 2, px: 1 }}>
          {`${String(address).substring(0, 8)}...${String(address).slice(-6)}`}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'neutral.700' }} />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: 'black' }}>
          Recently added
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {files.slice(-6).map((file) => {
            return (
              <ListItem key={file.fileCID}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.fileName.toString()}
                  secondary={`${file.fileSize} Bytes`}
                  sx={{ color: 'black' }}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Typography variant="h6" sx={{ color: 'black' }}>
          {`${formatSizeUnits(storageCapacity)} / 5.00 GB`}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default MenuBar;
