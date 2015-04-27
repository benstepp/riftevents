var React = require('react');

var GenderSelectorButton = React.createClass({

	propTypes:{
		changeGender:React.PropTypes.func,
		gender:React.PropTypes.string,
		selected:React.PropTypes.bool
	},

	_updateGender:function() {
		this.props.changeGender(this.props.gender);
	},

	render:function() {

		var buttonClass='gender-selector '+this.props.gender.toLowerCase();
		if (this.props.selected) {
			buttonClass+= ' selected';
		}

		return (
			<div className='button-wrapper'>
				<button className={buttonClass} onClick={this._updateGender} >
					<div></div>
					<span>{this.props.gender.toLowerCase()}</span>
				</button>
			</div>
		);
	}
});

module.exports = GenderSelectorButton;