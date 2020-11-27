import { EventEmitter } from 'events';
import { UserEvents } from 'models/events/user.events.model';
export const userEvents = new EventEmitter();

const mergeUser = () => {
  console.log('Merged!');
}

const notMergeUser = () => {
  console.log("Not merge!")
}

userEvents.on(UserEvents.UserMerge, mergeUser);
userEvents.on(UserEvents.NotUserMerge, notMergeUser);