import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { motion } from 'framer-motion'
import { 
  MusicNote as MusicIcon,
  MenuBook as StoryIcon,
  Mood as JokeIcon,
  TheaterComedy as ShayariIcon,
  Movie as VideoIcon
} from '@mui/icons-material'
import { useState } from 'react'

const typeIcons = {
  music: <MusicIcon fontSize="large" />,
  story: <StoryIcon fontSize="large" />,
  joke: <JokeIcon fontSize="large" />,
  shayari: <ShayariIcon fontSize="large" />,
  video: <VideoIcon fontSize="large" />,
  fact: <StoryIcon fontSize="large" />
}

export default function AIResponse({ response, loading }) {
  const [openOptions, setOpenOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  if (loading) return null
  if (!response) return null
  
  if (response.error) {
    return (
      <Paper elevation={3} sx={{ p: 3, my: 3, backgroundColor: '#ffebee' }}>
        <Typography color="error">{response.error}</Typography>
      </Paper>
    )
  }

  const handleOpenOptions = () => setOpenOptions(true)
  const handleCloseOptions = () => setOpenOptions(false)

  const contentOptions = [
    { type: 'music', label: 'Music/Audio', icon: <MusicIcon /> },
    { type: 'video', label: 'Video', icon: <VideoIcon /> },
    { type: 'shayari', label: 'Shayari', icon: <ShayariIcon /> },
    { type: 'joke', label: 'Jokes', icon: <JokeIcon /> },
    { type: 'story', label: 'Story Telling', icon: <StoryIcon /> }
  ]

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    // Here you would typically make an API call based on the selected option
    console.log(`Selected: ${option.label}`)
    handleCloseOptions()
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
        
        <Button 
          variant="contained" 
          onClick={handleOpenOptions}
          sx={{ mt: 2 }}
        >
          Choose Content Type
        </Button>

        {/* Options Dialog */}
        <Dialog open={openOptions} onClose={handleCloseOptions}>
          <DialogTitle>Select Content Type</DialogTitle>
          <DialogContent>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              p: 2
            }}>
              {contentOptions.map((option) => (
                <Button
                  key={option.type}
                  variant="outlined"
                  startIcon={option.icon}
                  onClick={() => handleOptionSelect(option)}
                  sx={{
                    height: '100px',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOptions}>Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Selected Option Display */}
        {selectedOption && (
          <Box sx={{ mt: 3, p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              {selectedOption.label} Content
            </Typography>
            <Typography>
              {`Here would be your ${selectedOption.type} content.`}
              <br />
              {`In a real app, this would show actual ${selectedOption.type}.`}
            </Typography>
          </Box>
        )}
      </Paper>
    </motion.div>
  )
}