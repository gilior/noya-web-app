import * as express from 'express';
import {join} from 'path';
import {
  handleCVRoutes, handleHomeRoutes, handleImgRoutes, handleLinksRoutes, handleMsgRoutes, handleMsgRoutesB,
  handleMsgRoutesC,
  handlePrgRoutes,
  handleTraverseItemsRoutes
} from "./routes";
import {Request, Response} from "express";

// Faster server renders w/ Prod mode (dev mode never needed)


// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');


var parser = require('body-parser');
app.use(parser.json());


app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
// app.use('/api/Data', () => handleHomeRoutes(app));

app.use('/api/Data', function (req: Request, res: Response, next) {
  console.log(req.query);
  res.locals.lang = req.query.lang.substring(0, 3);
  next();
});
app.get('/api/Data/GetHomePageText', (req, res) => {
  handleHomeRoutes(req, res)
});
app.get('/api/Data/GetTraverseItems', (req, res) => {
  handleTraverseItemsRoutes(req, res)
});
app.get('/api/Data/GetCV', (req, res) => {
  handleCVRoutes(req, res)
});
app.get('/api/Data/GetImages', (req, res) => {
  handleImgRoutes(req, res)
});
app.get('/api/Data/GetPrograms', (req, res) => {
  handlePrgRoutes(req, res)
});

app.get('/api/Data/GetLinks', (req, res) => {
  handleLinksRoutes(req, res)
});
app.post('/api/Data/SendMessage', (req, res) => {
  handleMsgRoutesC(req, res)
});

// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.sendfile(join(DIST_FOLDER, 'index.html'), {req});
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
