module.exports = {
    schema: true,
    attributes: {
        token: {
            type: 'string'
        },
        createdAt: {
            type: 'date'
        },
        lastUsed: {
            type: 'date'
        },
        owner: {
            model: 'user'
        }
    }
};