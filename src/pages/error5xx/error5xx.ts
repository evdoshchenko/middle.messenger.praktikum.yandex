import Block from 'core/Block';

export class Error5xxPage extends Block<{}> {
  render() {
    return `
    <div class="form__wrapper">
      <div class="form form-error">

        <div class="form__top">
          {{{Title text="Error 500"}}}
          {{{Subtitle text="We are fixing it!"}}}
        </div>
        
        <div class="form__bottom">
          {{{Button text="Go back to Heylynx" link="/messenger" onClick=onSubmit}}}
        </div>

      </div>
    </div>
    `;
  }
}
