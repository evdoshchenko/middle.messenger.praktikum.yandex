import Block from 'core/Block';

export class Error404Page extends Block<{}> {
  render() {
    return `
    <div class="form__wrapper">
      <div class="form form-error">

        <div class="form__top">
          {{{Title text="Error 404"}}}
          {{{Subtitle text="OOPS! Page not found!!"}}}
        </div>
        
        <div class="form__bottom">
          {{{Button text="Go back to Heylynx" link="/error500" onClick=onSubmit}}}
        </div>

      </div>
    </div>
    `;
  }
}
