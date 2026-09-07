import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    notes: { type: String, trim: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    fitnessLevels: [{ type: String, enum: ['beginner', 'intermediate', 'advanced'] }],
    durationMinutes: { type: Number, required: true, min: 1 },
    category: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
