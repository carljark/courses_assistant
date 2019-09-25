import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit {
  limite = 12000;
  min = 50;
  limiteDia = 30;
  minDia = 1;
  redondeoDia = 1;
  diainic = 30;
  sufijoDia = ' días';
  cuotafija = 9;
  eurinic = 500;
  intermedio = 1000;
  redondeo = 50;
  limAlt = 600;
  limcliente = 300;
  limsinplazos = 500;
  fB = 0;
  submitA = $('#enviarformA');
  lCli = document.getElementById('limcliente');
  capaInfo = document.getElementById('txtInfo');
  diasV = 1;
  cdia = $('#cDia');
  plazo = $('#plazo');
  limCli = $('#limcliente');
  deV = $('#devolver');
  constructor() { }
  ngAfterViewInit() {
    $('#slider').on('touchstart mousedown', e => {
      let cant = this.moverSlider(e);
      $('body').on('touchmove mousemove', ev => {
        cant = this.moverSlider(ev);
      }).on('touchend mouseup', _e => {
        $('body').off('touchmove mousemove');
        if (cant <= this.limcliente) {
          this.checkDevolver(cant);
        }
        this.checklimitecliente(cant);
        this.checkLimplazo(cant);
        this.formuAlt(cant);
      });
    });
    $('#subirA').on('click', e => {
      const cuantia = parseInt($('#ctd').val() as string, 10);
      const periodo = parseInt($('#ctdDia').val() as string, 10);
      if (!cuantia || !periodo) {
        alert('Complete todos los campos corréctamente!');
        e.preventDefault();
      } else {
        $('#campoPlazo').val(periodo);
        $('#amount').val(cuantia);
        $('#formA').submit();
      }
    });
    $('#subirB').on('click', e => {
      const nomb = $('#nomb').val();
      const telf = $('#telf').val();
      const mail = $('#mail').val();
      const cant = parseInt($('#ctd').val() as string, 10);
      if (!nomb || !telf || !mail || !cant) {
        alert('Complete todos los campos corréctamente!');
        e.preventDefault();
      } else {
        $('#amountB').val(cant);
        $('#formB').submit();
      }
    });
    $('#sliderDia').on('touchstart mousedown', e => {
      this.moverSliderDia(e);
      $('body').on('touchmove mousemove', ev => {
        this.moverSliderDia(ev);
      }).on('touchend mouseup', _e => {
        $('body').off('touchmove mousemove');
        this.checkDevolver(parseInt($('#ctd').val() as string, 10));
      });
    });
    $('#ctdDia').on('change', e => {
      const valor = parseInt($(this).val() as string, 10);
      let posX: number;
      if (valor >= this.minDia && valor <= this.limiteDia) {
        posX = $('#reglaDia').outerWidth() * valor / this.limiteDia;
        $('#marcadorDia').css('left', posX);
        $('#ctdDia').val(valor + this.sufijoDia);
        $('#ctdDia').css('left', posX);
        $('.progresoDia').css('width', posX);
        this.cambiarTxtDia(valor);
        this.checkDevolver(parseInt($('#ctd').val() as string, 10));
      }
    });
    const posXinicDia = $('#reglaDia').outerWidth() * this.diainic / this.limiteDia;
    $('#marcadorDia').css('left', posXinicDia);
    $('#ctdDia').css('left', posXinicDia);
    $('#ctdDia').val(this.diainic + this.sufijoDia);
    $('.progresoDia').css('width', posXinicDia);
    const posXinic = $('#regla').outerWidth() * this.logposition(this.eurinic) / this.limite;
    $('#marcador').css('left', posXinic);
    $('#marcador').text(this.eurinic + '€');
    $('#ctd').val(this.eurinic + '€');
    this.checklimitecliente(this.eurinic);
  }
  change(event) {
    const numInput = event.target.value;
    const valor = this.logposition(numInput);
    const xMin = $('#regla').outerWidth() * numInput / this.limite;
    let posX: number;
    if (numInput >= this.min && numInput <= this.limite) {
      posX = $('#regla').outerWidth() * valor / this.limite;
      if (valor > xMin) {
        $('#marcador').css('left', posX);
      } else {
        $('#marcador').css('left', xMin);
      }
      $('#marcador').text(numInput + '€');
      $('#ctd').val(numInput + '€');
      this.checklimitecliente(numInput);
      this.checkDevolver(numInput);
      this.checkLimplazo(numInput);
      this.chequear(numInput);
      this.formuAlt(numInput);
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
  checklimitecliente(valor) {
    if (valor <= this.limcliente) {
      this.limCli.hide();
      this.deV.show();
    } else if (valor > this.limcliente && valor <= this.limAlt) {
      this.limCli.show();
      this.deV.hide();
    } else {
      this.limCli.hide();
      this.deV.hide();
    }
  }
  formuAlt(euros) {
    if (euros > this.limAlt && this.fB === 0) {
      this.submitA.hide();
      this.fB = 1;
    } else if (euros <= this.limAlt && this.fB === 1) {
      this.submitA.show();
      this.fB = 0;
    }
  }
  cambiarTxtDia(diaCount) {
    $('#plazo').text('Plazo de devolución: ' + diaCount + ' días');
  }
  moverSliderDia(e) {
    e.preventDefault();
    e.stopPropagation();
    const objetivo = $('#sliderDia');
    const pos = $(objetivo).offset();
    const tipoEvento = e.type;
    let posX: number;
    if (tipoEvento === 'touchstart' || tipoEvento === 'touchmove') {
      const dedo = e.originalEvent.touches[0];
      posX = dedo.pageX - pos.left;
    } else {
      posX = e.pageX - pos.left;
    }
    const value = posX * this.limiteDia / $(objetivo).outerWidth();
    const redondo = value;
    const red10 = Math.round(redondo / this.redondeoDia) * this.redondeoDia;
    if (red10 >= this.minDia && red10 <= this.limiteDia) {
      $('#marcadorDia').css('left', posX + 'px');
      $('#ctdDia').css('left', posX + 'px');
      $('.progresoDia').css('width', posX);
      $('#ctdDia').val(red10 + this.sufijoDia);
      this.cambiarTxtDia(red10);
    }
  }
  moverSlider(e) {
    e.preventDefault();
    e.stopPropagation();
    const objetivo = $('#slider');
    const pos = $(objetivo).offset();
    let posX: number;
    const tipoEvento = e.type;
    if (tipoEvento === 'touchstart' || tipoEvento === 'touchmove') {
      const dedo = e.originalEvent.touches[0];
      posX = dedo.pageX - pos.left;
    } else {
      posX = e.pageX - pos.left;
    }
    const value = posX * this.limite / $(objetivo).outerWidth();
    const redondo = value;
    const posLog = this.logslider(redondo);
    const redPosLog = Math.round(posLog / 50) * 50;
    if (redondo >= this.min && posX >= 0 && posX <= $(objetivo).outerWidth()) {
      $('#marcador').css('left', posX + 'px');
      $('#marcador').text(redPosLog + '€');
      $('#ctd').val(redPosLog + '€');
      return redPosLog;
    } else if (value < this.min) {
      $('#ctd').val(this.min + '€');
      $('#marcador').text(this.min + '€');
      return this.min;
    } else if (posX > $(objetivo).outerWidth()) {
      $('#ctd').val(this.limite + '€');
      $('#marcador').text(this.limite + '€');
      return this.limite;
    }
  }
  chequear(euros) {
    if (euros > this.intermedio) {
      $('.allSlider').css('background-color', 'rgba(0,50,255,0.1)');
    } else {
      $('.allSlider').css('background-color', 'rgba(79,187,71,0.1)');
    }
  }
  logslider(position) {
    const minp = 6000;
    const maxp = 12000;
    const minv = Math.log(1000);
    const maxv = Math.log(12000);
    const scale = (maxv - minv) / (maxp - minp);
    return Math.exp(minv + scale * (position - minp));
  }
  checkDevolver(cantidad) {
    const plazoDias = $('#ctdDia').val() as number;
    const devolver = Math.round(this.cuotafija + cantidad + (cantidad * .2 / 30) * plazoDias);
    $('#devolver').text('Total a devolver: ' + devolver + '€');
    return devolver;
  }
  checkLimplazo(pasta) {
    if (pasta > this.limsinplazos && this.diasV === 1) {
      this.cdia.hide();
      this.plazo.hide();
      this.diasV = 0;
    } else if (pasta < this.limsinplazos && this.diasV === 0) {
      $('#cDia').show();
      $('#plazo').show();
      this.diasV = 1;
    }
  }
}
