import { NgZone, Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-slider-ng',
  templateUrl: './slider.ng.component.html',
  styleUrls: ['./slider.ng.component.css']
})
export class SliderNgComponent implements AfterViewInit {
  limite = 12000;
  min = 50;
  diasV = 1;
  initialX: number;
  posX = 0;
  xMin: number;
  @ViewChild('slider', { static: true }) slider: ElementRef;
  @ViewChild('regla', { static: true }) regla: ElementRef;
  @ViewChild('marcador', { static: true }) marcador: ElementRef;
  @ViewChild('ctd', { static: true }) ctd: ElementRef;
  actualMoney = '50€';
  element: HTMLElement;
  mouseDown = false;
  constructor(
    private el: ElementRef,
    private zone: NgZone
  ) { }
  ngAfterViewInit() {
    setTimeout(() => {
      this.initialX = this.slider.nativeElement.offsetLeft;
    }, 1000);
  }
  changectd(event) {
    const numInput = event.target.value;
    const valor = this.logposition(numInput);
    // const xMin = this.regla.nativeElement.outerWidth() * numInput / this.limite;
    this.xMin = this.regla.nativeElement.width * numInput / this.limite;
    if (numInput >= this.min && numInput <= this.limite) {
      // posX = this.regla.nativeElement.outerWidth() * valor / this.limite;
      this.posX = this.regla.nativeElement.width * valor / this.limite;
      if (valor > this.xMin) {
        console.log('el valor es mayor que xMin');
      } else {
        this.posX = this.xMin;
      }
      this.actualMoney = numInput + '€';
    } else {
      alert('¡El valor no es correcto!');
    }
  }
  logposition(value): number {
    const minp = 6000;
    const maxp = 12000;
    const minv = Math.log(1000);
    const maxv = Math.log(12000);
    const scale = (maxv - minv) / (maxp - minp);
    return (Math.log(value) - minv) / scale + minp;
  }
  onMouseDown(event) {
    this.mouseDown = true;
    this.element = event.target;
  }
  onMouseClick(event) {
    this.move(event);
  }
  onMouseMove(event) {
    event.preventDefault();
    if (this.mouseDown) {
      this.move(event);
    }
  }
  onMouseUp(event) {
    this.mouseDown = false;
  }
  move(event) {
    if (event.clientX > (event.path[1].clientWidth + this.initialX)) {
      this.posX = event.path[1].clientWidth;
    } else if (event.clientX - this.initialX > 0) {
      this.posX = event.clientX - this.initialX;
    } else {
      this.posX = 0;
    }
  }
}

