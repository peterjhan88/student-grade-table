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
  const getSql = `
    select * from grades
  `;
  db.query(getSql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/grades', (req, res, next) => {
  const missing = missingFields(req);
  if (missing) {
    throw new ClientError(`Missing ${missing.join(', ')} field(s)`, 400);
  }
  let receivedGrade = req.body.grade;
  if (isNaN(parseInt(receivedGrade, 10)) || parseInt(receivedGrade, 10) < 0) {
    throw new ClientError(`${receivedGrade} is not non-negative number`, 400);
  }
  receivedGrade = parseInt(receivedGrade, 10);
  const insertSql = `
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
  db.query(insertSql, values)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = req.params.gradeId;
  if (gradeId.match(/\D/g) || isNaN(parseInt(gradeId, 10)) || parseInt(gradeId, 10) <= 0) {
    throw new ClientError(`${gradeId} is not positive integer`, 400);
  }
  const deleteSql = `
    delete from grades
    where "gradeId"=$1
    returning *
  `;
  db.query(deleteSql, [gradeId])
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`${gradeId} does not exist`, 404);
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.put('/api/grades', (req, res, next) => {
  const missing = missingFields(req);
  if (missing) {
    throw new ClientError(`Missing ${missing.join(', ')} field(s)`, 400);
  }
  const gradeId = req.body.gradeId;
  if (gradeId.match(/\D/g) || isNaN(parseInt(gradeId, 10)) || parseInt(gradeId, 10) <= 0) {
    throw new ClientError(`${gradeId} is not positive integer`, 400);
  }
  let receivedGrade = req.body.grade;
  if (gradeId.match(/\D/g) || isNaN(parseInt(receivedGrade, 10)) || parseInt(receivedGrade, 10) < 0) {
    throw new ClientError(`${receivedGrade} is not non-negative number`, 400);
  }
  receivedGrade = parseInt(receivedGrade, 10);
  const gradesSql = `
    update grades
    set name=$2,
        course=$3,
        grade=$4
    where "gradeId"=$1
    returning *
  `;
  const fields = ['gradeId', 'name', 'course'];
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

function missingFields(req) {
  const fields = ['name', 'course', 'grade'];
  if (req.method.match(/put/i)) {
    fields.push('gradeId');
  }
  const reqBody = req.body;
  const missing = [];
  for (var index = 0; index < fields.length; index++) {
    const key = fields[index];
    if (!reqBody[key]) {
      missing.push(key);
    }
  }
  return missing.length === 0 ? null : missing;
}
