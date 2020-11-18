import { Box, Typography } from '@material-ui/core'
import React from 'react'

export type TabPanelProps = {
  index: number
  value: number
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <Typography component="div" hidden={index !== value}>
      <Box p={3}>{children}</Box>
    </Typography>
  )
}
