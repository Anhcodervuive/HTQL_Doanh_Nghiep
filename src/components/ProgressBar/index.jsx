import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import useProgress from '~/hooks/useProgress'

const ProgressBar = ({ isLoading }) => {
  const { progress, isVisible } = useProgress(isLoading)

  return isVisible ? (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
    }}>
      <LinearProgress variant='determinate' value={progress} />
    </Box>
  ) : null // Tự biến mất sau khi chạy xong
}

export default ProgressBar