import { Box, Container, Typography } from '@mui/material'

export interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component="header"
        sx={{
          py: 2,
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h6" component="h1">
            Vehicles SPA
          </Typography>
        </Container>
      </Box>
      <Box component="main" sx={{ flex: 1, py: 2 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  )
}
