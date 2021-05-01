import express from 'express';
import authorRoutes from './author.routes';
import postRoutes from './post.routes';

const routes = express.Router();

routes.use('/post-blog', postRoutes);
routes.use('/author', authorRoutes);

export default routes;
