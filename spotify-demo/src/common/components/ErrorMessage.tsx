import { Alert } from '@mui/material';
import React from 'react';

interface ErrorMessageProp {
    errorMessage:string;
}

const ErrorMessage = ({errorMessage}:ErrorMessageProp) => {
  return (
    <Alert severity='error'>{errorMessage}</Alert>
  )
}

export default ErrorMessage