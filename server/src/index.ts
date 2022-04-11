import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

app.use(express.json());

app.listen(3001, () => {
  console.log('Escutando na porta: 3001');
});
