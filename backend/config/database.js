import { Sequelize } from 'sequelize';

// Ρυθμίσεις σύνδεσης με τη βάση δεδομένων
const sequelize = new Sequelize('student_management', 'postgres', '121203', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;
