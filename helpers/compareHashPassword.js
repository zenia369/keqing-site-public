const bcrypt = require("bcrypt");

module.exports = (password, hashedPassword) => {

    return bcrypt.compareSync(password, hashedPassword);
}