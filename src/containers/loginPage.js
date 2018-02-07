import { connect } from 'react-redux';
import LoginComp from '../components/loginComp';
// import { actionCreator } from '../actionPath';

const mapStateToProps = (state, ownProps) => ({
	state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComp);
