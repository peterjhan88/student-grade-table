import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
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
    event.preventDefault();
    var clearInputs = {
      name: '',
      course: '',
      grade: ''
    };
    this.props.handleCancelButtonClick(clearInputs);
  }

  render() {
    return (
      <form className='border border-dark d-flex flex-column wrap col-3 mt-4 ml-2 align-items-center justify-content-center form-height' onSubmit={this.handleSubmit}>
        <div className='form-group row'>
          <label className='col-3 col-form-label-sm'><i className='fas fa-user'></i></label>
          <input className='form-control-sm w-75' type='text' id='name' onChange={this.handleChange} value={this.props.nameValue} placeholder='Name' />
        </div>
        <div className='form-group row'>
          <label className='col-3 col-form-label-sm'><i className='fas fa-book-open'></i></label>
          <input className='form-control-sm w-75' type='text' id='course' onChange={this.handleChange} value={this.props.courseValue} placeholder='Course' />
        </div>
        <div className='form-group row'>
          <label className='col-3 col-form-label-sm'><i className='fas fa-graduation-cap'></i></label>
          <input className='form-control-sm w-75' type='text' id='grade' onChange={this.handleChange} value={this.props.gradeValue} placeholder='Grade' />
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
