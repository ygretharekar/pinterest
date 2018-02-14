import { connect } from 'react-redux';
import AppBarComp from '../components/AppBarComp';

const mapStateToProps = (state) => ({
	state   
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComp);
