import express from 'express';
import { sequelize } from './models';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', userRoutes );
app.use('/', bookRoutes );

sequelize.sync({ force: false })
  .then(() => {
    console.log('Veritabanına bağlandı.');
    app.listen(port, () => {
      console.log(`Sunucu ${port} portunda çalışıyor`);
    });
  })
  .catch((error) => {
    console.error('Veritabanına bağlanılamadı:', error);
  });
