<template>
			<div class="col-md-6">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title" v-text = "this.provider"></h3>
						<div class="pull-right">
							<span class="clickable filter" data-toggle="tooltip" title="Toggle table filter" data-container="body">
								<i class="glyphicon glyphicon-filter"></i>
							</span>
						</div>
					</div>
					<div class="panel-body">
						<input type="text" class="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
					</div>
					<table class="table table-hover" id="dev-table">
						<thead>
							<tr>
								<th v-for = "headerField in headerFields" v-text = "headerField"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for = "hit in hits" >
								<td v-for = "headerField in headerFields" v-text = "computeField(hit, headerField )"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
</template>

<script>
	export default {
		props:[
			'hits',
			'type',
			'provider'
		],
		data(){
			return {
				headerFields: []
			}
		},
		methods: {
			getHeaderFields(){
				var headerFields = [];
				if ( this.type === 'data-set-1' ){
					headerFields.push('id');
					headerFields.push('name');
					headerFields.push('age');
				}	
				return headerFields;
			},
			computeField( hit, headerField ){
				if ( this.provider === 'elasticsearch' ){
					if ( headerField === 'id'){
						return hit['_id'];
					}else{
						return hit._source[headerField];
					}
				}else{
					return hit[headerField];
				}
			}
		},
		mounted(){
			this.headerFields = this.getHeaderFields();
		}


	}
</script>