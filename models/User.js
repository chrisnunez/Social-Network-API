const { Schema, Types} = require('mongoose');

const userSchema = new Schema (
    {
        user: {
            type: String,
            unique: true,
            required: true,
            trim: true, 
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

        thoughts: {
            
        }

    }
)