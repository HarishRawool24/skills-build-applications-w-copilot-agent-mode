import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models/index.js';

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase(): Promise<void> {
  let connected = false;

  try {
    await mongoose.connect(connectionString);
    connected = true;

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Activity.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya',
        displayName: 'Maya Chen',
        email: 'maya@mergington.edu',
        fitnessLevel: 'intermediate',
      },
      {
        username: 'jordan',
        displayName: 'Jordan Lee',
        email: 'jordan@mergington.edu',
        fitnessLevel: 'beginner',
      },
      {
        username: 'riley',
        displayName: 'Riley Morgan',
        email: 'riley@mergington.edu',
        fitnessLevel: 'advanced',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team focused on consistent outdoor activity.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Peak Performers',
        description: 'Strength and endurance training for ambitious athletes.',
        memberIds: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 35,
        points: 70,
        notes: 'Neighborhood tempo run',
      },
      {
        userId: users[0]._id,
        type: 'strength',
        durationMinutes: 25,
        points: 50,
        notes: 'Full-body circuit',
      },
      {
        userId: users[1]._id,
        type: 'walking',
        durationMinutes: 30,
        points: 30,
        notes: 'Lunchtime walk',
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        durationMinutes: 40,
        points: 80,
        notes: 'Bike path ride',
      },
      {
        userId: users[2]._id,
        type: 'running',
        durationMinutes: 50,
        points: 100,
        notes: 'Track intervals',
      },
      {
        userId: users[2]._id,
        type: 'strength',
        durationMinutes: 45,
        points: 90,
        notes: 'Strength progression',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Starter Move',
        description: 'A low-impact circuit to build a consistent movement habit.',
        fitnessLevels: ['beginner'],
        durationMinutes: 20,
        category: 'mobility',
      },
      {
        title: 'Campus Cardio',
        description: 'A brisk interval session that fits into a school-day schedule.',
        fitnessLevels: ['beginner', 'intermediate'],
        durationMinutes: 30,
        category: 'cardio',
      },
      {
        title: 'Performance Builder',
        description:
          'A challenging strength and conditioning session for experienced athletes.',
        fitnessLevels: ['intermediate', 'advanced'],
        durationMinutes: 45,
        category: 'strength',
      },
    ]);

    console.log('Seeded 3 users, 2 teams, 6 activities, and 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (connected) {
      await mongoose.disconnect();
    }
  }
}

await seedDatabase();
