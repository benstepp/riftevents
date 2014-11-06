(function() {
    angular
        .module('bsRiftTooltip', [])
        .directive('bsRiftTooltip', bsRiftTooltip);

    function bsRiftTooltip() {
        return {
            restrict: 'A',
            transclude: true,
            replace:true,

            scope: {
                item:"=bsRiftTooltip"
            },

            template: ['<div class="rift-tooltip">',
                        '<div data-ng-class="{{item.rarity.toLowerCase()}}" class="tooltip-name">{{item.name_de || item.name_en ||item.name_fr}}</div>',
                        '<div class="tooltip-bind tooltip-text">Bind on Pickup</div>',
                        '<span class="left tooltip-text">{{item.slot}}</span>',
                        '<span class="right tooltip-text">{{item.armorType || item.weaponType || Accessory}}</span>',
                        '<div class="tooltip-hr"></div>',
                        '<div class="tooltip-text" data-ng-show="item.armor">Armor: {{item.armor}}</div>',
                        '<div class="tooltip-text" data-ng-repeat="(stat,bonus) in item.onEquip">{{stat}} +{{bonus}}</div>',
                '</div>'].join(''),

            link: function(scope, elem, attrs) {

            }

        };
    }
})();