# @fronthouse/TestHelp

This library contains helper functions for speeding up your development with Karma and/or Jasmine test runners with the Angular TestBed.

## Setting up default dependencies

Run setDefaultConf() once in your root test.ts file to set up imports and providers used in all tests so you don't have to repeat yourself.

With no parameters, this will include NoopAnimationsModule, HttpClientTestingModule and RouterTestingModule.

## Starting a test suite

In your test, where you normally would set up your TestBed and create a component, instead run the following (replacing the module and component names):

    configureTestSuite(ComponentModule, ComponentClass).subscribe();

If you need access to the fixture, you can get it by subscribing:

    const fixture: ComponentFixture<ComponentClass>;
    const fixture$ = configureTestSuite(ComponentModule, ComponentClass).subscribe(f => fixture = f);

## Shorthand query functions

Once starting a test suite, the current fixture (component) is stored, and the shorthand functions will query its debug element by default.

### Example:
    q('.mydiv') will return the first element with a class 'mydiv'

|function|shorthand for|
|--------|-------------|
|q(sel)       |fixture.debugElement.query(By.css(sel))|
|qT(sel, txt)      |fixture.debugElement.query(By.css(sel))  given the element text equals txt|
|qAll(sel)    |fixture.debugElement.queryAll(By.css(sel))|
|qn(sel)      |fixture.debugElement.query(By.css(sel)).nativeElement|
|qnT(sel, txt)     |fixture.debugElement.query(By.css(sel)).nativeElement  given the element text equals txt|
|qnAll(sel)   |fixture.debugElement.queryAll(By.css(sel)) mapped to nativeElement[]|

## Other helper functions

|function|description|
|--------|-------------|
|createComponent(class)|Creates a component and sets its fixture as default|
|setValue(elm, val)|Sets a value on an input element and dispatches the 'input' event|
|setValueAndBlur(elm, val)|Sets a value on an input element, dispatches the 'input' and 'blur' event|
|elmText(elm?)|Retrieves an elements inner text with all whitespaces reduced to maximum 1|
|detectChanges()|Same as fixture.detectChanges()|