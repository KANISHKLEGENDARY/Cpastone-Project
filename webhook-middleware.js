const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'running', 
    service: 'Open WebUI Webhook Middleware' 
  });
});

// Webhook endpoint for Open WebUI
app.post('/webhook/open-webui', (req, res) => {
  console.log('\n📨 Received from Open WebUI:');
  console.log('Message:', req.body.message);
  
  const { message, chat_id, user } = req.body;
  
  // Create prompt object
  const promptData = {
    timestamp: new Date().toISOString(),
    message: message || 'No message',
    chat_id: chat_id || 'unknown',
    user: user || 'anonymous',
    status: 'pending'
  };
  
  // Save to file
  const promptFile = path.join(__dirname, '.pending-prompt');
  fs.writeFileSync(promptFile, JSON.stringify(promptData, null, 2));
  
  console.log('✅ Prompt saved to .pending-prompt\n');
  
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Webhook middleware running on http://localhost:${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhook/open-webui`);
});