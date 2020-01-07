import React from 'react';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      name: '',
      course: '',
      grade: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addInputs = this.addInputs.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
  }

  Header(props) {
    return (
      <div className='col-12 d-flex justify-content-center flex-wrap'>
        <div className='col-8 sgt-title'>{props.titleText}</div>
        <div className='col-4 d-flex align-items-center justify-content-center'>
          <div className='average-label col-8'>Average Grade</div>
          <div className='col-4 border border-dark bg-secondary average-grade d-flex justify-content-center'>{props.averageGrade}</div>
        </div>
      </div>
    );
  }

  handleInputChange(changedInput) {
    this.setState(changedInput);
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
          return {
            grades: newGrades,
            name: '',
            course: '',
            grade: ''
          };
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  handleCancelButtonClick(clearInputObject) {
    this.setState(clearInputObject);
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
        <div className='d-flex'>
          <GradeTable grades={this.state.grades}/>
          <GradeForm
            onSubmit={this.addInputs}
            handleInputChange={this.handleInputChange}
            handleCancelButtonClick={this.handleCancelButtonClick}
            nameValue={this.state.name}
            courseValue={this.state.course}
            gradeValue={this.state.grade}
          />
        </div>
      </>
    );
  }
}

export default App;
