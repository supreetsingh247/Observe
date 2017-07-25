import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
// import { itemsFetchData } from '../../actions/productActions';
import * as studentActions from '../actions/studentActions';
import InputText from './InputText';
import SelectInput from './SelectInput';

const styles = {
  table : {
    'font-family': 'arial',
    'border-collapse': 'collapse',
    'width': '100%'
},
td: {
    border: '1px solid #dddddd',
    'text-align': 'left',
    padding: '8px'
}

}
class AddStudent extends React.Component {
  constructor(props, context) {
    super(props, context);
    const store = this.context.store;
    this.state = {
      studentId:'',
      students: [ 
      {
        id:'123',
        name: 'Supreet Singh'
      },
      {
        id:'234',
        name: 'test'
      }],
      filter:''
      }
      ;
      this.editStudent =  this.editStudent.bind(this);
  }

  componentDidMount() {
    //this.props.actions
  }

  componentWillReceiveProps(nextProps) {
 
  }

  componentWillUnmount() {
    //this.props.actions.clearItems();
  }

  editStudent (event) {
    console.log(event.currentTarget);
  }

  render() {
    return (
      <div>
        <p>Students</p>
        <InputText 
              value={this.state.filter}
              name={"filter"}
              label={"Filter"}
              onChange={this.handleChange}
        />
        <table style={styles.table}>
        {this.state.students.map(student => (
          <tr>
           <td style={styles.td} onClick={this.editStudent}>{student.id}</td>
          <td style={styles.td}>{student.name}</td>
          </tr>
          ))}
        </table>
      </div>
    );
  }
}

AddStudent.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    
  };
}

const mapDispatchToProps = dispatch => ({
  // fetchData: url => dispatch(itemsFetchData(url)),
  //actions: bindActionCreators(studentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);  