import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
// import { itemsFetchData } from '../../actions/productActions';
import * as studentActions from '../actions/studentActions';
import InputText from './InputText';
import SelectInput from './SelectInput';

const styles = {
  chip: {
    margin: 4,
    display: 'inline-flex',
  },
  wrapper: {
    width: '400px',
    paddingLeft: '20px'
  },
  label: {
    fontSize: '14px',
    paddingTop: '12px',
    paddingRight: '5px',
  },
}
class AddStudent extends React.Component {
  constructor(props, context) {
    super(props, context);
    const store = this.context.store;
    this.state = {
      form: {
        id:'test',
        name:'',
        address:'',
        zip:'',
        dob:'',
        email:'',
        contact:''
      },
      others: {
        department:'',
        gpa:'',
      },
      type:'add'
      }
      this.handleFormChange =  this.handleFormChange.bind(this);
      this.handleChange =  this.handleChange.bind(this);
      this.save=this.save.bind(this);
  }

  componentDidMount() {
    //if path has id, get user data
    if(this.props.location && this.props.location.pathname.indexOf('editStudent') > -1  ) {
      //get student, set student
      this.setState({type: 'edit'});
    }
  }

  componentWillReceiveProps(nextProps) {
 
  }

  componentWillUnmount() {
    //this.props.actions.clearItems();
  }

 handleFormChange(event) {
      const field = event.target.name;
      let form = this.state.form;
      form[field] = event.target.value;
      return this.setState({form: form}, ()=> console.log(this.state));
  }

  handleChange(event) {
      const field = event.target.name;
      let value = event.target.value;
      var obj = Object.assign({}, this.state.others);
      obj[field] = value;
      return this.setState({others: obj}, ()=> console.log(this.state));
  }

  save () {
    this.props.actions.save('http://oganesson.vpc.sigtuple.com/test/api/students', this.state);
  }
  render() {
    const optionsArr = [{value:"Mechanical", text:"Mechanical"}, {value:"Electronics", text:"Electronics"}, 
      {value:"Computer Science", text:"Computer Science"}, {value:"Mathematics", text:"Mathematics"}, 
        {value:"Physics", text:"Physics"}, {value:"Chemical", text:"Chemical"}];
        if(this.props.save && this.props.save.success) {
          return (
              <div>
              <p>Save Success</p>
              </div>
            );
        }
    return (
      <div>
        {this.state.type === 'add'? <p>Add Student Information</p>: <p>Edit Student Information</p>
      }
        
        <div style={styles.wrapper}>
        {Object.keys(this.state.form).map(element=> (
            <InputText 
              value={this.state.form[element]}
              label={element}
              name={element}
              onChange={this.handleFormChange}
        />
          ))
        }
        <SelectInput 
          name={"department"}
          label={"Department"}
          options={optionsArr}
          onChange={this.handleChange}
        />
        <InputText 
              value={this.state.others.gpa}
              name={"gpa"}
              label={"GPA"}
              errorText={"Should lie between 1.0 and 4.0"}
              onChange={this.handleChange}
        />
        </div>
        <button onClick={this.save}>Save</button>
      </div>
    );
  }
}

AddStudent.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object.isRequired,
};

function getStudentById(students, studentid) {
  const student = students.filter(student => student.id == studentid);
  if (studentid.length) return studentid[0];
  return null;
}

function mapStateToProps(state, ownProps) {
    const studentid = ownProps.params.studentId; 
      return {
    save: state.student,
  };
}

const mapDispatchToProps = dispatch => ({
  // fetchData: url => dispatch(itemsFetchData(url)),
  actions: bindActionCreators(studentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);