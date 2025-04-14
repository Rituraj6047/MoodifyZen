import { useState } from 'react'
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material'

export default function PromptInput({ mood, setResponse }) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Local loading state
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!mood) return
    
    setIsLoading(true)
    try {
      // Replace with actual API call
      const mockResponses = {
        angry: "How about some heavy metal music to match your mood? Here's a playlist...",
        sad: "Let me cheer you up with a funny joke. Why don't scientists trust atoms? Because they make up everything!",
        neutral: "Would you like to hear an interesting fact? The shortest war in history was between Britain and Zanzibar in 1896. Zanzibar surrendered after 38 minutes.",
        happy: "You seem happy! Here's a motivational quote: 'The only way to do great work is to love what you do.' - Steve Jobs",
        excited: "Your excitement is contagious! Let's celebrate with some upbeat music!"
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setResponse({
        mood,
        text: mockResponses[mood],
        type: mood === 'sad' ? 'joke' : mood === 'angry' ? 'music' : 'fact'
      })
    } catch (error) {
      console.error(error)
      setResponse({
        error: "Failed to get response. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Tell me more about what you'd like
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="I'm feeling [your mood] and I'd like to [hear a joke/watch a funny video/listen to calming music...]"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        size="large"
        disabled={!mood || isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Get Recommendation'}
      </Button>
    </Box>
  )
}