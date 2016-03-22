'use strict';

function makeFormMixin(fields){
    var mixin = {
        getInitialState: function(){
            var state = {};
            fields.forEach(function(field){
                state[field] = this.props[field] || '';
            }, this);
            return state;
        },
        getFormData: function(){
            var data = {};
            fields.forEach(function(field){
                data[field] = this.state[field];
            }, this);
            return data;
        }
    };

    fields.forEach(function(field){
        var method = camelJoin(['handle', field, 'change']);
        mixin[method] = function(event){
            var update = {};
            update[field] = event.target.value;
            this.setState(update);
        };
    });

    return mixin;
}

// helper function ['Makes', 'things', 'camel', 'case'] => 'makesThingsCamelCase'
function camelJoin(parts){
    return parts.map(function(part, i){
        if (i === 0) {
            return part[0].toLowerCase() + part.slice(1);
        }
        else {
            return part[0].toUpperCase() + part.slice(1);
        }
    }).join('');
}

module.exports = makeFormMixin;
