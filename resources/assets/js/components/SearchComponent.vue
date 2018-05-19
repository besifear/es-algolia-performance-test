<template>

	<div class="search">
		<input placeholder="Search" type = "text" v-model="query" debounce = "500" />
    	<div class="row">
			<search-result-component provider = "elasticsearch" type = "data-set-1" :hits = "this.hits" ></search-result-component>
			<search-result-component provider = "algolia" type = "data-set-1" ></search-result-component>
		</div>
	</div>

</template>

<script>
	export default{
		data(){
			return {
				query: '',
				hits: [],
			};
		},
		watch: {
			query: _.debounce(function(){
				searchES( this.query, 'simple', function( freshHits ){
					this.hits = freshHits; 
					console.log( this.hits );
				}.bind( this ));	

			}, 500 )
		}
	}
</script>