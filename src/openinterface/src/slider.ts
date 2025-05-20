import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('og-slider')
export class OGSlider extends LitElement {
  static styles = css`
    .slider-container {
      position: relative;
      height: 21px;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .slider-slot {
      width: 100%;
      height: 5px;
      background: rgba(0,0,0,.08);
      border-radius: 5px;
      box-shadow: inset 0 1px 2px #00000026,0 1px 0 0 #ffffff40;
    }

    .slider-thumb {
      width: 21px;
      height: 21px;
      border-radius: 50%;
      background: #6ce48a;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: inset 1px 1px 1px #fff, inset -1px -1px 0 #0000001a, .444584px .444584px .628737px -.75px #00000042, 1.21072px 1.21072px 1.71222px -1.5px #0000003f, 2.6583px 2.6583px 3.75941px -2.25px #0000003b, 5.90083px 5.90083px 8.34503px -3px #00000031, 10px 10px 21.2132px -3.75px #0000000e;
    }
  `;

  // Variables
  private _value: number = 0;
  private _thumbColor: string = '#6ce48a';
  private _min: number = 0;
  private _max: number = 100;
  private _step: number = 1;
  
  private _isDragging: boolean = false;


  // Properties
  @property({type: Number})
  set value(value: number) {
    this._value = value;
    this.requestUpdate();
  }

  get value() {
    return this._value;
  }

  @property({type: String})
  set thumbColor(value: string) {
    this._thumbColor = value;
    this.requestUpdate();
  }
  get thumbColor() {
    return this._thumbColor;
  }

  // Lifecycle
  constructor() {
    super();
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  firstUpdated() {
    const thumb = this.shadowRoot?.querySelector('.slider-thumb') as HTMLElement;
    if (thumb) {
      thumb.addEventListener('mousedown', this.handleMouseDown);
      
      if (this.value) {
        const slot = this.shadowRoot?.querySelector('.slider-slot') as HTMLElement;
        if (slot) {
          const slotWidth = slot.offsetWidth;
          const thumbWidth = thumb.offsetWidth;
          const percentage = (this.value - this._min) / (this._max - this._min);
          thumb.style.transform = `translateX(${percentage * (slotWidth - thumbWidth)}px) translateY(-50%)`;
        }
      }
    }
    document.addEventListener('mouseup', this.handleMouseUp);
    this.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseDown() {
    if (this._isDragging) {
      return;
    }
    this._isDragging = true;
    const thumb = this.shadowRoot?.querySelector('.slider-thumb') as HTMLElement;
    if (thumb) {
      thumb.style.transition = 'transform 0s';
    }
  }

  private handleMouseUp() {
    if (!this._isDragging) {
      return;
    }
    this._isDragging = false;
    const thumb = this.shadowRoot?.querySelector('.slider-thumb') as HTMLElement;
    if (thumb) {
      thumb.style.transition = 'transform 0.2s';
    }
  }

  private handleMouseMove(e: MouseEvent) {
    if (!this._isDragging) {
      return;
    }
    const thumb = this.shadowRoot?.querySelector('.slider-thumb') as HTMLElement;
    const slot = this.shadowRoot?.querySelector('.slider-slot') as HTMLElement;
    if (thumb && slot) {
      const slotWidth = slot.offsetWidth;
      const thumbWidth = thumb.offsetWidth;
      const slotLeft = slot.getBoundingClientRect().left;
      const slotRight = slot.getBoundingClientRect().right;
      const x = e.clientX;
      if (x < slotLeft) {
        this.value = this._min;
        thumb.style.transform = `translateX(0) translateY(-50%)`;
      } else if (x > slotRight) {
        this.value = this._max;
        thumb.style.transform = `translateX(${slotWidth - thumbWidth}px) translateY(-50%)`;
      } else {
        const percentage = (x - slotLeft) / slotWidth;
        const value = this._min + percentage * (this._max - this._min);
        this.value = Math.round(value / this._step) * this._step;
        thumb.style.transform = `translateX(${percentage * (slotWidth - thumbWidth)}px) translateY(-50%)`;
      }
    }
  }

  // Events

  // Methods
  render() {
    return html`
      <div class="slider-container" value="${this.value}">
        <div class="slider-slot">
          <div class="slider-thumb" style="background: ${this.thumbColor}"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'og-slider': OGSlider;
  }
}