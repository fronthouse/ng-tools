import { AppComponent } from './app.component';
import {
  detectChanges,
  qn,
  ComponentFixture,
  elmText,
  configureTestingModule
} from '../../../../libs/testhelp/src';// '@fronthouse/testhelp';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  configureTestingModule(AppComponent, AppModule).subscribe((f) => (fixture = f));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app1'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app1');
  });

  it('should render title', () => {
    detectChanges();
    expect(elmText(qn('h1'))).toContain('Welcome to app1!');
  });
});
