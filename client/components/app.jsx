import React from 'react';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      updateTarget: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
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

  handleSubmit(newGrade) {
    const isModeAdd = this.state.updateTarget === null;
    if (isModeAdd) {
      this.addGrade(newGrade);
    } else {
      this.updateGrade(newGrade);
    }
  }

  addGrade(newGrade) {
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
            grades: newGrades
          };
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  updateGrade(updatedGradeFromForm) {
    const { targetId } = updatedGradeFromForm;
    const body = {
      name: updatedGradeFromForm.name,
      course: updatedGradeFromForm.course,
      grade: updatedGradeFromForm.grade,
      gradeId: targetId
    };
    fetch('/api/grades/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(updatedGrade => {
        this.setState(previousState => {
          var newGrades = previousState.grades.map(grade => grade.gradeId === updatedGrade.gradeId ? updatedGrade : grade);
          return {
            grades: newGrades,
            updateTarget: null
          };
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
      .then(response => {
        this.setState(previousState => {
          var newGrades = previousState.grades;
          for (var index = 0; index < newGrades.length; index++) {
            if (newGrades[index].id === parseInt(targetId)) {
              newGrades.splice(index, 1);
            }
          }
          return {
            grades: newGrades,
            updateTarget: null
          };
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  handleCancelButtonClick() {
    this.setState({ updateTarget: null });
  }

  handleUpdateButtonClick(targetId) {
    const [updateTarget] = this.state.grades.filter(grade => grade.gradeId === targetId);
    this.setState({ updateTarget: updateTarget });
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
          <GradeTable
            grades={this.state.grades}
            handleDeleteButtonClick={this.deleteGrade}
            handleUpdateButtonClick={this.handleUpdateButtonClick}
          />
          <GradeForm
            onSubmit={this.handleSubmit}
            mode={this.state.updateTarget ? 'Update' : 'Add'}
            updateTarget={this.state.updateTarget}
            handleCancelButtonClick={this.handleCancelButtonClick}
          />
        </div>
      </>
    );
  }
}

export default App;
