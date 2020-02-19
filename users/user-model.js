const db = require('../data/db-config');

module.exports = {
    all,
    findById,
    add,
    update,
    remove,
    getPosts
}

function all() {
    return db('users')
}

function findById(id) {
    return db('users')
        .where({id})
        .first()
}

function add(user) {
    return db('users')
        .insert(user, 'id')
}

function update(id, changes) {
    return db('users')
        .where({id})
        .update(changes)
}

function remove(id) {
    return db('users')
        .where({id})
        .del()
}

function getPosts(id) {
    return db('posts')
        .join('users', 'posts.user_id', 'users.id')
        .select('posts.contents', 'users.username as saidBy')
        .where({user_id: id})
}