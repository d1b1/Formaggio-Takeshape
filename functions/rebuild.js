const fetch = require('node-fetch')
const _ = require('underscore')
const algoliasearch = require('algoliasearch');

// Config variables.
const TAKESHAPE_PROJECTID = process.env.TAKESHAPE_PROJECTID
const TAKESHAPE_KEY = process.env.TAKESHAPE_KEY
const ALGOLIA_APPID = process.env.ALGOLIA_APPID
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY

var query = `{
 getCheeseList {
		items {
			_id
			name
			characteristics {
	      aged
	      covering
	      flavors
	      milk
	      rennetType
	      standardsAndProcessing
	      style
	      texture
	    }
	    description
	    labelOrPhoto {
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
}`

// var key = '1c372ec850af4f1180db4290bba0850b';
// var projectID = '733a9f1a-977f-4637-bc04-8ad63d8ac13a';
// var appID = 'OBBTFVLBPT'
// var adminKey = 'c7d544340ed7864d6255f9a38ba7a74e';

function rebuild() {

	return new Promise((resolve, reject) => {

		console.log('process.env.TAKESHAPE_PROJECTID', process.env.TAKESHAPE_PROJECTID);
		
		const client = algoliasearch(ALGOLIA_APPID, ALGOLIA_ADMIN_KEY);
		const index = client.initIndex('cheese');

		fetch(`https://api.takeshape.io/project/${TAKESHAPE_PROJECTID}/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${TAKESHAPE_KEY}`
			},
			body: JSON.stringify({query})
		}).then(res => {
			return res.json();
		}).then(json => {
			var items = json.data.getCheeseList.items
			console.log('here', items);

			_.each(items, item => {
				var object = item
				item.objectID = item._id;
				if (item.photo)
					item.photoUrl = 'https://images.takeshape.io/' + item.photo.path;

				index
					.addObject(object)
					.then((data) => {
						console.log('here', data);
					})
					.catch(err => {
						console.log(err);
					});
			})
		});
	})
}


exports.handler = function(event, context, callback) {

		// Aloglia Client.
		console.log(context, process.env.ALGOLIA_APPID);

		// ALGOLIA_ADMIN_KEY = "c7d544340ed7864d6255f9a38ba7a74e",
		// TAKESHAPE_KEY = "1c372ec850af4f1180db4290bba0850b",
		// TAKESHAPE_PROJECTID = "733a9f1a-977f-4637-bc04-8ad63d8ac13a"
		rebuild();

    callback(null, {
    	statusCode: 200,
    	body: "Rebuild all handlers"
    });
}
