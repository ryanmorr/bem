# bem

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> Simple jQuery-like library to traverse and modify components according to the BEM methodology

## Install

Download the [CJS](https://github.com/ryanmorr/bem/raw/master/dist/cjs/bem.js), [ESM](https://github.com/ryanmorr/bem/raw/master/dist/esm/bem.js), [UMD](https://github.com/ryanmorr/bem/raw/master/dist/umd/bem.js) versions or install via NPM:

``` sh
npm install @ryanmorr/bem
```

## Usage

Begin by querying for one or more block-level elements:

``` javascript
import bem from '@ryanmorr/bem';

// Query for a block via CSS selector string
const component = bem('.component');

// Like jQuery, bem can handle a single element or a collection internally
component.length; //=> 2

// Reference single elements like you would in jQuery
component[0]; //=> DOM element
```

Query for element-level nodes of a block:

``` javascript
// Provide the root element name (you don't need to prefix with the block name)
const menuItems = bem('.menu').element('menu-item');

// Class names are resolved internally according to the BEM methodology
menuItems[0].className; //=> "menu__menu-item"
```

Modify blocks/elements by adding and removing modifier classes:

``` javascript
// Add the "menu--disabled" modifier class to block(s)
bem('.menu').modify('disabled'); 

// Add the "menu__menu-item--highlighted" modifier class to element(s)
bem('.menu').element('menu-item').modify('highlighted'); 

// Remove the "menu--color-red" modifier class from the block(s)
bem('.menu').unmodify('color-red');

// Toggle adding/removing the "menu--hidden" modifier class
bem('.menu').toggle('hidden'); 

// Returns true if the element has the "menu__menu-item--active" modifier class
bem('.menu').element('menu-item').is('active');
```

## API

### `bem(selector, ...modifiers?)`

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

------

### `element(name, ...modifiers?)`

Query for element-level nodes by providing the name and optionally provide modifiers to filter the elements. Returns a new `bem` instance for the currently selected elements:

```javascript
// Provide the name minus the block prefix
const elements = bem('.block').element('element');

// Filter elements by providing one or more modifiers
const elements = bem('.block').element('element', 'foo', 'bar');
```

------

### `modify(...modifiers)`

Add one or more modifiers to the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Add a modifier to a block
bem('.block').modify('foo');

// Add multiple modifiers to an element
bem('.block').element('element').modify('foo', 'bar');
```

------

### `unmodify(...modifiers)`

Remove one or more modifiers from the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Remove a modifier from a block
bem('.block').unmodify('foo');

// Remove multiple modifiers from an element
bem('.block').element('element').unmodify('foo', 'bar');
```

------

### `toggle(...modifiers)`

Toggle adding/removing one or more modifiers to/from the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Toggle adding/removing a modifer to/from a block
bem('.block').toggle('foo');

// Toggle adding/removing multiple modifers to/from an element
bem('.block').element('element').toggle('foo', 'bar');
```

------

### `is(...modifiers)`

Returns true if the first element in a collection has one or more modifiers, otherwise it returns false:

```javascript
// Does the block have a modifier
const isFoo = bem('.block').is('foo');

// Does the element have multiple modifiers
const isFooBar = bem('.block').element('element').is('foo', 'bar');
```

------

### `on(...modifiers, callback)`

Subscribe a callback function to be invoked when one or more modifiers have been added to a block/element. The callback function is passed the DOM element as the only argument. Returns the `bem` instance to support method chaining:

```javascript
bem('.block').on('foo', (el) => {
    // Executed when the "block--foo" modifier class is added to the block/element
});

bem('.block').element('element').on('foo', 'bar', (el) => {
     // Executed when the "block__element--foo" AND "block__element--bar"
     // modifier classes have been added to the block/element
});
```

------

### `each(fn)`

Iterate through each element in the collection:

```javascript
// Loop through element-level nodes and maniuplate them individually
bem('.block').element('element').each((el) => {
    // Do something 
});
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/bem
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/bem?color=blue&style=flat-square
[build-url]: https://github.com/ryanmorr/bem/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/ryanmorr/bem/node.js.yml?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/bem?color=blue&style=flat-square
[license-url]: UNLICENSE