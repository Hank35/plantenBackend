const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClimateSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: [true, 'Climate name is required']
    },
    averageTemp:{
        type: Number,
        required: [true, 'Average temperature is required']
    },
    humidity:{
        type: Number,
        required: [true, 'Humidity is required']
    }
})

const Climate = mongoose.model('climate', ClimateSchema);
module.exports = Climate;