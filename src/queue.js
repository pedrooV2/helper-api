import './bootstrap';
import Queue from './libs/Queue';
import SimpleMail from './app/jobs/SampleMail';

Queue.process(SimpleMail.handle);
