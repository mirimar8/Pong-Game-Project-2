import { SVG_NS } from '../settings';

export default class Board {
  constructor( width, height) {
      this.width = width;
      this.height = height;

  }
  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "fill", "#353535");
    rect.setAttributeNS(null, "x", 0);
    rect.setAttributeNS(null, "y", 0);
    svg.appendChild(rect);


;  }
}