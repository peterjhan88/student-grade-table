import React from 'react';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  Header(props) {
    return (
      <div className='ml-5 mt-4 w-75 row d-flex justify-content-between'>
        <div className='sgt-title'>{props.titleText}</div>
        <div className='d-flex align-items-center'>
          <div className='mr-3 average-label'>Average Grade</div>
          <div className='border border-dark bg-secondary average-grade d-flex justify-content-center'>{props.averageGrade}</div>
        </div>
      </div>
    );
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
    return sum / theLength;
  }

  render() {
    return (
      <>
        <this.Header titleText='Student Grade Table' averageGrade={this.getAverageGrade()}/>
        <GradeTable grades={this.state.grades}/>
      </>
    );
  }
}

export default App;
