import React from 'react';
import BsModal from './BsModal';

const GreetModal = ({ title, onExited }) => (
	<BsModal title={title} onExited={onExited}>
		<div>Greetings! This is a test modal.</div>
	</BsModal>
);

export default GreetModal;
