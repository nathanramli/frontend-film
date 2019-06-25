import React from 'react';

import Container from '@material-ui/core/Container';

function TemplateFooterBar(){
	return(
		<div style={{backgroundColor: "#eee", padding: 10, textAlign: 'center'}}>
			<Container>
				<small style={{fontFamily: 'arial'}}>Fans - Copyright @ 2019 - R</small>
			</Container>
		</div>
	);
}
export default TemplateFooterBar;