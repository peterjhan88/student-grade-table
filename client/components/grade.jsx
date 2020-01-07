import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    this.props.handleDeleteButtonClick(this.props.id);
  }

  render() {
    return (
      <tr>
        <td className='col-3'>{this.props.name}</td>
        <td className='col-2'>{this.props.course}</td>
        <td className='col-2'>{this.props.grade}</td>
        <td className='col-3'>
          <div className='btn btn-danger' onClick={this.handleDelete}>DELETE</div>
        </td>
      </tr>
    );
  }
}

export default Grade;
