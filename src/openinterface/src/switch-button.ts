import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { CLICK_SOUND } from './sound-map';


@customElement('og-switch-button')
export class OGSwitchButton extends LitElement {
  static styles = css`
    .switch-button-container {
      position: relative;
      width: 42px;
      height: 25px;
      background: rgba(0,0,0,.08);
      box-shadow: inset 0 1px 2px #00000026,0 1px 0 0 #ffffff40;
      border-radius: 100px;
      transition: background 0.2s ease;
      display: flex;
      align-items: center;
    }

    .switch-button-slot {
      display: block;
      width: 21px;
      height: 21px;
      transform: translateX(2px);
      border-radius: 100%;
      transition: transform .25s ease;
      background: #f4f4f4;
      will-change: transform;
      box-shadow: inset 1px 1px 1px #fff, inset -1px -1px 0 #0000001a, .444584px .444584px .628737px -.75px #00000042, 1.21072px 1.21072px 1.71222px -1.5px #0000003f, 2.6583px 2.6583px 3.75941px -2.25px #0000003b, 5.90083px 5.90083px 8.34503px -3px #00000031, 10px 10px 21.2132px -3.75px #0000000e;
    }
  `;

  // Variables
  private _active: boolean = false;
  private _pressedSound: HTMLAudioElement;
  private _color: string = '#6ce48a';
  
  // Properties
  @property({type: Boolean})
  set active(value: boolean) {
    this._active = value;
    this.requestUpdate();
  }

  get active() {
    return this._active;
  }

  @property({type: String})
  set color(value: string) {
    this._color = value;
    this.requestUpdate();
  }
  get color() {
    return this._color;
  }

  // Lifecycle
  constructor() {
    super();
    this._pressedSound = new Audio(CLICK_SOUND);
    this._pressedSound.volume = 0.2;
  }

  firstUpdated() {
    this.addEventListener('click', this._toggleActive);
  }

  // Methods
  private _toggleActive() {
    this._pressedSound.play();
    this.active = !this.active;

    const container = this.shadowRoot?.querySelector('.switch-button-container') as HTMLElement;
    const slot = this.shadowRoot?.querySelector('.switch-button-slot') as HTMLElement;
    if (slot && container) {
      slot.style.transform = this.active ? 'translateX(19px)' : 'translateX(2px)';
      container.style.background = this.active ? this.color : 'rgba(0,0,0,.08)';
    }
  }
  
  render() {
    return html`
      <div class="switch-button-container">
        <div class="switch-button-slot"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'og-switch-button': OGSwitchButton;
  }
}
