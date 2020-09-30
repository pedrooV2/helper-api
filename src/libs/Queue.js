import Bull from 'bull';
import redisConfig from '../config/redis';

import SimpleMail from '../app/jobs/SampleMail';

const mailQueue = new Bull(SimpleMail.key, redisConfig);

export default mailQueue;
