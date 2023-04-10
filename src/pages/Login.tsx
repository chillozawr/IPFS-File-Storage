import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { connectWallet } from '../utils/interact';

const Login: React.FC = () => {
  const { changeAccount } = useActions();
  const [status, setStatus] = useState('');
  const { address } = useAppSelector((state) => state.address);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('account')) {
      changeAccount(sessionStorage!.getItem('account')!);
      navigate('/yourstorage');
    }
  });

  const connectWalletPressed = async () => {
    const address = await connectWallet();
    sessionStorage.setItem('account', address);
    setStatus(status);
    console.log(address);
    changeAccount(address);
    navigate('/yourstorage');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Button
            onClick={connectWalletPressed}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {address.length > 0
              ? `Connected to ${String(address).substring(0, 6)}`
              : 'CONNECT WALLET'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
