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
        />);
    });
    return (
      <table className='ml-5 mt-4 col-8 table table-bordered table-dark table-striped'>
        <thead className='bg-info'>
          <tr>
            <th className='col'>Student Name</th>
            <th className='col'>Course</th>
            <th className='col'>Grade</th>
            <th className='col'>Operation</th>
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
