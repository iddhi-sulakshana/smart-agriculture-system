import bcrypt from "bcrypt";

// encrypt a password with bcrypt
async function encrypt(passowrd) {
    // Generate a salt using bcrypt with a cost factor of 10
    const salt = await bcrypt.genSalt(10);
    // Hash the provided password using the generated salt
    const hash = await bcrypt.hash(passowrd, salt);
    return hash;
}

//validate a password against a hashed password
async function validPassword(original, hashed) {
    return await bcrypt.compare(original, hashed);
}

export { encrypt, validPassword };
