var elasticsearch = require( 'elasticsearch' ),
	client = new elasticsearch.Client({
		host: 'https://search-es-performance-test-i6wq4w2fupsnulvhr56iazeozy.us-east-2.es.amazonaws.com',
		log: 'trace'
	}),
	documentIndex = 'test_data',
	documentType = 'test_type',
	defaultQueryType = 'simple';

function ping(){
	client.ping({
		requestTimeout: 30000,
	}, function( error ){
		if ( error ) {
			console.log( " Elasticsearch cluster is down! ");
		}else{
			console.log( "Everything is a ok! ");
		}

	});
}

window.searchES = searchES;
function searchES( query, queryType, callBack ){
	var searchParams = generateSearchParams( query, queryType );
	if ( searchParams === null ){
		console.log('Query Type Invalid!');
		return;
	}
	searchTemplate( searchParams, function( hits ){
		return callBack ( hits ); 
	});
}

function generateSearchParams( query, queryType ){
	var newSearchParams = null;
	if ( queryType === 'simple' ){
		newSearchParams = { 
			q: query,
			index: documentIndex
		};
	}else if ( queryType === 'multi_match_query'){
		newSearchParams = {
			body: {
			    query: {
				    multi_match: {
					    query: query,
					    fields: searchableFields( documentIndex, documentType )
				    }
			    }
			}		
		};
	}
	return newSearchParams;
}

function searchTemplate( searchParams, callBack ){
	client.search( searchParams )
		.then( function( body ){
			var hits = body.hits.hits;
			console.log( hits );
			return callBack ( hits );
		}, function ( error ){
			console.log( error.message );
		});
}

function searchableFields( documentIndex, documentType ){
	var searchableFields = null;

	if ( documentIndex === 'test_data' ){
		if( documentType === 'test_type' ){
			searchableFields = [ 'name' ];
		}
	}
	return searchableFields;
}