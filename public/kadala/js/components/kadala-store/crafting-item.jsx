var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppActions = require('../../actions/AppActions');

var CraftingItem = React.createClass({

    mixins: [PureRenderMixin],

    _handleClick:function() {
        var item = this.props.item;
        item.slot = this.props.slot;
        AppActions.setCraft(item);
        AppActions.hideMenu();
    },

    render:function() {
        return (
            <li onClick={this._handleClick}>{this.props.item.name}</li>
        );
    }
});

module.exports = CraftingItem;
