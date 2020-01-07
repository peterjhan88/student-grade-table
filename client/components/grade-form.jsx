import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var newGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: parseInt(this.state.grade)
    };
    this.props.onSubmit(newGrade);
    this.inputClear();
  }

  handleChange(event) {
    var changedInput = {};
    changedInput[event.target.getAttribute('id')] = event.target.value;
    this.setState(changedInput);
  }

  inputClear() {
    var clearInputs = {
      name: '',
      course: '',
      grade: ''
    };
    this.setState(clearInputs);
  }

  handleCancel(event) {
    event.preventDefault();
    this.inputClear();
  }

  render() {
    return (
      <form className='col-10 col-lg-6 col-xl-3 border border-dark d-flex flex-row flex-wrap mx-auto my-2 py-3 align-items-center justify-content-center form-height' onSubmit={this.handleSubmit}>
        <div className='d-flex flex-nowrap form-group row col-12'>
          <label className='col-3 col-form-label-sm d-flex justify-content-end align-items-center'><i className='fas fa-user'></i></label>
          <input className='col-8 form-control' type='text' id='name' onChange={this.handleChange} value={this.state.name} placeholder='Name' />
        </div>
        <div className='d-flex flex-nowrap form-group row col-12'>
          <label className='col-3 col-form-label-sm d-flex justify-content-end align-items-center'><i className='fas fa-book-open'></i></label>
          <input className='col-8 form-control' type='text' id='course' onChange={this.handleChange} value={this.state.course} placeholder='Course' />
        </div>
        <div className='d-flex flex-nowrap form-group row col-12'>
          <label className='col-3 col-form-label-sm d-flex justify-content-end align-items-center'><i className='fas fa-graduation-cap'></i></label>
          <input className='col-8 form-control' type='text' id='grade' onChange={this.handleChange} value={this.state.grade} placeholder='Grade' />
        </div>
        <div className='d-flex flex-nowrap row col-8 justify-content-between'>
          <button id='add' type='submit' className='btn btn-success col-5'>Add</button>
          <button id='cancel' className='btn btn-warning col-5' onClick={this.handleCancel} >Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
