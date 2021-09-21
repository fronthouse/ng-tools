/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from 'rxjs';
import { DebugElement, LOCALE_ID } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  TestModuleMetadata,
  waitForAsync,
  getTestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { clearDate, mockDateClass, setDate } from './date';

export { advanceTo, clearDate, tick } from './date';
export {
  ComponentFixture,
  TestBed,
  async,
  waitForAsync,
  fakeAsync,
} from '@angular/core/testing';
export {
  HttpTestingController,
  HttpClientTestingModule,
  TestRequest,
} from '@angular/common/http/testing';
export { RouterTestingModule } from '@angular/router/testing';
export { NoopAnimationsModule } from '@angular/platform-browser/animations';

// mock Date class
const dateClass = mockDateClass(Date);
// const w = (global.window || global) as any;
// w.Date = dateClass;
// global.window.performance.now = function() { return dateClass.now(); };

/**
 * Sets a fake date
 * @param date
 */
export function setFakeDate(date: Date) {
  // eslint-disable-next-line no-prototype-builtins
  if (!Date.hasOwnProperty('isMock')) {
    if (global.window) {
      // dom env
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).window.Date = dateClass;
      global.window.performance.now = function () {
        return dateClass.now();
      };
    } else {
      // node / native env
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).Date = dateClass;
      // require('perf_hooks').performance.now = function() { return dateClass.now(); };
    }
  }

  setDate(date);
}

/**
 * Reconfigures current test suit to prevent angular components compilation after every test run.
 * Forces angular test bed to re-create zone and all injectable services by directly
 * changing _instantiated to false after every test run.
 * Cleanups all the changes and reverts test bed configuration after suite is finished.
 */

interface TestConfig {
  defaults: TestModuleMetadata;
  fixture: ComponentFixture<any> | null;
  warpSpeed: boolean;
}

const config: TestConfig = {
  defaults: { imports: [], declarations: [], providers: [] },
  fixture: null,
  warpSpeed: false,
};

/**
 * Experimental feature for running tests faster.
 */
export function setWarpSpeed() {
  config.warpSpeed = true;
}

/**
 * Allows you to set a default module definition to be added to all modules when using configureTestSuite
 * Useful for NoopAnimationsModule, RouterTestModule etcetera.
 * Use this in your test.js file at the root of your project
 */
export function setDefaultConf(
  conf: TestModuleMetadata | null = null,
  providers: any[] = [],
  locale = 'nb'
) {
  if (!conf) {
    conf = {
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: LOCALE_ID, useValue: locale }],
    };
  }
  conf.providers = [...(conf.providers || []), ...providers];
  config.defaults = conf;
}

/**
 * Allows you to set a fixture to be used as default fixture when using query functions
 * If you provide a component to configureTestSuite, you don't need to set this
 */
export function setFixture(fixture: ComponentFixture<any>) {
  config.fixture = fixture;
}

/**
 * Creates a component and sets its fixture as default fixture.
 * Does not submit the fixture on the stream
 */
export function createComponent(componentClass: any): ComponentFixture<any> {
  const fixture = TestBed.createComponent(componentClass);
  config.fixture = fixture;
  return fixture;
}

export function detectChanges() {
  config.fixture && config.fixture.detectChanges();
}

/**
 * Creates a module and a component fixture for you
 */
export const configureTestSuite = (
  module?: TestModuleMetadata | any,
  componentClass?: any
) => {
  const testBedApi: any = getTestBed();
  const originReset = TestBed.resetTestingModule;
  const fixture$ = new Subject<ComponentFixture<any>>();

  if (config.warpSpeed) {
    beforeAll(() => {
      TestBed.resetTestingModule();
      TestBed.resetTestingModule = () => TestBed;
    });
  }

  if (module) {
    beforeEach(
      waitForAsync(() => {
        const c = { ...config.defaults } as TestModuleMetadata;
        if (module.imports) {
          c.imports = [...(c.imports || []), ...module.imports];
          c.providers = [...(c.providers || []), ...(module.providers || [])];
          c.declarations = [
            ...(c.declarations || []),
            ...(module.declarations || []),
          ];
        } else {
          c.imports && c.imports.push(module);
        }
        TestBed.configureTestingModule(c).compileComponents();
      })
    );
    if (componentClass) {
      beforeEach(() => {
        const fixture = createComponent(componentClass);
        fixture$.next(fixture);
      });
    }
  }
  afterAll(() => {
    clearDate();
  });
  if (config.warpSpeed) {
    afterEach(() => {
      testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) =>
        fixture.destroy()
      );
      testBedApi._activeFixtures = [];
      testBedApi._instantiated = false;
      testBedApi._testModuleRef = null;
    });

    afterAll(() => {
      TestBed.resetTestingModule = originReset;
      TestBed.resetTestingModule();
      cleanStylesFromDOM();
    });
  }
  return fixture$;
};

/**
 * Shorthand for fixture.debugElement.query(By.css(selector))
 */
export function q(
  selector: string,
  fixture?: ComponentFixture<any>
): DebugElement | null {
  const f = fixture || config.fixture;
  if (!f) {
    return null;
  }
  return f.debugElement.query(By.css(selector));
}

/**
 * Shorthand for fixture.debugElement.query(By.css(selector)) given the element text equals withText
 */
export function qT(
  selector: string,
  withText: string,
  fixture?: ComponentFixture<any>
): DebugElement | null {
  return (
    qAll(selector, fixture).find((elm) => elmText(elm) === withText) || null
  );
}
/**
 * Shorthand for fixture.debugElement.queryAll(By.css(selector))
 */
export function qAll(
  selector: string,
  fixture?: ComponentFixture<any>
): DebugElement[] {
  const f = fixture || config.fixture;
  return f ? f.debugElement.queryAll(By.css(selector)) : [];
}

/**
 * Shorthand for fixture.debugElement.query(By.css(selector)).nativeElement
 */
export function qn(
  selector: string,
  fixture?: ComponentFixture<any>
): HTMLElement | HTMLInputElement | any {
  const elm = q(selector, fixture);
  return elm ? elm.nativeElement : null;
}

/**
 * Shorthand for fixture.debugElement.query(By.css(selector)).nativeElement given the element text equals withText
 */
export function qnT(
  selector: string,
  withText: string,
  fixture?: ComponentFixture<any>
): HTMLElement | HTMLInputElement | any {
  const elm = qT(selector, withText, fixture);
  return elm ? elm.nativeElement : null;
}

/**
 * Shorthand for fixture.debugElement.queryAll(By.css(selector)) mapped to nativeElement[]
 */
export function qnAll(
  selector: string,
  fixture?: ComponentFixture<any>
): HTMLElement[] {
  return qAll(selector, fixture).map((de) => de.nativeElement);
}

/**
 * Sets a value on an input element and dispatches the 'input' event
 */
export function setValue(inputElm: HTMLInputElement, val: string) {
  inputElm.value = val;
  inputElm.dispatchEvent(new Event('input'));
}

/**
 * Sets a value on an input element, dispatches the 'input' and 'blur' event
 */
export function setValueAndBlur(inputElm: HTMLInputElement, val: string) {
  setValue(inputElm, val);
  inputElm.dispatchEvent(new Event('blur'));
}
/**
 * Retrieves an elements inner text with all whitespaces reduced to maximum 1
 */
export function elmText(elm?: any) {
  const fixture = config.fixture;
  elm = elm || (fixture ? fixture.debugElement.nativeElement : null);
  if (elm) {
    return (elm.innerText || elm.textContent).replace(/\s+/g, ' ').trim();
  } else {
    return '';
  }
}

function cleanStylesFromDOM(): void {
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  const styles: HTMLCollectionOf<HTMLStyleElement> | [] =
    head.getElementsByTagName('style');
  for (let i = 0; i < styles.length; i++) {
    head.removeChild(styles[i]);
  }
}
