import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn)
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => onRouteChange('signin')}
					className='f3 link dim black underline pointer'>
					{' '}
					Sign out
				</p>
			</nav>
		);
	else {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => onRouteChange('register')}
					className='f3 link dim black underline pa3 pointer'>
					{' '}
					Register{' '}
				</p>

				<p
					onClick={() => onRouteChange('signin')}
					className='f3 link dim black underline pa3 pointer'>
					{' '}
					Sign in{' '}
				</p>
			</nav>
		);
	}
};
export default Navigation;
