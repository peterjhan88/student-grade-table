import React from 'react';
import Grade from './grade';

class GradeTable extends React.Component {
  render() {
    const allGrades = this.props.grades.map(student => {
      return <Grade key={student.id} id={student.id} name={student.name} course={student.course} grade={student.grade}/>;
    });
    return (
      <table className='ml-5 mt-4 w-75 table table-bordered table-dark'>
        <thead className='bg-info'>
          <tr>
            <th className='col-xs-3'>{'Student Name'}</th>
            <th className='col-xs-3'>{'Course'}</th>
            <th className='col-xs-2'>{'Grade'}</th>
          </tr>
        </thead>
        <tbody id='grade-table-body'>
          {this.props.grades.length !== 0 ? <>{ allGrades }</> : <tr><td className='ml-5'>{'No grades recorded'}</td></tr>}
        </tbody>
      </table>
    );
  }
}

export default GradeTable;
