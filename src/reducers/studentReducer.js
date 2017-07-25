export function student(state = [], action) {
        switch (action.type) {
            case 'SAVE_SUCCESS':
            	return action.user;
	        default:
	            return state;
    }
}