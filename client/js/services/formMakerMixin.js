function makeFormMixin(fields){
    var mixin = {
        getInitialState: function(){
            var state = {
                errors: {}
            };
            fields.forEach(function(item){
                var field = item.name;
                state[field] = this.props[field] || '';
                state.errors[field] = false;
            }, this);
            return state;
        },
        getFormData: function(){
            var data = {};
            fields.forEach(function(field){
                data[field] = this.state[field];
            }, this);
            return data;
        },
        validateForm: function () {
            var hasErrors = false;
            for (var i = 0; i < fields.length; i++) {
                let name = fields[i].name;
                this.state.errors[name] = false;
                for (var j = 0; j < fields[i].rules.length; j++) {
                    let rule = fields[i].rules[j];
                    if (rule === 'required') {
                        let isError = this.state[name].length === 0;
                        if (isError) {
                            hasErrors = true;
                            this.state.errors[name] = 'This is required field';
                            break;
                        }
                    }

                    if (rule.rule) {
                        let isError = !rule.rule.test(this.state[name]);
                        if (isError) {
                            hasErrors = true;
                            this.state.errors[name] = rule.message;
                            break;
                        }
                    }

                    if (rule instanceof RegExp) {
                        let isError = !rule.test(this.state[name]);
                        if (isError) {
                            hasErrors = true;
                            this.state.errors[name] = 'Invalid value. Please check it.';
                            break;
                        }
                    }
                }
            }
            return hasErrors;
        }
    };

    mixin.validatorsRules = [];

    fields.forEach(function(item){
        var field = item.name;
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

export default makeFormMixin;
