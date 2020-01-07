import React from 'react';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.addInputs = this.addInputs.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
  }

  Header(props) {
    return (
      <div className='col-12 col-xl-12 d-flex flex-wrap justify-content-center'>
        <div className='col-12 col-xl-6 sgt-title'>{props.titleText}</div>
        <div className='col-12 col-xl-6 d-flex align-items-center justify-content-center justify-content-sm-center justify-content-xl-end'>
          <div className='col-6 col-sm-4 col-md-5 col-lg-4 col-xl-6 average-label'>Average Grade</div>
          <div className='border border-dark bg-secondary average-grade d-flex justify-content-center justify-content-lg-center'>{props.averageGrade}</div>
        </div>
      </div>
    );
  }

  addInputs(newGrade) {
    fetch('/api/grades/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGrade)
    })
      .then(response => response.json())
      .then(jsonData => {
        this.setState(previousState => {
          var newGrades = previousState.grades;
          newGrades.push(jsonData);
          return { grades: newGrades };
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  deleteGrade(targetId) {
    fetch(`/api/grades/${targetId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(jsonData => {
        this.setState(previousState => {
          var newGrades = previousState.grades;
          for (var index = 0; index < newGrades.length; index++) {
            if (newGrades[index].id === parseInt(targetId)) {
              newGrades.splice(index, 1);
            }
          }
          return { grades: newGrades };
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  componentDidMount() {
    fetch('/api/grades/')
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          grades: jsonData
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  getAverageGrade() {
    var theLength = this.state.grades.length;
    if (theLength === 0) {
      return 'N/A';
    }
    var sum = 0;
    for (var index = 0; index < theLength; index++) {
      sum += this.state.grades[index].grade;
    }
    return Math.round(sum / theLength * 10) / 10;
  }

  render() {
    return (
      <>
        <this.Header titleText='Student Grade Table' averageGrade={this.getAverageGrade()}/>
        <div className='d-flex flex-wrap'>
          <GradeTable grades={this.state.grades} handleDeleteButtonClick={this.deleteGrade}/>
          <GradeForm onSubmit={this.addInputs} />
        </div>
      </>
    );
  }
}

export default App;
