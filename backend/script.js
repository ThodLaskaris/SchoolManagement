import sequelize from './config/database.js';

(async () => {
  try {
    console.log('Dropping all tables...');
    await sequelize.drop(); // Διαγράφει όλους τους πίνακες
    console.log('All tables have been dropped successfully.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    process.exit(); // Τερματίζει το script
  }
})();