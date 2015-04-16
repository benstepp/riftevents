var React = require('react');

var D3ItemTooltip = require('./components/d3-tooltip/d3-tooltip.jsx');
var OptionsPanel = require('./components/kadala-options/options-panel.jsx');

var item = {
	name:'Marauder\'s Spine',
	color:'green',
	image:'//media.blizzard.com/d3/icons/items/large/unique_shoulder_set_07_x1_demonhunter_male.png',

	slot:'Shoulders',
	type:'Set Shoulders',
	classSpecific:'Demon Hunter',

	//armor:'609',

	weapon:{
		min:'1111',
		max:'4300',
		speed:'1.1',
		dps:'3100'
	},

	primaries:[
	{
		name:'<span>Dex</span>',
		value:955,
		color:'blue'
	},
	{
		name:'Vitality',
		value:555,
		color:'blue'
	},
	{
		name:'Cost Reduction',
		value:8,
		color:'orange'
	}
	],
	secondaries:[],
	socket:false


};

React.render(
	<OptionsPanel />,
	document.getElementById('example')
);
