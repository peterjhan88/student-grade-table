import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete(event) {
    this.props.handleDeleteButtonClick(this.props.id);
  }

  handleUpdate(event) {
    this.props.handleUpdateButtonClick(this.props.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.course}</td>
        <td>{this.props.grade}</td>
        <td>
          <div className="d-flex flex-wrap justify-content-around">
            <div className='btn btn-danger' onClick={this.handleDelete}>DELETE</div>
            <div className='btn btn-warning' onClick={this.handleUpdate}>Update</div>
          </div>
        </td>
      </tr>
    );
  }
}

export default Grade;
