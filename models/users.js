// IMPORTS
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");

// SCHEMA
const userSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "please provide email"],
            validate: [isEmail, "please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "please provide password"],
            minlength: [6, "password must be at least 6 chars"],
            validate: [isStrongPassword, "please enter a strong password"],
        },
    },
    { timestamps: true }
);

// login static method
userSchema.statics.login = async function (email, password) {
    // validate email and password not null
    if (!email) throw Error("login:email, email field must not be empty");
    if (!password) throw Error("login:password, password field must not be empty");

    // validate email format
    if (!isEmail(email)) throw Error("login:email, enter a valid email");

    // validate email
    const user = await this.findOne({ email });
    if (!user) throw Error("login:email, email not registered to an account");

    // validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw Error("login:password, incorrect password");

    // return user
    return user;
};

// MIDDLEWARE
// signup
userSchema.pre("save", async function (next) {
    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// MODEL
const User = model("User", userSchema);

// EXPORTS
module.exports = { User };
