import React from 'react';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  Header(props) {
    return <div className='ml-5 mt-5 col-xs-12 sgt-title'>{props.titleText}</div>;
  }

  componentDidMount() {
    fetch('/api/grades/')
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ grades: jsonData });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  render() {
    return (
      <>
        <this.Header titleText='Student Grade Table' />
        <GradeTable grades={this.state.grades}/>
      </>
    );
  }
}

export default App;
