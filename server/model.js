const mongoose = require('mongoose');

// Define Schemes
const operationSchema = new mongoose.Schema({
    keys: { type: String, required: true },
    line: { type: Number, required: true },
    column: { type: Number, required: true }
});
const snapshotSchema = new mongoose.Schema({
    index: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    user_id: { type: Number, required: true },
    history_id: { type: Number, required: true },
    operation: operationSchema
});
const historySchema = new mongoose.Schema({
    children: [snapshotSchema]
});

/*
this == model
return Promise
*/

// Create new history document
historySchema.statics.create = function(data) {
    const history = new this(data);
    return history.save();
};

// Find one history by history id
historySchema.statics.findOneById = function(id) {
    return this.findOne({id});
}

// Update history by id
historySchema.statics.updateById = function(id, data) {
    const history = this.findOneAndUpdate({id}, data, { new: true });
    return history;
}

// Delete history by id
historySchema.statics.deleteById = function(id) {
    return this.remove({id});
}

// Create Model & Export
module.exports = mongoose.model('History', historySchema);