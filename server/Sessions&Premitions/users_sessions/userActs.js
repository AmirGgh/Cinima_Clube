const userFile = require('./userData')

const getAllUsers = async () => {
    const { users } = await userFile.getUsers()
    return users
}
const getUserByUID = async (id) => {
    const { users } = await userFile.getUsers()
    return users.find((user) => user.id === id)
}

const updateUsers = async (user, id) => {
    const { users } = await userFile.getUsers()
    const index = users.findIndex(user => user.id === id)
    if (index != -1) {
        users[index] = user
        await userFile.setUsers({ "users": users })
        return 'update!'
    } else {
        return 'user not found!'
    }
}
const deleteUsers = async (id) => {
    let { users } = await userFile.getUsers()
    const lenUsers = users.length
    users = users.filter(user => user.id !== id)
    if (lenUsers != users.length) {
        await userFile.setUsers({ "users": users })
        return 'deleted!'
    } else {
        return 'user not found!'
    }
}

module.exports = { getAllUsers, getUserByUID, updateUsers, deleteUsers }