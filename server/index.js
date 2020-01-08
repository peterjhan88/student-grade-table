const dataPath = '../database/db.json';
const express = require('express');
const app = express();
var dataOnServer = require(dataPath);
var serverDate = new Date();

app.get('/api/grades', (req, res) => {
  const data = dataOnServer.grades;
  res.status(200).send(data);
  // eslint-disable-next-line no-console
  console.log(req.method, 'All Grades', serverDate.toLocaleTimeString());
});

app.get('/api/grades/:id', (req, res) => {
  const targetId = req.params.id;
  if (!isIdValid(targetId)) {
    const errorObject = {
      error: 'id must be positive integer'
    };
    res.status(400).send(errorObject);
    return false;
  } else if (!gradeWithTargetId(targetId)) {
    const errorObject = {
      error: 'id does not exist in data'
    };
    res.status(404).send(errorObject);
    return false;
  }
  const grade = dataOnServer.grades.find(grade => grade.id === parseInt(targetId));
  res.status(200).send(grade);
  // eslint-disable-next-line no-console
  console.log(req.method, `id=${req.params.id}`, serverDate.toLocaleTimeString());
});

app.listen(3000, () => {
// eslint-disable-next-line no-console
  console.log('Server initiated. Listening on port 3000..');
});

function isIdValid(id) {
  return parseInt(id) > 0 && !id.match(/\D/i);
}
function gradeWithTargetId(id) {
  if (dataOnServer.grades.find(grade => grade.id === parseInt(id))) {
    return true;
  }
  return false;
}
