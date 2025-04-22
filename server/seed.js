const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Organization = require('./models/Organization');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/donation-platform')
  .then(() => console.log('Connected to MongoDB for seeding...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Default admin data
const defaultAdmins = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'System Admin',
    email: 'system@example.com',
    password: 'system123',
    role: 'superadmin'
  }
];

// Default organizations data
const defaultOrganizations = [
  {
    name: 'Red Cross Society',
    description: 'International humanitarian organization providing emergency assistance and disaster relief',
    email: 'redcross@example.com',
    phone: '+1234567890',
    address: '123 Humanitarian St, Global City',
    website: 'https://redcross.org',
    category: 'Disaster Relief',
    status: 'active'
  },
  {
    name: 'Save the Children',
    description: 'Organization working to improve the lives of children through better education, health care, and economic opportunities',
    email: 'savethechildren@example.com',
    phone: '+1234567891',
    address: '456 Children Ave, Global City',
    website: 'https://savethechildren.org',
    category: 'Children Welfare',
    status: 'active'
  },
  {
    name: 'World Food Programme',
    description: 'United Nations organization fighting hunger worldwide',
    email: 'wfp@example.com',
    phone: '+1234567892',
    address: '789 Food St, Global City',
    website: 'https://wfp.org',
    category: 'Food Security',
    status: 'active'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Admin.deleteMany({});
    await Organization.deleteMany({});

    // Create admins
    for (const admin of defaultAdmins) {
      await Admin.create(admin);
    }

    // Create organizations
    await Organization.insertMany(defaultOrganizations);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 