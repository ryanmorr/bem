# bem

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

> Simple jQuery-like library to traverse and modify components according to the BEM methodology

## Installation

Download the [development](http://github.com/ryanmorr/bem/raw/master/dist/bem.js) or [minified](http://github.com/ryanmorr/bem/raw/master/dist/bem.min.js) version, or install via NPM:

``` sh
npm install @ryanmorr/bem
```

## Usage

Begin by querying for one or more block-level elements:

``` javascript
// Query for a block via CSS selector string
const component = bem('.component');

// Like jQuery, bem can handle a single element or a collection internally
component.length; //=> 2

// Reference single elements like you would in jQuery
component[0]; //=> DOM element
```

Query for element-level nodes of a block:

``` javascript
// Provide the root element name (no need to prefix with the block name)
const menuItems = bem('.menu').element('menu-item');

// bem resolves class names internally according to the BEM methodology
menuItems[0].className; //=> "menu__menu-item"
```

Modify blocks/elements by adding and removing modifier classes:

``` javascript
const menu = bem('.menu');
const menuItems = component.element('menu-item');

// Add a modifier to a block
menu.modify('disabled'); //=> Adds "menu--disabled" class to block(s)

// Add a modifier to an element
menuItems.modify('highlighted'); //=> Adds "menu__menu-item--highlighted" class to element(s)

// Remove a modifier
menu.unmodify('color-red') //=> Removes "menu--color-red" class from the block(s)

// Toggle a modifier
menu.toggle('hidden'); //=> Removes "menu--hidden" class if it exits, otherwise, it adds it

// Check if a block/element has a modifier
menuItems.is('active'); //=> Returns true if the "menu__menu-item--active" class exists
```

Qualify a query by passing one or more modifiers:

``` javascript
// Find the disabled component
const component = bem('.component', 'disabled');

// Find the active and highlighted menu item
const menuItem = bem('.menu').element('menu-item', 'highlighted', 'active');
```

## API

### bem(selector, [...modifiers])

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

### bem#element(name, [...modifiers])

Query for element-level nodes by providing the name and optionally provide modifiers to filter the elements. Returns a new `bem` instance for the currently selected elements:

```javascript
// Provide the name minus the block prefix
const elements = bem('.block').element('element');

// Filter elements by providing one or more modifiers
const elements = bem('.block').element('element', 'foo', 'bar');
```

### bem#modify(...modifiers)

Add one or more modifiers to the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Add a modifier to a block
bem('.block').modify('foo');

// Add multiple modifiers to an element
bem('.block').element('element').modify('foo', 'bar');
```

### bem#unmodify(...modifiers)

Remove one or more modifiers from the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Remove a modifier from a block
bem('.block').unmodify('foo');

// Remove multiple modifiers from an element
bem('.block').element('element').unmodify('foo', 'bar');
```

### bem#toggle(...modifiers)

Toggle adding/removing one or more modifiers to/from the currently selected elements. Returns the `bem` instance to support method chaining:

```javascript
// Toggle adding/removing a modifer to/from a block
bem('.block').toggle('foo');

// Toggle adding/removing multiple modifers to/from an element
bem('.block').element('element').toggle('foo', 'bar');
```

### bem#is(...modifiers)

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

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/bem
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fbem.svg
[build-url]: https://travis-ci.org/ryanmorr/bem
[build-image]: https://travis-ci.org/ryanmorr/bem.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE