# @fronthouse/TestHelp

This library contains helper functions for speeding up your development with Karma and/or Jasmine test runners with the Angular TestBed.

## How to use

In your test.ts file (next to your main.ts in the root of your app project), add the following:

```
import { setDefaultConf } from '@fronthouse/test';
setDefaultConf(); // on last line
```

Then in your test, instead of instantiating a testBed:

```
const fixture;
configureTestingModule(MyComponent, MyModule)
  .subscribe(_fixture => {
    fixture = _fixture; // if you feel you need to save a reference to your fixture
    detectChanges(); // Ooh.. no need to reference the last fixture...
  });

afterEach(() => resetState); // this is your own reset function to reset any state in services if needed

it('should create', () => {
  expect(fixture.component).toBeTruthy();
});
```

## Short-hand functions

All short-hand functions have an optional parameter 'fixture', but by default the current fixture is used. Requires the use of configureTestSuite.

Retrieve the first matching debug element using css selector
```
q('.css-class')
```

Retrieve all matching debug element using css selector
```
qAll('.css-class')
``` 

Retrieve the first matching native element using css selector
```
qn('.css-class')
```

Retrieve all matching native element using css selector
```
qnAll('.css-class')
```

Retrieve the first matching debug element using css selector, which also contains given text
```
qT('.css-class', 'some text')
```

Retrieve the first matching native element using css selector, which also contains given text
```
qnT('.css-class', 'some text')
```



Set a value to a input field and trigger proper "input" event
```
setValue(htmlElement, 'new value')
```

Set a value to a input field and trigger proper "input" + "blur" events
```
setValueAndBlur(htmlElement, 'new value')
``` 

Retrieve an elements inner text (all whitespace reduced to single space and trimmed)
```
elmText(htmlElement?)
```

Clone a pure object
```
clone(jsonObject)
``` 
# Routing

With configureTestingModule, you can add more parameters to add fake routes and detect route changes.

configureTestingModule(MyComponent, MyModule, routes, routeParams)

This is to be documented further...

# Exported dependencies

Instead of importing functionality from a number of libraries, you can import the most used functionality directly from @fronthouse/test

These are exported for you to use
```
export { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
export { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
export { RouterTestingModule } from '@angular/router/testing';
export { NoopAnimationsModule } from '@angular/platform-browser/animations';
```

# Setting more default configuration

Use setDefaultConf to inject a set of default modules and providers so you don't have to do it all over the place.

Providers can be services or configuration.

```
setDefaultConf({ imports: [MyMockModule] });
setDefaultConf(null, [MyProvider]);
setDefaultConf(null, null, true); // third parameter triggers warp-speed-mode (see below)
```

With no parameters, these modules are imported as default:

NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule

## Warp-speed-mode (use with caution and warp-speed-goggles)

Be aware: One side-effect by using this package can be that state in services may not be reset completely between each test-run. Be sure to do this manually if needed.

# More information
Please visit https://fronthouse.no