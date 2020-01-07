import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    var newGrade = {
      name: document.getElementById('name').value,
      course: document.getElementById('course').value,
      grade: parseInt(document.getElementById('grade').value)
    };
    this.props.onSubmit(newGrade);
  }

  handleChange(event) {
    var changedInput = {};
    changedInput[event.target.getAttribute('id')] = event.target.value;
    this.props.handleInputChange(changedInput);
  }

  handleCancel(event) {
    var clearInputs = {
      name: '',
      course: '',
      grade: ''
    };
    this.props.handleCancelButtonClick(clearInputs);
  }

  render() {
    return (
      <form className='border border-dark d-flex flex-column wrap col-4 mt-4 ml-5' onSubmit={this.handleSubmit}>
        <div className='form-group row'>
          <label className='col-3'>Name</label>
          <input type='text' id='name' onChange={this.handleChange} value={this.props.nameValue} />
        </div>
        <div className='form-group row'>
          <label className='col-3'>Course</label>
          <input type='text' id='course' onChange={this.handleChange} value={this.props.courseValue} />
        </div>
        <div className='form-group row'>
          <label className='col-3'>Grade</label>
          <input type='text' id='grade' onChange={this.handleChange} value={this.props.gradeValue} />
        </div>
        <div>
          <button id='add' type='submit' className='btn btn-success'>Add</button>
          <button id='cancel' className='btn btn-warning' onClick={this.handleCancel} >Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
