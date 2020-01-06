import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      course: props.course,
      grade: props.grade
    };
  }

  render() {
    return (
      <tr>
        <td className='col-xs-3'>{this.state.name}</td>
        <td className='col-xs-3'>{this.state.course}</td>
        <td className='col-xs-2'>{this.state.grade}</td>
      </tr>
    );
  }
}

export default Grade;
