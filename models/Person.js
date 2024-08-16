const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }
});

// Use a regular function to bind `this` to the document
personSchema.pre('save', async function (next) {
    const person = this;

    // Hash the password only if it's new or has been modified
    if (!person.isModified('password')) return next();

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed password
        person.password = hashedPassword;
        next();
    } catch (err) {
        next(err); // Pass error to the next middleware
    }
});

// Method to compare provided password with hashed password
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Use bcrypt to compare
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw err;
    }
};

// Create the Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;

// Note:-> Password(user entered) -> sdcbvhsdvjbbjnkdsb (in database) using post