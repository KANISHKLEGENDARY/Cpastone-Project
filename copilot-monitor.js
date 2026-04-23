const fs = require('fs');
const path = require('path');

const PROMPT_FILE = path.join(__dirname, '.pending-prompt');
const PROCESSED_FILE = path.join(__dirname, '.processed-prompt');

console.log('👁️  Monitoring for prompts from Open WebUI...');
console.log(`📁 Watching: ${PROMPT_FILE}\n`);

// Monitor for new prompts
fs.watch(path.dirname(PROMPT_FILE), (eventType, filename) => {
  if (filename === '.pending-prompt' && eventType === 'change') {
    setTimeout(() => {
      try {
        // Read the prompt
        const promptData = JSON.parse(fs.readFileSync(PROMPT_FILE, 'utf8'));
        
        // Check if already processed
        if (fs.existsSync(PROCESSED_FILE)) {
          const processed = JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf8'));
          if (processed.timestamp === promptData.timestamp) {
            return; // Already processed
          }
        }
        
        console.log('\n📥 NEW PROMPT RECEIVED:');
        console.log('═══════════════════════════════════');
        console.log(`Message: ${promptData.message}`);
        console.log(`From: ${promptData.user}`);
        console.log(`Time: ${promptData.timestamp}`);
        console.log('═══════════════════════════════════');
        console.log('💡 OPEN VS CODE COPILOT AND PASTE THIS:');
        console.log(`➡️  ${promptData.message}\n`);
        
        // Mark as processed
        fs.writeFileSync(PROCESSED_FILE, JSON.stringify(promptData, null, 2));
        
      } catch (error) {
        console.error('❌ Error:', error.message);
      }
    }, 100); // Small delay to ensure file is written
  }
});

// Keep script running
console.log('Waiting for prompts... (Press Ctrl+C to stop)\n');
process.stdin.resume();