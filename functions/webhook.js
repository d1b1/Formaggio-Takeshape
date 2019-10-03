
exports.handler = function(event, context, callback) {

		console.log('here', event.body, typeof event.body);
		// 	{
		//   "action": "content:create",
		//   "meta": {
		//     "projectId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		//     "userId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
		//   },
		//   "data": {
		//     "contentId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		//     "contentTypeName": "article",
		//     "isSingleton": false
		//   }
		// }

		const query = ` {
			getCheese(_id: "${event.body.data.contentId}") {
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
		}`;

		console.log(query);
		console.log('Got Data', event.body.action, event.body);

    callback(null, {
	    statusCode: 200,
	    body: "Webhook Handler"
    });
}
