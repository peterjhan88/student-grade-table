/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const fs = require('fs');
const portNumber = 3001;
const dataPath = path.resolve(__dirname, '../database/data.json');
const app = express();
const jsonParserMiddleWare = express.json();
var dataOnServer = require(dataPath);
var serverDate = new Date();

app.get('/api/grades', (req, res) => {
  const data = dataOnServer.grades;
  res.status(200).send(data);
  console.log(req.method, 'All Grades', serverDate.toLocaleTimeString());
});

app.get('/api/grades/:id', (req, res) => {
  const targetId = req.params.id;
  if (invalidIdHandle(targetId, res)) {
    return false;
  }
  const grade = dataOnServer.grades.find(grade => grade.id === parseInt(targetId));
  res.status(200).send(grade);
  console.log(req.method, `id=${req.params.id}`, serverDate.toLocaleTimeString());
});

app.use(jsonParserMiddleWare);
app.post('/api/grades', (req, res) => {
  var newGrade = req.body;
  if (!checkBody(newGrade)) {
    const errorObject = validateGrade(newGrade);
    res.status(400).send(errorObject);
    return false;
  } else {
    newGrade.id = dataOnServer.nextId++;
    dataOnServer.grades.push(newGrade);
    const stringifiedUpdatedData = JSON.stringify(dataOnServer, null, 2);
    fs.writeFile(dataPath, stringifiedUpdatedData, fsWriteFileError => {
      if (fsWriteFileError) {
        const errorObject = {
          error: 'Unexpected error occurred.'
        };
        res.status(500).send(errorObject);
        return false;
      }
      res.status(201).send(newGrade);
      console.log(req.method, serverDate.toLocaleTimeString());
      return true;
    });
  }
});

app.delete('/api/grades/:id', (req, res) => {
  const targetId = req.params.id;
  if (isIdValid(targetId) && gradeWithTargetId(targetId)) {
    const targetIndex = dataOnServer.grades.findIndex(grade => grade.id === parseInt(targetId));
    dataOnServer.grades.splice(targetIndex, 1);
    const stringifiedUpdatedData = JSON.stringify(dataOnServer, null, 2);
    fs.writeFile(dataPath, stringifiedUpdatedData, fsWriteFileError => {
      if (fsWriteFileError) {
        const errorObject = {
          error: 'Unexpected error occurred.'
        };
        res.status(500).send(errorObject);
        return false;
      }
      res.sendStatus(204);
      console.log(req.method, serverDate.toLocaleTimeString());
      return true;
    });
  } else {
    if (invalidIdHandle(targetId, res)) {
      return false;
    }
  }
});

app.put('/api/grades/:id', (req, res) => {
  const targetId = req.params.id;
  const reqBody = req.body;
  if (isIdValid(targetId) && gradeWithTargetId(targetId) && checkBody(reqBody)) {
    const targetIndex = dataOnServer.grades.findIndex(grade => grade.id === parseInt(targetId));
    reqBody.id = parseInt(targetId);
    dataOnServer.grades.splice(targetIndex, 1, reqBody);
    const stringifiedUpdatedData = JSON.stringify(dataOnServer, null, 2);
    fs.writeFile(dataPath, stringifiedUpdatedData, fsWriteFileError => {
      if (fsWriteFileError) {
        const errorObject = {
          error: 'Unexpected error occurred.'
        };
        res.status(500).send(errorObject);
        return false;
      }
      res.status(200).send(reqBody);
      console.log(req.method, serverDate.toLocaleTimeString());
      return true;
    });
  } else {
    if (invalidIdHandle(targetId, res)) {
      return false;
    } else {
      const errorObject = validateGrade(reqBody);
      res.status(400).send(errorObject);
      return false;
    }
  }
});

app.patch('/api/grades/:id', (req, res) => {
  const targetId = req.params.id;
  const reqBody = req.body;
  if (isIdValid(targetId) && gradeWithTargetId(targetId)) {
    const targetIndex = dataOnServer.grades.findIndex(grade => grade.id === parseInt(targetId));
    reqBody.id = parseInt(targetId);
    var originalData = dataOnServer.grades[targetIndex];
    for (var key in originalData) {
      if (!Object.keys(reqBody).includes(key)) {
        reqBody[key] = originalData[key];
      }
    }
    dataOnServer.grades.splice(targetIndex, 1, reqBody);
    const stringifiedUpdatedData = JSON.stringify(dataOnServer, null, 2);
    fs.writeFile(dataPath, stringifiedUpdatedData, fsWriteFileError => {
      if (fsWriteFileError) {
        const errorObject = {
          error: 'Unexpected error occurred.'
        };
        res.status(500).send(errorObject);
        return false;
      }
      res.status(200).send(reqBody);
      console.log(req.method, serverDate.toLocaleTimeString());
      return true;
    });
  } else {
    if (invalidIdHandle(targetId, res)) {
      return false;
    }
  }
});

app.listen(portNumber, () => {
  console.log(`Server initiated. Listening on port ${portNumber}...\n`);
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

function checkBody(newGrade) {
  if (!newGrade.name || !newGrade.course || !newGrade.grade) {
    return false;
  }
  return true;
}

function validateGrade(gradeData) {
  const errors = {};
  const requiredFields = ['name', 'course', 'grade'];
  requiredFields.forEach(field => {
    if (!gradeData[field]) {
      errors[field] = `${field} is a required field`;
    }
  });
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  return null;
}

function invalidIdHandle(id, res) {
  if (!isIdValid(id)) {
    const errorObject = {
      error: 'id must be positive integer'
    };
    res.status(400).send(errorObject);
    return true;
  } else if (!gradeWithTargetId(id)) {
    const errorObject = {
      error: 'id does not exist in data'
    };
    res.status(404).send(errorObject);
    return true;
  }
}
