var key = '1c372ec850af4f1180db4290bba0850b';
var projectID = '733a9f1a-977f-4637-bc04-8ad63d8ac13a';
const fetch = require('node-fetch')

const query = `
{
	getCheese(_id: "bcb600ee-3645-4a76-b7c2-b9f7db1272cb") {
		_id
		location {
			city
			state
		}
		milk
		name
		photo {
			_id
			caption
			credit
			description
			filename
			mimeType
			path
			sourceUrl
			title
			uploadStatus
		}
	}
}

`;


fetch(`https://api.takeshape.io/project/${projectID}/graphql`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${key}`
	},
	body: JSON.stringify({query})
}).then(res => {
	return res.json();
}).then(json => {
	console.log(json)
});
