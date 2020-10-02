/* eslint-disable no-console */
import Bull from 'bull';
import redisConfig from '../config/redis';

import jobs from '../app/jobs';

class Queue {
  constructor() {
    this.queues = jobs.map((job) => ({
      bull: new Bull(job.key, redisConfig),
      name: job.key,
      handle: job.handle,
    }));
  }

  add(name, data) {
    const queue = this.queues.find((q) => q.name === name);
    return queue.bull.add(data);
  }

  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, err) => {
        this.handleFailure(job, err, queue.name);
      });
    });
  }

  handleFailure(job, err, name) {
    console.log('Job failed', name, job.data);
    console.error(err);
  }
}

export default new Queue();
