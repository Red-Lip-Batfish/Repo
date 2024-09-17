import React from 'react';

// define the task component
export default Task = ({ taskName }) => {
	/// render appropriate divs and their values
	return (
		<div>
			{taskName}
			<br />
		</div>
	);
};
