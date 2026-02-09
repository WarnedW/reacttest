import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import { ErrorBoundary } from '@/components'
import { VehiclesPage } from '@/pages'

import { Layout } from './Layout'

export default function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <ErrorBoundary>
          <Layout>
            <VehiclesPage />
          </Layout>
        </ErrorBoundary>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
