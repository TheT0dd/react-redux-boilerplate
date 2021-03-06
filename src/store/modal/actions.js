export const showModal = ({ modalType, modalProps }) => ({
	type: 'SHOW_MODAL',
	modalType,
	modalProps
});

export const hideModal = ({ modalType }) => ({
	type: 'HIDE_MODAL',
	modalType: modalType
});
