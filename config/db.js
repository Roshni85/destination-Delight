const mongoose = require('mongoose');
require('dotenv').config();

main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));


async function main() {
  await mongoose.connect("mongodb+srv://yadavroshni:8RHmjxsTUBO8sTpu@cluster0.vr0sopl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

