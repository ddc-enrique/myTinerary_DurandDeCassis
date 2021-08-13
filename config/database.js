const mongoose = require('mongoose')

mongoose
   .connect(process.env.MONGODB, {// conecto la direccion del cluster0 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
   })
   .then(() => console.log('MyTineraryDB Connected'))
   .catch((error) => console.log(error))