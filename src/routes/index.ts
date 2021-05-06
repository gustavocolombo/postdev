import express from 'express';
import authorRoutes from './author.routes';
import postRoutes from './post.routes';
import authenticateRoutes from './session.routes';

const routes = express.Router();

routes.use('/post-blog', postRoutes);
routes.use('/author', authorRoutes);
routes.use('/session', authenticateRoutes);

export default routes;
