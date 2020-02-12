import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'Add',
      name: '',
      course: '',
      grade: '',
      nameError: false,
      courseError: false,
      gradeError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const missingFields = this.missingFields(this.state);
    if (missingFields) {
      // eslint-disable-next-line no-console
      console.log(`Missing ${missingFields.join(', ')}`);
      return;
    }
    if (this.state.grade.match(/\D/gi)) {
      // eslint-disable-next-line no-console
      console.log('Grade must be positive integer!');
      return;
    }
    var newGrade = {
      name: this.state.name,
      course: this.state.course,
      grade: parseInt(this.state.grade)
    };
    if (this.state.mode === 'Update') {
      newGrade.targetId = this.props.updateTarget.gradeId;
    }
    this.props.onSubmit(newGrade);
    this.inputClear();
  }

  handleChange(event) {
    var changedInput = {};
    const targetId = event.target.id;
    var newValue = '';
    if (targetId === 'grade') {
      newValue = !event.target.value ? '' : event.target.value.match(/\d/g).join('');
    } else {
      newValue = event.target.value;
    }
    changedInput[targetId] = newValue;
    this.setState(previousState => {
      if (newValue) {
        changedInput[targetId + 'Error'] = false;
      }
      return changedInput;
    });
  }

  inputClear() {
    var clearInputs = {
      name: '',
      course: '',
      grade: '',
      mode: 'Add',
      nameError: false,
      courseError: false,
      gradeError: false
    };
    this.setState(clearInputs);
  }

  handleBlur(event) {
    const focused = event.target.id;
    if (!this.state[focused]) {
      this.setState(previousState => {
        const leftBlank = `${focused}Error`;
        const newState = {};
        newState[leftBlank] = true;
        return newState;
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.mode !== prevProps.mode && this.props.mode !== 'Add') {
      const updateTarget = this.props.updateTarget;
      this.setState({
        mode: this.props.mode,
        name: updateTarget.name,
        course: updateTarget.course,
        grade: updateTarget.grade
      });
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.handleCancelButtonClick();
    this.inputClear();
  }

  missingFields(inputs) {
    const requiredFields = ['name', 'course', 'grade'];
    const missing = [];
    for (var index = 0; index < requiredFields.length; index++) {
      const key = requiredFields[index];
      if (!inputs[key]) {
        missing.push(key);
      }
    }
    return missing.length === 0 ? null : missing;
  }

  render() {
    return (
      <form className='col-10 col-lg-6 col-xl-3 border border-dark d-flex flex-row flex-wrap mx-auto my-2 py-3 align-items-center justify-content-center form-height' onSubmit={this.handleSubmit}>
        <div className='d-flex flex-wrap form-group row col-12 input-group-height'>
          {
            this.state.nameError
              ? <div className='col-9 ml-4 pl-4 missing-value'>Must fill this field!</div>
              : <></>
          }
          <label className='col-2 col-form-label-sm d-flex justify-content-end align-items-center'>
            <i className='fas fa-user'></i>
          </label>
          <input
            className='col-9 form-control'
            type='text'
            id='name'
            value={this.state.name}
            placeholder='Name'
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </div>
        <div className='d-flex flex-wrap form-group row col-12 input-group-height'>
          {
            this.state.courseError
              ? <div className='col-9 ml-4 pl-4 missing-value'>Must fill this field!</div>
              : <></>
          }
          <label className='col-2 col-form-label-sm d-flex justify-content-end align-items-center'>
            <i className='fas fa-book-open'></i>
          </label>
          <input
            className='col-9 form-control'
            type='text'
            id='course'
            value={this.state.course}
            placeholder='Course'
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </div>
        <div className='d-flex flex-wrap form-group row col-12 input-group-height'>
          {
            this.state.gradeError
              ? <div className='col-9 ml-4 pl-4 missing-value'>Must fill this field!</div>
              : <></>
          }
          <label className='col-2 col-form-label-sm d-flex justify-content-end align-items-center'>
            <i className='fas fa-graduation-cap'></i>
          </label>
          <input
            className='col-9 form-control'
            type='text'
            id='grade'
            value={this.state.grade}
            placeholder='Grade'
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </div>
        <div className='d-flex flex-nowrap row col-9 justify-content-between'>
          <button
            id='add'
            type='submit'
            className={this.state.mode === 'Add' ? 'btn col-5 btn-success' : 'btn col-5 btn-warning'}
          >
            {this.state.mode}
          </button>
          <button
            id='cancel'
            className='btn btn-light border border-dark col-5'
            onClick={this.handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
