const User = require('./models/users')

async function seedData() {
    try {
        await User.bulkCreate([
            { username: 'alice', password: 'password123' },
            { username: 'bob', password: 'password123' },
            { username: 'charlie', password: 'password123' }
        ], {
            ignoreDuplicates: true
        })
        console.log('Data seeded successfully!')
    } catch (error) {
        console.error('Error seeding data:', error)
    }
}

module.exports = { seedData }