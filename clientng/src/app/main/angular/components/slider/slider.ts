import * as $ from 'jquery';

const limiteDia = 30;
const minDia = 1;
const redondeoDia = 1;
const diainic = 30;
const sufijoDia = ' días';
const cuotafija = 9;
const eurinic = 500;
const limite = 12000;
const intermedio = 1000;
const min = 50;
// let plazo = 30;
const redondeo = 50;
const limAlt = 600;
const limcliente = 300;
const limsinplazos = 500;
let fB = 0;
const submitA = $('#enviarformA');
// const formB = $('#formB');
// const formB = $('#form600');
const f600 = document.getElementById('form600');
const lCli = document.getElementById('limcliente');
const capaInfo = document.getElementById('txtInfo');
function formuAlt(euros) {
    if (euros > limAlt && fB === 0) {
        submitA.hide();
        // formB.show();
        // formB.css("className", "fbShow");
        f600.className = 'fbShow';
        lCli.className = 'fbShow';
        capaInfo.className = 'fbHide';
        fB = 1;
    } else if (euros <= limAlt && fB === 1) {
        submitA.show();
        // formB.hide();
        // formB.css("className", "fbHide");
        f600.className = 'fbHide';
        lCli.className = 'fbHide';
        capaInfo.className = 'col-md-4 col-md-push-1 informacion';
        fB = 0;
    }
}
// formuAlt(eurinic);

function chequear(euros) {
    if (euros > intermedio) {
        // $('.allSlider').css({"background-color", rgba(0,50,255,0.3)});
        $('.allSlider').css('background-color', 'rgba(0,50,255,0.1)');
    } else {
        $('.allSlider').css('background-color', 'rgba(79,187,71,0.1)');
    }
}

function logslider(position) {
    // position will be between 0 and 100
    const minp = 6000;
    const maxp = 12000;

    // The result should be between 100 an 10000000
    const minv = Math.log(1000);
    const maxv = Math.log(12000);

    // calculate adjustment factor
    const scale = (maxv - minv) / (maxp - minp);

    return Math.exp(minv + scale * (position - minp));
}

function logposition(value) {
    // set minv, ... like above
    // ...
    const minp = 6000;
    const maxp = 12000;

    // The result should be between 100 an 10000000
    const minv = Math.log(1000);
    const maxv = Math.log(12000);

    // calculate adjustment factor
    const scale = (maxv - minv) / (maxp - minp);

    return (Math.log(value) - minv) / scale + minp;
}

function checkDevolver(cantidad) {
    const plazoDias = $('#ctdDia').val() as number;
    const devolver = Math.round(cuotafija + cantidad + (cantidad * .2 / 30) * plazoDias);
    // const devolver = 0;
    $('#devolver').text('Total a devolver: ' + devolver + '€');
    return devolver;
}
let diasV = 1;
const cdia = $('#cDia');
const plazoInput = $('#plazo');
function checkLimplazo(pasta) {
    if (pasta > limsinplazos && diasV === 1) {
        cdia.hide();
        plazoInput.hide();
        diasV = 0;
    } else if (pasta < limsinplazos && diasV === 0) {
        $('#cDia').show();
        $('#plazo').show();
        diasV = 1;
    }
}

const limCli = $('#limcliente');
const deV = $('#devolver');
function checklimitecliente(valor) {
    if (valor <= limcliente) {
        limCli.hide();
        deV.show();
    } else if (valor > limcliente && valor <= limAlt) {
        limCli.show();
        deV.hide();
    } else {
        limCli.hide();
        deV.hide();
    }
}

function moverSlider(e) {
    e.preventDefault();
    e.stopPropagation();
    const objetivo = $('#slider');
    const pos = $(objetivo).offset();
    const tipoEvento = e.type;
    let posX: number;
    if (tipoEvento === 'touchstart' || tipoEvento === 'touchmove') {
        const dedo = e.originalEvent.touches[0];
        posX = dedo.pageX - pos.left;
    } else {
        posX = e.pageX - pos.left;
    }
    const value = posX * limite / $(objetivo).outerWidth();
    // const redondo = parseInt(value, 10);
    const redondo = value;
    // const red10 = Math.round(redondo/50)*50;
    const posLog = logslider(redondo);
    const redPosLog = Math.round(posLog / 50) * 50;
    if (redondo >= min && posX >= 0 && posX <= $(objetivo).outerWidth()) {
        $('#marcador').css('left', posX + 'px');
        $('#marcador').text(redPosLog + '€');
        $('#ctd').val(redPosLog + '€');
        return redPosLog;
    } else if (value < min) {
        $('#ctd').val(min + '€');
        $('#marcador').text(min + '€');
        return min;
    } else if (posX > $(objetivo).outerWidth()) {
        $('#ctd').val(limite + '€');
        $('#marcador').text(limite + '€');
        return limite;
    }
}

$('#slider').on('touchstart mousedown', (e) => {
    let cant = moverSlider(e);
    $('body').on('touchmove mousemove', (ev) => {
        cant = moverSlider(ev);
    }).on('touchend mouseup', (_e) => {
        $('body').off('touchmove mousemove');
        if (cant <= limcliente) {
            checkDevolver(cant);
        }
        checklimitecliente(cant);
        checkLimplazo(cant);
        formuAlt(cant);
        // chequear(cant);
    });
});

$('#subirA').on('click', (e) => {
    const cuantia = $('#ctd').val();
    const periodo = $('#ctdDia').val();
    if (!cuantia || !periodo) {
        alert('Complete todos los campos corréctamente!');
        e.preventDefault();
    } else {
        $('#campoPlazo').val(periodo);
        $('#amount').val(cuantia);
        $('#formA').submit();
    }
});

$('#subirB').on('click', (e) => {
    const nomb = $('#nomb').val();
    const telf = $('#telf').val();
    const mail = $('#mail').val();
    const cant = $('#ctd').val();
    if (!nomb || !telf || !mail || !cant) {
        alert('Complete todos los campos corréctamente!');
        e.preventDefault();
    } else {
        $('#amountB').val(cant);
        $('#formB').submit();
        // const cantB = $('#amountB').val();
        // alert(nomb + "\n" + telf + "\n" + mail + "\n" + cantB);
    }
});

$('#ctd').on('change', (e) => {
    const numInput = $(this).val() as number;
    const valor = logposition(numInput);
    const xMin = $('#regla').outerWidth() * numInput / limite;
    if (numInput >= min && numInput <= limite) {
        const posX = $('#regla').outerWidth() * valor / limite;
        if (valor > xMin) {
            $('#marcador').css('left', posX);
        } else {
            $('#marcador').css('left', xMin);
        }
        $('#marcador').text(numInput + '€');
        $('#ctd').val(numInput + '€');
        checklimitecliente(numInput);
        checkDevolver(numInput);
        checkLimplazo(numInput);
        chequear(numInput);
        formuAlt(numInput);
    } else {
        alert('¡El valor no es correcto!');
    }

    // $("#contctd").css('left', posX+30+'px');
});


function cambiarTxtDia(diaCount) {
    $('#plazo').text('Plazo de devolución: ' + diaCount + ' días');
}

function moverSliderDia(e) {
    e.preventDefault();
    e.stopPropagation();
    // const dedo = e.originalEvent.touches[0];
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
    const value = posX * limiteDia / $(objetivo).outerWidth();
    const redondo = value;
    const red10 = Math.round(redondo / redondeoDia) * redondeoDia;
    if (red10 >= minDia && red10 <= limiteDia) {
        $('#marcadorDia').css('left', posX + 'px');
        $('#ctdDia').css('left', posX + 'px');
        $('.progresoDia').css('width', posX);
        $('#ctdDia').val(red10 + sufijoDia);
        cambiarTxtDia(red10);
    }
}

$('#sliderDia').on('touchstart mousedown', (e: any) => {
    moverSliderDia(e);
    $('body').on('touchmove mousemove', (ev: any) => {
        moverSliderDia(ev);
    }).on('touchend mouseup', function (_e: any) {
        $('body').off('touchmove mousemove');
        checkDevolver($('#ctd').val());
    });
});


$('#ctdDia').on('change', (e) => {
    let valor: number;
    valor = $(this).val() as number;
    if (valor >= minDia && valor <= limiteDia) {
        const posX = $('#reglaDia').outerWidth() * valor / limiteDia;
        $('#marcadorDia').css('left', posX);
        $('#ctdDia').val(valor + sufijoDia);
        $('#ctdDia').css('left', posX);
        $('.progresoDia').css('width', posX);
        cambiarTxtDia(valor);
        checkDevolver($('#ctd').val());
    }
});
const posXinicDia = $('#reglaDia').outerWidth() * diainic / limiteDia;
$('#marcadorDia').css('left', posXinicDia);
$('#ctdDia').css('left', posXinicDia);
$('#ctdDia').val(diainic + sufijoDia);
$('.progresoDia').css('width', posXinicDia);
const posXinic = $('#regla').outerWidth() * logposition(eurinic) / limite;
$('#marcador').css('left', posXinic);
$('#marcador').text(eurinic + '€');
$('#ctd').val(eurinic + '€');
checklimitecliente(eurinic);
