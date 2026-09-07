import { Router } from 'express';
import { Activity, Team, User, Workout } from '../models/index.js';

export const apiRouter = Router();

apiRouter.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.userId ? { userId: request.query.userId } : {};
    response.json(await Activity.find(filter).populate('userId', 'username displayName').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/activities', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('memberIds', 'username displayName'));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$userId', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, userId: '$_id', username: '$user.username', displayName: '$user.displayName', points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts', async (request, response, next) => {
  try {
    const filter = request.query.level ? { fitnessLevels: request.query.level } : {};
    response.json(await Workout.find(filter).sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});
