const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: [true, 'Plant name is required']
    },
    description:{
        type: String,
        required: [true, 'Plant description is required']
    },
    family:{
        type: String,
        required: [true, 'Plant family is required']
    },
    climate:{
        type: Schema.Types.ObjectId,
        ref: 'climate'
    },
    imageLink:{
        type: String,
        required: [true, 'Plant image link is required']
    },
    waterNeed: {
        type: String,
        required: [true, 'Waterneed is required']
    },
    sunNeed:{
        type: String,
        required: [true, 'Sunneed is required']
    }
});

const Plant = mongoose.model('plant', PlantSchema);
module.exports = Plant;