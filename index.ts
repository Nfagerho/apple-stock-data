import express from 'express';
import bodyParser from 'body-parser';

class App {
  public app: express.Application

  constructor() {
    this.app = express();
    this.setconfig()
  }

  private setconfig() {
    this.app.use(bodyParser.json());


    require('./app/routes/stockRoutes')(this.app);

    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static('front/build'));

      const path = require('path');
      this.app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
      });
    }

    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`)
    });
  }
}
export default new App().app;