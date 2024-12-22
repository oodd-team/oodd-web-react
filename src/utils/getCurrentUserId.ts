export const getCurrentUserId = () => {
	const idFromStorage = localStorage.getItem('current_user_id');
	return Number(idFromStorage);
};
