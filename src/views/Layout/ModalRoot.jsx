import React from 'react';
import { connect } from 'react-redux';
import GreetModal from '../../components/Modals/GreetModal';
import { hideModal } from '../../actions';

const MODAL_COMPONENTS = {
	'GREET_MODAL': GreetModal
	/* other modals */
};

const ModalRoot = ({ modalType, modalProps, dispatch }) => {
	if (!modalType || !(modalType in MODAL_COMPONENTS)) {
		return null; // since React v15 we can return null here
	}

	const SpecificModal = MODAL_COMPONENTS[modalType];

	const handleExit = () => {
		dispatch(hideModal({ modalType }));
	};

	return <SpecificModal {...modalProps} onExited={handleExit}/>;
};

export default connect(
	state => state.modal
)(ModalRoot);
