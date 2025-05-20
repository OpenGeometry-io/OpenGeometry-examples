import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { PRESSED_SOUND } from './sound-map';

type ButtonIndicatorPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

@customElement('og-button')
export class OGButton extends LitElement {
  static styles = css`
    .button-container {
      color: #fff;
      border: none;
      padding: 12px;
      cursor: pointer;
      position: relative;
      display: flex;
      width: fit-content;
      background: rgb(244, 244, 244);
      border-radius: 5px;
      box-shadow: rgb(255, 255, 255) 1px 1px 1px 0px inset, rgba(0, 0, 0, 0.15) -1px -1px 1px 0px inset, rgba(0, 0, 0, 0.26) 0.444584px 0.444584px 0.628737px -1px, rgba(0, 0, 0, 0.247) 1.21072px 1.21072px 1.71222px -1.5px, rgba(0, 0, 0, 0.23) 2.6583px 2.6583px 3.75941px -2.25px, rgba(0, 0, 0, 0.192) 5.90083px 5.90083px 8.34503px -3px, rgba(0, 0, 0, 0.055) 10px 10px 21.2132px -3.75px, rgba(0, 0, 0, 0.05) -0.5px -0.5px 0px 0px;
    }

    .button-indicator {
      display: none;
      position: absolute;
      background: #d1ccbf;
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    button {
      background: unset;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .button-container-press {
      box-shadow: rgb(255, 255, 255) 0.5px 0.5px 1px inset, rgba(0, 0, 0, 0.15) -0.5px -0.5px 1px inset, rgba(0, 0, 0, 0.2) 0.222px 0.222px 0.314px -0.5px, rgba(0, 0, 0, 0.18) 0.605px 0.605px 0.856px -1px, rgba(0, 0, 0, 0.25) 1.329px 1.329px 1.88px -1.5px, rgba(0, 0, 0, 0.1) 2.95px 2.95px 4.172px -2px, rgba(0, 0, 0, 0.15) 2.5px 2.5px 3px -2.5px, rgba(0, 0, 0, 0.1) -0.5px -0.5px 0px 0px;
    }
  `;

  // Variables
  private _indicatorPosition: ButtonIndicatorPosition = 'topLeft';
  private _label: string = '';
  private _isClickyButton: boolean = false;
  private _indicatorColor: string = '#6ce48a';
  private _indicatorSize: number = 7;
  private _active: boolean = false;
  clickSound: HTMLAudioElement;

  // Properties
  @property({type: String})
  set label(value: string) {
    this._label = value;
  }

  get label() {
    return this._label;
  }

  @property({type: Function})
  declare onClick: () => void;

  @property({type: String})
  set indicatorPosition(value: ButtonIndicatorPosition) {
    this._indicatorPosition = value;
  }
  get indicatorPosition() {
    return this._indicatorPosition;
  }

  @property({type: Boolean})
  /**
   * If true, the button will have a clicky effect
   * @type {boolean}
   * @default false
   * This needs to be enabled for indicator to be shown
   */
  set isClickyButton(value: boolean) {
    this._isClickyButton = value;
  }
  get isClickyButton() {
    return this._isClickyButton;
  }

  @property({type: String})
  set indicatorColor(value: string) {
    this._indicatorColor = value;
  }
  get indicatorColor() {
    return this._indicatorColor;
  }

  @property({type: Number})
  set indicatorSize(value: number) {
    if (value < 0) {
      throw new Error('Indicator size must be greater than 0');
    } else if (value > 20) {
      this._indicatorSize = 20;
      throw new Error('Indicator size must be less than 20');
    } else {
      this._indicatorSize = value;
    }
  }
  get indicatorSize() {
    return this._indicatorSize;
  }

  constructor() {
    super();
    this.clickSound = new Audio(PRESSED_SOUND);
    this.clickSound.volume = 0.1;
    this.clickSound.load();
  }

  // Lifecycle - Every Modification to the DOM should be done here, e.g. setting up event listeners, blocking the shadow root, etc.
  firstUpdated() {
    const container = this.shadowRoot?.querySelector('.button-container') as HTMLElement;
    const indicator = this.shadowRoot?.querySelector('.button-indicator') as HTMLElement;
    const button = this.shadowRoot?.querySelector('button') as HTMLElement;

    indicator.style.backgroundColor = this.indicatorColor;
    indicator.style.width = `${this.indicatorSize}px`;
    indicator.style.height = `${this.indicatorSize}px`;

    if (this.isClickyButton) {
      const buttonContainerPadding = parseInt(window.getComputedStyle(container).paddingTop);
      const indicatorPositionStyle = this.getMarginOption(buttonContainerPadding);
      indicator.style.cssText = indicatorPositionStyle + 'display: block;';

      console.log(this.indicatorPosition);
      const marginOptionString = this.getButtonPlacementStyle();
      button.style.margin = `0 0 0 0`;
      console.log(marginOptionString);
      button.style.cssText = marginOptionString;
    }

    container.addEventListener('click', () => {
      // play sound
      this.clickSound.play();

      if (!this.isClickyButton) {
        container.classList.add('button-container-press');
        setTimeout(() => {
          container.classList.remove('button-container-press');
        }
        , 100);

        return;
      }
      
      if (!this._active) {
        indicator.style.backgroundColor = this.indicatorColor;
        this._active = true;
        container.classList.add('button-container-press');
      } else {
        indicator.style.backgroundColor = '#d1ccbf';
        this._active = false;
        container.classList.remove('button-container-press');
      }
    });
  }

  private getButtonPlacementStyle() {
    let positionStyle = '';
    const marginValue = this.indicatorSize + 10;
    switch (this.indicatorPosition) {
      case 'topLeft':
        positionStyle = `margin-top: ${marginValue}px; margin-left: ${marginValue}px;`;
        break;
      case 'topRight':
        positionStyle = `margin-top: ${marginValue}px; margin-right: ${marginValue}px;`;
        break;
      case 'bottomLeft':
        positionStyle = `margin-bottom: ${marginValue}px; margin-left: ${marginValue}px;`;
        break;
      case 'bottomRight':
        positionStyle = `margin-bottom: ${marginValue}px; margin-right: ${marginValue}px;`;
        break;
      default:
        break;
    }
    return positionStyle;
  }

  private getMarginOption(buttonContainerPadding: number) {
    let positionStyle = '';
    switch (this.indicatorPosition) {
      case 'topLeft':
        positionStyle = `top: ${buttonContainerPadding}px; left: ${buttonContainerPadding}px;`;
        break;
      case 'topRight':
        positionStyle = `top: ${buttonContainerPadding}px; right: ${buttonContainerPadding}px;`;
        break;
      case 'bottomLeft':
        positionStyle = `bottom: ${buttonContainerPadding}px; left: ${buttonContainerPadding}px;`;
        break;
      case 'bottomRight':
        positionStyle = `bottom: ${buttonContainerPadding}px; right: ${buttonContainerPadding}px;`;
        break;
      default:
        break;
    }
    return positionStyle;
  }

  render() {
    return html`
      <div class="button-container">
        <button @click=${this.onClick}>${this.label}</button>
        <div class="button-indicator"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'og-button': OGButton;
  }
}
