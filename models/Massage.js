const mongooes = require('mongoose');

const HospitalSchema = new mongooes.Schema({
    name: {
        type: String,
        reqwuired: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        reqwuired: [true, 'Please add an address']
    },
    district: {
        type: String,
        reqwuired: [true, 'Please add a district']
    },
    province: {
        type: String,
        reqwuired: [true, 'Please add a province']
    },
    postalcode:{
        type: String,
        reqwuired: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postalcode can not be more than 5 characters']
    },
    tel:{
        type: String,
    },
    region:{
        type: String,
        reqwuired: [true, 'Please add a region']
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

HospitalSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'hospital',
    justOne: false
});

HospitalSchema.pre('deleteOne',{document: true, query: false}, async function(next){
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model('Appointment').deleteMany({hospital: this._id});
    next();
})

module.exports = mongooes.model('Hospital', HospitalSchema);