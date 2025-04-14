import { useState } from 'react'
import { 
  Box, Typography, Paper, Button, Dialog, DialogTitle, 
  DialogContent, DialogActions, CircularProgress 
} from '@mui/material'
import { motion } from 'framer-motion'
import { 
  MusicNote as MusicIcon,
  MenuBook as StoryIcon,
  Mood as JokeIcon,
  TheaterComedy as ShayariIcon,
  Movie as VideoIcon
} from '@mui/icons-material'
import { generateContent } from '../lib/gemini'

const typeIcons = {
  music: <MusicIcon fontSize="large" />,
  story: <StoryIcon fontSize="large" />,
  joke: <JokeIcon fontSize="large" />,
  shayari: <ShayariIcon fontSize="large" />,
  video: <VideoIcon fontSize="large" />,
  fact: <StoryIcon fontSize="large" />
}

const contentPrompts = {
  music: (mood) => `Suggest 3 ${mood}-appropriate songs with artists. Format as bullet points. Also provide a brief reason why these match the mood.`,
  video: (mood) => `Recommend 2 ${mood}-appropriate YouTube videos with titles and channel names. Format as bullet points. Include why these are good for this mood.`,
  shayari: (mood) => `Write a ${mood}-themed shayari in Hindi (with English translation) that's 4-6 lines long.`,
  joke: (mood) => `Tell me a ${mood}-appropriate joke that's funny but clean.`,
  story: (mood) => `Tell me a very short (3-5 sentence) ${mood}-themed story.`
}

export default function AIResponse({ response, loading }) {
  const [openOptions, setOpenOptions] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)
  const [contentLoading, setContentLoading] = useState(false)

  const handleOpenOptions = () => setOpenOptions(true)
  const handleCloseOptions = () => setOpenOptions(false)

  const contentOptions = [
    { type: 'music', label: 'Music/Audio', icon: <MusicIcon /> },
    { type: 'video', label: 'Video', icon: <VideoIcon /> },
    { type: 'shayari', label: 'Shayari', icon: <ShayariIcon /> },
    { type: 'joke', label: 'Jokes', icon: <JokeIcon /> },
    { type: 'story', label: 'Story Telling', icon: <StoryIcon /> }
  ]

  const handleOptionSelect = async (option) => {
    setContentLoading(true);
    handleCloseOptions();
    
    try {
      const prompt = contentPrompts[option.type](response.mood);
      const generatedContent = await generateContent(prompt);
      
      setSelectedContent({
        type: option.type,
        data: generatedContent,
        prompt: prompt,
        timestamp: new Date().toISOString() // for debugging
      });
      
    } catch (error) {
      console.error("Full Error:", error);
      
      setSelectedContent({
        type: option.type,
        data: `Error: ${error.message || 'Failed to generate content'}\n\n` +
              `Technical Details: ${JSON.stringify({
                error: error.name,
                time: new Date().toLocaleTimeString()
              }, null, 2)}`,
        isError: true
      });
      
    } finally {
      setContentLoading(false);
    }
  }
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

        {/* Content Display Area */}
        {contentLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : selectedContent && (
          <Box sx={{ 
            mt: 3, 
            p: 3, 
            border: '1px solid #ddd', 
            borderRadius: 2,
            backgroundColor: selectedContent.isError ? '#ffebee' : '#f9f9f9'
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
            }}>
              {contentOptions.find(o => o.type === selectedContent.type)?.icon}
              {contentOptions.find(o => o.type === selectedContent.type)?.label}
            </Typography>
            
            {selectedContent.isError ? (
              <Typography color="error">{selectedContent.data}</Typography>
            ) : (
              <Typography whiteSpace="pre-wrap">{selectedContent.data}</Typography>
            )}
          </Box>
        )}
      </Paper>
    </motion.div>
  )
}