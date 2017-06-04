# bem

> Simple jQuery-like library to traverse and modify components according to the BEM methodology

## Usage

Begin by passing a CSS selector string to get one or more block-level elements:

``` javascript
const component = bem('.component');

// Like jQuery, bem can handle a single element or a collection internally
component.length; //=> 2

// Reference elements like you would in jQuery
component[0]; //=> DOM element
```

Query for element-level nodes of a block:

``` javascript
const menuItems = bem('.component').element('menu-item');

// bem resolves class names internally according to the BEM methodology
menuItems[0].className; //=> "component__menu-item"
```

Modify blocks/elements by adding and removing modifier classes:

``` javascript
const component = bem('.component');
const menuItems = component.element('menu-item');

// Add a modifier to a block
component.modify('disabled'); //=> Adds "component--disabled" class to block(s)

// Add a modifier to an element
menuItems.modify('highlighted'); //=> Adds "component__menu-item--highlighted" class to element(s)

// Remove a modifier
component.unmodify('color-red') //=> Removes "component--color-red" class from the block(s)

// Toggle a modifier
component.toggle('hidden'); //=> Removes "component--hidden" class if it exits, otherwise, it adds it

// Check if a block/element has a modifier
menuItems.is('active'); //=> Returns true if the "component__menu-item--active" class exists
```

Qualify a query by passing one or more modifiers:

``` javascript
// Find the disabled component
const component = bem('.component', 'disabled');

// Find the active and highlighted menu item
const menuItem = bem('.component').element('menu-item', 'highlighted', 'active');
```

## API

### bem(selector[, modifiers],...)

Create a new `bem` instance by querying for the block(s) or explicity providing them and optionally provide modifiers to filter the blocks:

```javascript
// Supports CSS selector string
const block = bem('.block');

// Supports an array/nodelist
const block = bem(document.querySelectorAll('.block'));

// Supports a single DOM element
const block = bem(document.querySelector('.block'));

// Filter blocks by providing one or more modifiers
const block = bem('.block', 'foo', 'bar');
```

### bem#element(name[, modifiers],...)

Query for element-level nodes by providing the name and optionally provide modifiers to filter the elements. Returns a new `bem` instance for the currently selected elements:

```javascript
// Provide the name minus the block prefix
const elements = bem('.block').element('element');

// Filter elements by providing one or more modifiers
const elements = bem('.block').element('element', 'foo', 'bar');
```

### bem#modify(modifiers,...)

Add one or more modifiers to the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Add a modifier to a block
bem('.block').modify('foo');

// Add multiple modifiers to an element
bem('.block').element('element').modify('foo', 'bar');
```

### bem#unmodify(modifiers,...)

Remove one or more modifiers from the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Remove a modifier from a block
bem('.block').unmodify('foo');

// Remove multiple modifiers from an element
bem('.block').element('element').unmodify('foo', 'bar');
```

### bem#toggle(modifiers,...)

Toggle adding/removing one or more modifiers to/from the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Toggle adding/removing a modifer to/from a block
bem('.block').toggle('foo');

// Toggle adding/removing multiple modifers to/from an element
bem('.block').element('element').toggle('foo', 'bar');
```

### bem#is(modifiers,...)

Returns true if the first element in a collection has one or more modifiers, otherwise it returns false:

```javascript
// Does the block have a modifier
const isFoo = bem('.block').is('foo');

// Do the elements have multiple modifiers
const isFooBar = bem('.block').element('element').is('foo', 'bar');
```

### bem#each(fn)

Iterate through each element in the collection:

```javascript
// Loop through element-level nodes and maniuplate them individually
bem('.block').element('element').each((el) => {
    // Do something 
});
```

## Installation

bem is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/bem/raw/master/dist/bem.js) or [minified](http://github.com/ryanmorr/bem/raw/master/dist/bem.min.js) version, or install it in one of the following ways:

``` sh
npm install ryanmorr/bem

bower install ryanmorr/bem
```

## Tests

Open `test/runner.html` in your browser or test with PhantomJS by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).