import React from 'react';

class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td className='col-xs-3'>{this.props.name}</td>
        <td className='col-xs-3'>{this.props.course}</td>
        <td className='col-xs-2'>{this.props.grade}</td>
      </tr>
    );
  }
}

export default Grade;
