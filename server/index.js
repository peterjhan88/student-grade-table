require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/grades', (req, res, next) => {
  const gradesSql = `
    select * from grades
  `;
  db.query(gradesSql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/grades', (req, res, next) => {
  const receivedBody = req.body;
  const missing = missingFields(receivedBody);
  if (missing) {
    throw new ClientError(`Missing ${missing.join(', ')} field(s)`, 400);
  }
  let receivedGrade = receivedBody.grade;
  if (isNaN(parseInt(receivedGrade, 10)) || parseInt(receivedGrade, 10) < 0) {
    throw new ClientError(`${receivedGrade} is not non-negative number`, 400);
  }
  receivedGrade = parseInt(receivedGrade, 10);
  const gradesSql = `
    insert into grades ("gradeId", name, course, grade, "createdAt")
    values (default, $1, $2, $3, default)
    returning *
  `;
  const fields = ['name', 'course'];
  const values = [];
  for (let index = 0; index < fields.length; index++) {
    const key = fields[index];
    values.push(req.body[key]);
  }
  values.push(receivedGrade);
  db.query(gradesSql, values)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.put('/api/grades', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('this is put(update) endpoint');
  res.json('this is update(put) endpoint');
});

app.patch('/api/grades', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('this is patch endpoint');
  res.json('this is patch endpoint');
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server initiated. Listening on port ${process.env.PORT}...\n`);
});

function missingFields(reqBody) {
  const fields = ['name', 'course', 'grade'];
  const missing = [];
  for (var index = 0; index < fields.length; index++) {
    const key = fields[index];
    if (!reqBody[key]) {
      missing.push(key);
    }
  }
  return missing.length === 0 ? null : missing;
}
