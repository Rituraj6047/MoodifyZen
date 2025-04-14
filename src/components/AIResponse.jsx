import { Box, Typography, Paper, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { 
  MusicNote as MusicIcon,
  MenuBook as StoryIcon,
  Mood as JokeIcon,
  TheaterComedy as ShayariIcon,
  Movie as VideoIcon
} from '@mui/icons-material'

const typeIcons = {
  music: <MusicIcon fontSize="large" />,
  story: <StoryIcon fontSize="large" />,
  joke: <JokeIcon fontSize="large" />,
  shayari: <ShayariIcon fontSize="large" />,
  video: <VideoIcon fontSize="large" />,
  fact: <StoryIcon fontSize="large" />
}

export default function AIResponse({ response, loading }) {
  if (loading) return null
  if (!response) return null
  
  if (response.error) {
    return (
      <Paper elevation={3} sx={{ p: 3, my: 3, backgroundColor: '#ffebee' }}>
        <Typography color="error">{response.error}</Typography>
      </Paper>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 3, my: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {typeIcons[response.type] || typeIcons.fact}
          <Typography variant="h6" component="div">
            {response.type === 'joke' ? 'Joke for you' : 
             response.type === 'music' ? 'Music recommendation' :
             response.type === 'fact' ? 'Interesting fact' : 
             'Recommendation for you'}
          </Typography>
        </Box>
        <Typography paragraph>{response.text}</Typography>
        
        {/* Placeholder for media content */}
        {response.type === 'music' && (
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" startIcon={<MusicIcon />}>
              Play Sample Music
            </Button>
          </Box>
        )}
        
        {response.type === 'video' && (
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" startIcon={<VideoIcon />}>
              Watch Recommended Video
            </Button>
          </Box>
        )}
      </Paper>
    </motion.div>
  )
}