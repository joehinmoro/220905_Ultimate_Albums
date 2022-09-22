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

// STATICS
// signup static method
userSchema.statics.signup = async function (email, password, role) {
    // validate email and password not null
    if (!email || !password) throw Error("fields must be filled");

    // validate email format and password strength
    if (!isEmail(email)) throw Error("email is invalid");
    if (!isStrongPassword(password)) throw Error("password is weak");

    // validate email is available
    const emailExists = await this.findOne({ email });
    if (emailExists) throw Error("email is already in use by another user");

    // hash password
    const passwordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    // create and return user
    const user = await this.create({ email, password: hashedPassword });
    return user;
};

// login static method
userSchema.statics.login = async function (email, password) {
    // validate email and password not null
    if (!email || !password) throw Error("fields must be filled");

    // validate email
    const user = await this.findOne({ email });
    if (!user) throw Error("account not found");

    // validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw Error("password is invalid");

    // return user
    return user;
};

// MIDDLEWARE
// signup
userSchema.pre("save", async function (next) {
    // user password hashing
    // generate salt
    console.log(this);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this);

    next();
});

userSchema.post("save", async function () {
    // user password hashing
    // generate salt
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(this.password)
    console.log(this);

    // next();
});

// MODEL
const User = model("User", userSchema);

// EXPORTS
module.exports = { User };
