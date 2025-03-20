const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend
  credentials: true                 // Allow cookies/session
}));
