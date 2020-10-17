import './bootstrap';
import express from 'express';
import cors from 'cors';
import path from 'path';
import BullBoard from 'bull-board';
import routes from './routes';
import Queue from './libs/Queue';

import './database';

class App {
  constructor() {
    this.server = express();

    this.bullBoard();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/assets',
      express.static(path.resolve(__dirname, 'resources', 'assets'))
    );
    this.server.use(
      '/avatars',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'avatars'))
    );
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'files'))
    );

    if (process.env.NODE_ENV === 'development') {
      this.server.use('/admin/queues', BullBoard.UI);
    }
  }

  routes() {
    this.server.use(routes);
  }

  bullBoard() {
    BullBoard.setQueues(Queue.queues.map((queue) => queue.bull));
  }
}

export default new App().server;
