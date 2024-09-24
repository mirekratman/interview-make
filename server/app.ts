import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as session from 'express-session';

const app: express.Application = express();

app.set('trust proxy', 1);
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: true }
}));

app.get('/',  (req: Request, res: Response, next: NextFunction) => {
	res.send('Hello!')
});

app.use('/api/ping', (req: Request, res: Response, next: NextFunction) => {
	res.send('pong')
});

app.use('/api/upload', (req: Request, res: Response, next: NextFunction) => {

});

export {app};
