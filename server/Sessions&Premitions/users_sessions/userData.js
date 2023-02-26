const jsonfile = require('jsonfile')
const file = './users.json'
const getUsers = () => {
    return jsonfile.readFile(file)
}
const setUsers = async (user) => {
    await jsonfile.writeFile(file, user)
    return Done
}


module.exports = { getUsers, setUsers }