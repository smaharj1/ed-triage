import db from '../config/database';
import { StaffModel } from '../models';
import StaffJson from './staff.json';

db.once('open', async () => {
  // clean database
  await StaffModel.deleteMany({});

  // bulk create each model
  await StaffModel.insertMany(StaffJson);

  console.log('all done!');
  process.exit(0);
});
