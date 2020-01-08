import React from 'react';
import Grade from './grade';

class GradeTable extends React.Component {
  render() {
    const allGrades = this.props.grades.map(student => {
      return (
        <Grade
          key={student.id}
          id={student.id}
          name={student.name}
          course={student.course}
          grade={student.grade}
          handleDeleteButtonClick={this.props.handleDeleteButtonClick}
          handleUpdateButtonClick={this.props.handleUpdateButtonClick}
        />);
    });
    return (
      <table className='mx-auto my-3 col-11 col-xl-8 table table-bordered table-dark table-striped'>
        <thead>
          <tr className='bg-info'>
            <th scope='col'>Student Name</th>
            <th scope='col'>Course</th>
            <th scope='col'>Grade</th>
            <th scope='col'>Operation</th>
          </tr>
        </thead>
        <tbody>
          {this.props.grades.length !== 0 ? <>{ allGrades }</> : <tr><td className='ml-5'>{'No grades recorded'}</td></tr>}
        </tbody>
      </table>
    );
  }
}

export default GradeTable;
