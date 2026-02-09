import { Box, Button, Typography } from '@mui/material'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        Что-то пошло не так
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {error.message}
      </Typography>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Попробовать снова
      </Button>
    </Box>
  )
}

export interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
