import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class BsModal extends Component {

	constructor(props) {
		super(props);
		this.state = { showModal: true };
		this.close = this.close.bind(this);
	}

	close() {
		this.setState({ showModal: false });
	}

	render() {
		const { title, onExited, children } = this.props;
		return (
			<Modal show={this.state.showModal} onHide={this.close} onExited={onExited}>
				{title &&
					<Modal.Header closeButton>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>
				}
				<Modal.Body>
					{children}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default BsModal;
