var React = require('react');

var D3ItemTooltip = require('../d3-tooltip/d3-tooltip.jsx');

var InventorySlot = React.createClass({
	componentDidMount:function() {
		this.setTooltipOffset();
	},
	componentDidUpdate:function() {
		this.setTooltipOffset();
	},

	setTooltipOffset:function() {
		var elem = React.findDOMNode(this);

		//if the inventory slot has children (content)
		if (elem.children && elem.children.length > 0) {
			var elemLocation = elem.getBoundingClientRect().top;
			var tooltipHeight = elem.children[3].getBoundingClientRect().height;
			var windowHeight = window.innerHeight;

			//check if the tooltip fits where it currently is
			if (!(tooltipHeight + elemLocation < windowHeight)) {
				var offset = (tooltipHeight + elemLocation - windowHeight);

				//if the tooltip is bigger than window, just show at top of window
				if (offset > windowHeight) {
					elem.children[3].style.top = '-'+(elemLocation-20)+'px';
				}
				else {
					//just move it up a little with a bit at bottom
					elem.children[3].style.top = '-'+(offset+10)+'px';
				}

			}
		}
	},

	render:function() {

		var slotContent= [];
		var slotClass='inventory-slot';
		//check to make sure an actual item is in the inventory slot
		if (typeof this.props.data !== 'undefined') {
			//change the size to large if it is a large item
			if(this.props.data.hasOwnProperty('size') && this.props.data.size === 2) {
				slotClass += ' large';
			}

			if(this.props.data.hasOwnProperty('rarity')) {
				var bgurl;
				var borderColor='#302a21';

				switch(this.props.data.rarity) {
					case 'magic':
						bgurl='img/blue.png';
						borderColor='#7979d4';
						break;
					case 'rare':
						bgurl='img/yellow.png';
						borderColor='#f8cc35';
						break;
					case 'legendary':
						bgurl='img/orange.png';
						borderColor='#bf642f';
						break;
					case 'ancient':
						bgurl='img/orange.png';
						borderColor='#bf642f';
						break;
					default:
						//noop
				}

				//switch bg to green if item is part of a set
				if (this.props.data.hasOwnProperty('set')) {
					bgurl='img/green.png';
					borderColor='#8bd442';
				}

				if (typeof bgurl !== 'undefined') {
					var inline = {
						backgroundImage:'url('+bgurl+')'
					};
					slotContent.push(<div style={inline} className='inventory-bg'></div>)
				}
			}

			//set the item image
			if (this.props.data.hasOwnProperty('image')) {
				var inline = {backgroundImage:'url('+this.props.data.image+')'};
				slotContent.push(<div style={inline} className='inventory-image'></div>);
			}

			//add a link to activate tooltip
			slotContent.push(<a className='tooltip-link'></a>);

			//add a hidden tooltip
			var inline;
			if (this.props.column < 5) {
				inline = {left:'50px'};
			}
			else {
				inline = {right:'50px'};
			}

			slotContent.push(
				<div className='tooltip-container' style={inline}>
				<D3ItemTooltip item={this.props.data}/>
				</div>
			)

		}

		return (
			<div className={slotClass} style={{borderColor:borderColor}}>
				{slotContent}
			</div>
		);
	}
});

module.exports = InventorySlot;