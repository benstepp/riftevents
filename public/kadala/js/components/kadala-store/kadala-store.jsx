var React = require('react');
var assign = require('object-assign');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppStore = require('../../stores/AppStore');
var KadalaItem = require('./kadala-item.jsx');
var SimSelector = require('./sim-selector.jsx');
var CraftingStore = require('./crafting-store.jsx');

var KadalaStore = React.createClass({
	getInitialState:function() {
		return assign({},AppStore.getSettings(),{shards:AppStore.getShards()});
	},

	mixins: [PureRenderMixin],

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},
	_onChange:function() {
		this.setState(AppStore.getSettings());
		this.setState({shards:AppStore.getShards()});
	},

	render:function() {

        var craftingClass = 'crafting-panel';
		var kadalaClass = 'kadala-store';
        var simClass = 'sim-wrap';
		//this is a check for internet explorer
		//flex-direction:column breaks everything so we detect for it here
		if ((window.navigator.userAgent.indexOf('MSIE ') !== -1)||!navigator.userAgent.match(/Trident.*rv\:11\./)) {
			kadalaClass+=' noie';
		}

		if (this.state.store) {
			kadalaClass+=' unhide';
            craftingClass+= ' unhide';
            simClass+= ' unhide';
		}

		var items = [
			{type:'helm',text:'Mystery Helmet',cost:25,size:2},
			{type:'boots',text:'Mystery Boots',cost:25,size:2},
			{type:'belt',text:'Mystery Belt',cost:25,size:1},
			{type:'pants',text:'Mystery Pants',cost:25,size:2},
			{type:'gloves',text:'Mystery Gloves',cost:25,size:2},
			{type:'chest',text:'Mystery Chest',cost:25,size:2},
			{type:'shoulders',text:'Mystery Shoulders',cost:25,size:2},
			{type:'bracers',text:'Mystery Bracers',cost:25,size:2},
			{type:'quiver',text:'Mystery Quiver',cost:25,size:2},
			{type:'mojo',text:'Mystery Mojo',cost:25,size:2},
			{type:'source',text:'Mystery Source',cost:25,size:2},
			{type:'shield',text:'Mystery Shield',cost:25,size:2},
			{type:'onehand',text:'1-H Mystery Weapon',cost:75,size:2},
			{type:'twohand',text:'2-H Mystery Weapon',cost:75,size:2},
			{type:'ring',text:'Mystery Ring',cost:50,size:1},
			{type:'amulet',text:'Mystery Amulet',cost:100,size:1}
		]
		var itemsLength = items.length;

		var kadalaSlots = [];
		for (var i =0; i < itemsLength; i++) {
			kadalaSlots.push(<KadalaItem key={i} item={items[i]} shardCount={this.state.shards[items[i].type] || 0}/>);
		}

        var storeContent;
        if (this.state.sim === 'Kadala') {
            storeContent = <div className={kadalaClass} id='kadala-store'>{kadalaSlots}</div>;
        }
        else if (this.state.sim === 'Crafting') {
            storeContent = <div className={craftingClass}>
                <CraftingStore dClass={this.state.dClass} />
            </div>;
        }

		return (
            <div className={simClass}>
                <SimSelector current={this.state.sim}/>
                {storeContent}
            </div>
		);
	}
});

module.exports = KadalaStore;
