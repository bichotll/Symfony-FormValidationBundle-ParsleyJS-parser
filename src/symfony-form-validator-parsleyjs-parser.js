/*! symfony-form-validator-parsleyjs-parser - v0.0.1 - 2014-07-02
* https://github.com/bichotll/symfony-form-validator-parsleyjs-parser
* Copyright (c) 2014 bichotll; Licensed Apache2 */
(function($) {

    'use strict';

    // Collection method.
    $.fn.sfvparsley = function(options) {
        // Override default options with passed-in options.
        $.sfvparsley.options = $.extend({}, options);

        //check if the object is passed
        if ($.sfvparsley.options.object === '') {
            throw "No object inserted";
        }

        return this.each(function(i) {
            //add the parsley data
            $(this).data('data-parsley-validate', true);

            //init process
            initDrill($(this));

            //init parsley if
            if ($.sfvparsley.options.initParsley === true) {
                $(this).parsley();
            }
        });
    };

    /**
     * Starts the drill of the object
     * 
     * @private
     * @param {Object} $element jQ object
     * @returns {undefined}
     */
    function initDrill($element) {
        //drill object to find the constraints and parse them to parsley
        $.each($.sfvparsley.options.object, function(formKey, form) {
            //check if it has constraints
            if (form.constraints.length !== 0) {
                //set default validationGroup
                var validationGroups = ['Default'];
                //check if has validation groups defined
                if (form.validationGroups.length !== 0) {
                    validationGroups = form.validationGroups;
                }
                drillConstraints($element, form, validationGroups);
            }
        });
    }

    /**
     * Drill the constraints according to the validation groups
     * 
     * @private
     * @param {Object} $element jQ object
     * @param {type} form
     * @param {type} validationGroups
     * @returns {undefined}
     */
    function drillConstraints($element, form, validationGroups) {
        //drill each constraint group
        $.each(validationGroups, function(validationGroupKey, validationGroup) {
            $.each(form.constraints[validationGroup], function(constraintKey, constraint){
                applyConstraint($element, form, constraint);
            });
        });
    }
    
    /**
     * Applies the parsley constraint to the form element
     * 
     * @private
     * @param {Object} $element jQ object
     * @param {type} form
     * @param {type} constraint
     * @returns {undefined}
     */
    function applyConstraint($element, form, constraint){
        //check if we parse it and do it
        $.each(symfonyParsleyConstraints, function(symfonyParsleyConstraintKey, symfonyParsleyConstraint){
            if (constraint.class === symfonyParsleyConstraintKey){
                var $form = $element.find('[name="' + form.fullPathName + '"]');
                //run the action associated to the constraint
                symfonyParsleyConstraint($form, form, constraint);
            }
        });
    }
    
    /**
     * Contains all the SymfonyConstraints and their actions
     * 
     * @private
     * @type Object
     */
    var symfonyParsleyConstraints = {
        'Symfony\\Component\\Validator\\Constraints\\NotBlank': function($form, form, constraint){
            parsleyConstraints.required($form);
        },
        'Symfony\\Component\\Validator\\Constraints\\Blank': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\NotNull': function($form, form, constraint){
            parsleyConstraints.required($form);
        },
        'Symfony\\Component\\Validator\\Constraints\\Null': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\True': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\False': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Type': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Email': function($form, form, constraint){
            parsleyConstraints.email($form);
        },
        'Symfony\\Component\\Validator\\Constraints\\Length': function($form, form, constraint){
            parsleyConstraints.minLength($form, constraint.min);
            parsleyConstraints.maxLength($form, constraint.max);
        },
        'Symfony\\Component\\Validator\\Constraints\\Url': function($form, form, constraint){
            parsleyConstraints.url($form);
        },
        'Symfony\\Component\\Validator\\Constraints\\Regex': function($form, form, constraint){
            parsleyConstraints.pattern($form, constraint.pattern);
        },
        'Symfony\\Component\\Validator\\Constraints\\Ip': function($form, form, constraint){
            var ipPattern = '^\\d+\.\\d+\.\\d+\\.\\d$';
            parsleyConstraints.pattern($form, ipPattern);
        },
        'Symfony\\Component\\Validator\\Constraints\\Uuid': function($form, form, constraint){
            var uuidPattern = '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}';
            parsleyConstraints.pattern($form, uuidPattern);
        },
        'Symfony\\Component\\Validator\\Constraints\\Range': function($form, form, constraint){
            var range = "[" + constraint.min + "," + constraint.max + "]";
            parsleyConstraints.range($form, range);
        },
        'Symfony\\Component\\Validator\\Constraints\\EqualTo': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\NotEqualTo': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\IdenticalTo': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\NotIdenticalTo': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\LessThan': function($form, form, constraint){
            parsleyConstraints.max($form, constraint.value);
        },
        'Symfony\\Component\\Validator\\Constraints\\LessThanOrEqual': function($form, form, constraint){
            parsleyConstraints.max($form, constraint.value);
        },
        'Symfony\\Component\\Validator\\Constraints\\GreaterThan': function($form, form, constraint){
            parsleyConstraints.min($form, constraint.value);
        },
        'Symfony\\Component\\Validator\\Constraints\\GreaterThanOrEqual': function($form, form, constraint){
            parsleyConstraints.min($form, constraint.value);
        },
        'Symfony\\Component\\Validator\\Constraints\\Date': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\DateTime': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Time': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Choice': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Collection': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Count': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\UniqueEntity': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Language': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Locale': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Country': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\File': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Image': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\CardScheme': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Currency': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Luhn': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Iban': function($form, form, constraint){
            var ibanPattern = "[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}";
            parsleyConstraints.pattern($form, ibanPattern);
        },
        'Symfony\\Component\\Validator\\Constraints\\Isbn': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Issn': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Callback': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Expression': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\All': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\UserPassword': function($form, form, constraint){
            
        },
        'Symfony\\Component\\Validator\\Constraints\\Valid': function($form, form, constraint){
            
        }
    };
    
    /**
     * Has all the parsley constraints and their functions
     * 
     * @private
     * @type Object
     */
    var parsleyConstraints = {
        required: function(el){
            el.data('parsley-required', true);
            el.attr('required', 'required');
        },
        email: function(el){
            el.data('parsley-type', 'email');
        },
        number: function(el){
            el.data('parsley-type', 'number');
        },
        integer: function(el){
            el.data('parsley-type', 'integer');
        },
        digits: function(el){
            el.data('parsley-type', 'digits');
        },
        alphanum: function(el){
            el.data('parsley-type', 'alphanum');
        },
        url: function(el){
            el.data('parsley-type', 'url');
        },
        minLength: function(el, minlength){
            el.data('parsley-type-minlength', minlength);
        },
        maxLength: function(el, maxlength){
            el.data('parsley-type-maxlength', maxlength);
        },
        min: function(el, range){
            el.data('parsley-type-min', range);
        },
        max: function(el, range){
            el.data('parsley-type-max', range);
        },
        range: function(el, range){
            el.data('parsley-type-range', range);
        },
        pattern: function(el, pattern){
            el.data('parsley-type-pattern', pattern);
            el.attr('pattern', pattern);
        },
        minCheck: function(el, mincheck){
            el.data('parsley-type-mincheck', mincheck);
        },
        maxCheck: function(el, maxcheck){
            el.data('parsley-type-maxcheck', maxcheck);
        },
        equalto: function(el, equalto){
            el.data('parsley-type-equalto', equalto);
        }
    };

    /**
     * Run it just set up the options
     * 
     * @static
     * @param {type} options
     * @returns {undefined}
     */
    $.sfvparsley = function(options) {
        // Override default options with passed-in options.
        $.sfvparsley.options = $.extend({}, options);
    };

    /**
     * All the plugin options
     * 
     * @public
     */
    $.sfvparsley.options = {
        object: '',
        setMessages: false,
        initParsley: false
    };

}(jQuery));
