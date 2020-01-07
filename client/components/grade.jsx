import React from 'react';

class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td className='col-6'>{this.props.name}</td>
        <td className='col-4'>{this.props.course}</td>
        <td className='col-2'>{this.props.grade}</td>
      </tr>
    );
  }
}

export default Grade;
