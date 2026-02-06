import authRoutes from './routes.auth.js';
import postRoutes from './routes.post.js';
import userRoutes from './routes.user.js';
import authorRoutes from './routes.authors.js'
import uploadRoutes from './routes.upload.js'

const routes = (app) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/posts', postRoutes);
    app.use('/api/v1/user', userRoutes);
    app.use('/api/v1/author', authorRoutes);
    app.use('/api/v1/upload', uploadRoutes);
}

export default routes;
