const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection')
const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/social-network-API', {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

db.once('open', ()  => {
    app.listen(PORT, () => {console.log(`Connected on localhost:${PORT}`);

});
    
});

