# Symfony Form validator ParsleyJS parser

Applies the ParsleyJS validation constraints to the selected form from the Symfony Form validator object.

It's used with (https://github.com/bichotll/FormValidationBundle)[https://github.com/bichotll/FormValidationBundle].

And maybe you are interested to use (Symfony-FormValidationBundle-js-parser)[https://github.com/bichotll/Symfony-FormValidationBundle-js-parser]. It generates the form. Useful for APIs or js environments.

And also (Parsley-js-Twitter-Bootstrap-3-configuration)[https://github.com/bichotll/Parsley-js-Twitter-Bootstrap-3-configuration]. It prepares ParsleyJS to run friendly with TwBootstrap3. I love both.


## Getting Started

###1.a Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/bichotll/Symfony-FormValidationBundle-ParsleyJS-parser/master/dist/jquery.symfony-form-validator-parsleyjs-parser.js
[max]: https://raw.githubusercontent.com/bichotll/Symfony-FormValidationBundle-ParsleyJS-parser/master/dist/jquery.symfony-form-validator-parsleyjs-parser.min.js

###1.b

```shell
bower install -S symfony-form-validator-parsleyjs-parser
```

###In your web page:

```html
<script src=".../path/.../jquery.js"></script>
<script src=".../path/.../symfony-form-validator-parsleyjs-parser.min.js"></script>
<script>
jQuery(function($) {
  $.sfvparsley(); // returns Exception "No object inserted"
});
</script>
```


## Documentation

###Options

- object: {Object} The FormValidationBundle object.
- initParsley: {boolean} Tries to init parsley to the selected elements. (.parsley() function)
- setMessages: {boolean} (false as default) To set the messages. **Not implemented yet**.


## Examples

###For a Symfony form already generated
```js
$form = $('form');
//apply the parsley data constraints to the dom form and run parsley automatically
$($form).sfvparsley({object:$.testJson, initParsley: true});
```

###Using an api and the form generated by (FormValidationBundle parser)[https://github.com/bichotll/Symfony-FormValidationBundle-js-parser]

```js
//generate the form with $.sfvp
$form = $.sfvp({object:$.testJson});
//apply the parsley data constraints to the generated form by FormValidationBundle parser and run parsley automatically
$($form).sfvparsley({object:$.testJson, initParsley: true});
//appends the form and happiness
$('body').append($form);
```


## Release History
 - workaround parsley patter attr
 - **0.8.0** Hi papa, I'm alive n I walk...maybe I will do some mistake but, I did not created the tdd tests yet.


##TODO
- TDD tests. Simply, if bored or new changes.
- Apply messages. I just did not need them yet.