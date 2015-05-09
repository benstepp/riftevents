var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var D3ItemTooltip = require('../d3-tooltip/d3-tooltip.jsx');
var InventoryStore = require('../../stores/InventoryStore');
var ItemLeft = require('./item-left.jsx');
var ItemRight = require('./item-right.jsx');

var IndividualItem = React.createClass({

	mixins: [PureRenderMixin],

	getInitialState:function() {
		return InventoryStore.getItem();
	},

	componentDidMount: function() {
		InventoryStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		InventoryStore.removeChangeListener(this._onChange);
	},
	_onChange:function() {
		this.setState(InventoryStore.getItem());
	},

	render:function() {

		//only show tooltips/buttons if an item has already been created
		var tooltip;
		var hiddenButtons = 'hidden';
		if (typeof this.state.item !== 'undefined') {
			tooltip = <div className='tooltip-container'><D3ItemTooltip item={this.state.item}/></div>;
			hiddenButtons = '';
		}

		return (
			<div>
				<div className='row'>
					<div className='col-xs-12 tooltip-overflow'>
						<ItemLeft hideClass={hiddenButtons} hasPrevious={this.state.hasPrevious} />
						{tooltip}
						<ItemRight hideClass={hiddenButtons} hasNext={this.state.hasNext} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = IndividualItem;