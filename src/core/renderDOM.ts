import Block from './Block';

type Props = {
};

export default function renderDOM(block: Block<Props>) {
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
