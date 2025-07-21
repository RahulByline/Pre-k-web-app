const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const contentRoutes = require('./routes/contentRoutes');
const db = require('./config/db.config');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

app.use('/api/content', contentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 