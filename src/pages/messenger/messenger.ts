import Block from 'core/Block';

export class MessengerPage extends Block<{}> {
  constructor() {
    super();

    this.setProps({
      emailValue: '',

      onSubmit: (e: FocusEvent) => {
        e.preventDefault();
      },
    });
  }

  render() {
    return `
    <div class="messenger">
      <div class="messenger__left">
        {{{Search name="Search" placeholder="search"}}}
        {{{Chats}}}
        {{{Tabs}}}
      </div>

      <div class="messenger__right">
        {{{Contact}}}
        {{{Chat}}}
        {{{Message}}}
      </div>
    </div>
    `;
  }
}
