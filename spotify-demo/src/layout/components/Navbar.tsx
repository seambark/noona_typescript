import { Box } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/LoginButton'

const Navbar = () => {
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" marginBottom="15px">
        <LoginButton />
    </Box>
  )
}

export default Navbar