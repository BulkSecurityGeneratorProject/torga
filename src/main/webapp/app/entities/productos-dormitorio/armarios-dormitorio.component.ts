import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { LoginService } from 'app/core/login/login.service';
import { DimensionesProductoService } from '../dimensiones-producto/dimensiones-producto.service';
import { AcaProdService } from '../aca-prod/aca-prod.service';
import { TiposApoyoService } from '../tipos-apoyo/tipos-apoyo.service';
import { DimensionesProductoTipoService } from '../dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { IArmario } from 'app/shared/model/armario.model';
import { ArmarioService } from '../armario/armario.service';
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { IAcabados } from 'app/shared/model/acabados.model';
import { PresupuestoPedidoService } from '../presupuesto-pedido/presupuesto-pedido.service';
import { IDimensionesProducto } from 'app/shared/model/dimensiones-producto.model';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { AccountService, UserService, User } from 'app/core';
import { Observable } from 'rxjs';
import { IluminacionService } from '../iluminacion/iluminacion.service';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ProductosDormitorioService } from './productos-dormitorio.service';
import { AcabadosService } from 'app/entities/acabados';
import * as $ from 'jquery';
import { IluminacionProdPrePedService } from '../iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { InterioresService } from '../interiores/interiores.service';
import { MedidasEspecialesService } from '../medidas-especiales/medidas-especiales.service';
import { MedEspProductoPedidoPresuService } from '../med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { InterioresArmariosService } from '../interiores-armarios/interiores-armarios.service';
import { InteriorArmarioDentroService } from '../interior-armario-dentro/interior-armario-dentro.service';
import { TiradoresArmarioService } from '../tiradores-armario/tiradores-armario.service';
import { ITiradoresArmario } from 'app/shared/model/tiradores-armario.model';
import { IInterioresArmarios } from 'app/shared/model/interiores-armarios.model';
import { IInteriorArmarioDentro } from 'app/shared/model/interior-armario-dentro.model';
import { IPuertas } from 'app/shared/model/puertas.model';
import { PuertasService } from '../puertas/puertas.service';
import { ICasco } from 'app/shared/model/casco.model';
import { CascoService } from '../casco/casco.service';
import { IPuertasPrecios } from 'app/shared/model/puertas-precios.model';
import { PuertasPreciosService } from '../puertas-precios/puertas-precios.service';
import { IInterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';
import { InterioresArmarioNuevosService } from '../interiores-armario-nuevos/interiores-armario-nuevos.service';
@Component({
    selector: 'jhi-productos-dormitorio',
    templateUrl: './armarios-dormitorio.component.html'
})
export class ArmariosDormitorioComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    productosDormitorios: IProductosDormitorio[];
    dimensionesProductos: IDimensionesProducto[];
    productosDormitorioPrueba: IProductosDormitorio;
    error: any;
    success: any;
    tiradores: any;
    valores: any;
    apoyo: any;
    idInteriorInput: any;
    numeroPuertas: any;
    isSaving: boolean;
    tiradoresBuenos: any;
    especiales: any;
    acaProd: IAcaProd;
    cogerPuertasInterior: any;
    acabadosProductos: any;
    iluminacion: any;
    dimenArmarios: any;
    nombreTipoPuerta: any;
    numeroInteriorArmario: any;
    tipoPuerta1: any;
    dimensionesArmarios: any;
    acabados: any;
    interiorArmario: any;
    armariosTabla: any;
    mismoInterior: any;
    idInteriorCogido: any;
    acabadosPuertas: any;
    todosAcabados: any;
    acabadosPuertasTodos: any;
    acaProdPed: any;
    acabadosInteriorArmario: any;
    acabadosPuertasId: any;
    precioTienda: any;
    interioresArmarios: any;
    armarios: any;
    presupuestoPedido: IPresupuestoPedido;
    presupuesto: any;
    productosPresupuestoPedidos: IProductosPresupuestoPedidos;
    user: any;
    puertasTabla: any;
    todasDimensiones: any;
    interiores: any;
    eventSubscriber: Subscription;
    routeData: any;
    posicionInput: any;
    posicionU: any;
    links: any;
    totalItems: any;
    queryCount: any;
    idArmarioCogido: any;
    itemsPerPage: any;
    sistemasApoyo: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    tipoPuerta: any;
    numeroDeHuecos: any;
    todos: any;
    acabadosTrasera: any;
    acabadosInteriores: any;
    productosDormitorioModal: any;
    huecoPinta: any;
    puertasModal: any;
    arrayLetras: any;
    arraySaberHuecos: any;
    arraySaberPuertas: any;
    idPuertaInput: any;
    acabadosPuerta1: any;
    acabadosPuerta2: any;
    acabadosPuerta3: any;
    acabadosPuerta4: any;
    acabadosPuerta5: any;
    acabadosPuerta6: any;
    acabadosPuerta7: any;
    acabadosPuerta8: any;
    textoArmario: any;
    saberPuerta: any;
    constructor(
        protected tiposApoyoService: TiposApoyoService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        protected interioresArmarioNuevosService: InterioresArmarioNuevosService,
        protected acabadosService: AcabadosService,
        protected puertasPreciosService: PuertasPreciosService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected iluminacionService: IluminacionService,
        protected tiradoresArmarioService: TiradoresArmarioService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected interioresService: InterioresService,
        protected interiorArmarioDentroService: InteriorArmarioDentroService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        public acaProdService: AcaProdService,
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected userService: UserService,
        protected cascoService: CascoService,
        protected interioresArmariosService: InterioresArmariosService,
        protected dimensionesProductoService: DimensionesProductoService,
        public armarioService: ArmarioService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected puertasService: PuertasService,
        protected router: Router,
        protected eventManager: JhiEventManager,
        private loginService: LoginService,
        private http: HttpClient
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    public borrarProdCalculadora() {
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#total').empty();
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#medidas').css({ display: 'none' });
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
    }

    public borrarCarritoProd(id) {
        var Borrar = $('#productoCarrito' + id).attr('class');
        sessionStorage.removeItem(Borrar);
        $('#productoCarrito' + id).remove();
    }

    public enviarCarrito() {
        for (let j = 1; j <= 10; j++) {
            $('#productoCarrito' + j + ' #datos' + j).empty();
            $('#productoCarrito' + j + ' #precios' + j).empty();
            $('#productoCarrito' + j + ' #precioCalculado' + j).empty();
        }
        var contador = 1;
        var acabados = this.acabados;
        var todosAcabados = this.todosAcabados;
        var iluminacion = this.iluminacion;
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        var conta = 0;
        for (let k = 1; k < sessionStorage.length; k++) {
            if (sessionStorage['prod' + k] != null) {
                contador++;
            }
        }
        var contadorProd = contador;
        var contadorDimen = contador;
        var contAca = 0;
        for (let i = 1; i <= 3; i++) {
            const idProd = $('#nombreProd' + i).attr('class');
            const dimen = $('#productoCalculadora1 #precios1 #ancho' + i).attr('class');
            const idApoyo = $('#productoCalculadora1 #precioCalculado1 #apoyo' + i).attr('class');
            const idIluminacion = $('#productoCalculadora1 #precioCalculado1 #iluminacion' + i).attr('class');
            const ancho = $('#productoCalculadora1 #precios1 #ancho' + i).text();
            const alto = $('#productoCalculadora1 #precios1 #alto' + i).text();
            const fondo = $('#productoCalculadora1 #precios1 #fondo' + i).text();
            const precio = $('#productoCalculadora1 #precios1 #alto' + i).attr('class');
            const todasDimensiones = this.todasDimensiones;
            console.log(sessionStorage);
            const prod = [];
            const prods = this.apoyo;
            const apoyoBueno = [];
            const iluBuena = [];
            const sistemasApoyo = this.sistemasApoyo;
            for (let k = 0; k < sistemasApoyo.length; k++) {
                if (sistemasApoyo[k]['id'] == idApoyo) {
                    apoyoBueno[1] = sistemasApoyo[k];
                }
            }

            for (let k = 0; k < iluminacion.length; k++) {
                if (iluminacion[k]['id'] == idIluminacion) {
                    iluBuena[1] = iluminacion[k];
                }
            }
            const aca = [];
            var acabadoCogido;
            for (let j = 1; j <= 100; j++) {
                acabadoCogido = $('#productoCalculadora1 #precios1 #val' + j + 'Dato').attr('class');
                if (acabadoCogido != undefined) {
                    var id1 = parseFloat(acabadoCogido);
                    for (let k = 0; k < 16; k++) {
                        if (acabados[k]['id'] == id1) {
                            aca[j] = acabados[k];
                        }
                    }
                }
            }

            $.each(todasDimensiones, function(index, value) {
                if (value['id'] == dimen) {
                    for (let w = 1; w < aca.length; w++) {
                        value['acabado' + w] = aca[w];
                    }
                    if (value['mensaje'] == 'Medidas Especiales') {
                        value['ancho'] = ancho;
                        value['alto'] = alto;
                        value['fondo'] = fondo;
                        value['precio'] = precio;
                    }
                    value['apoyo'] = apoyoBueno[1];
                    value['iluminacion'] = iluBuena[1];
                    prod[1] = value;
                    sessionStorage.setItem('prod' + contadorDimen, JSON.stringify(prod));
                    contadorDimen++;
                }
            });
        }

        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            if (sesion != null) {
                console.log(sessionStorage);
                $('#productoCarrito' + i).removeAttr('style');
                $('#productoCarrito' + i).attr('style');
                $('#productoCarrito' + i).css({ float: 'left' });
                $('#productoCarrito' + i).attr('class', 'prod' + i);
                $('#productoCarrito' + i + ' #datos' + i).append(
                    '<strong id="nombreProd' + i + '"><font>' + sesion[1]['productosDormitorio']['nombre'] + '</font></strong>'
                );
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Ancho</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font id="ancho' + i + '">' + sesion[1]['ancho'] + '</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Alto</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font id="alto' + i + '">' + sesion[1]['alto'] + '</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Fondo</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font id="fondo' + i + '">' + sesion[1]['fondo'] + '</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                for (let j = 1; j < 100; j++) {
                    if (sesion[1]['acabado' + j] != undefined) {
                        $('#productoCarrito' + i + ' #datos' + i).append('<font>Acabado ' + j + '</font>');
                        $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                        $('#productoCarrito' + i + ' #precios' + i).append(
                            '<font id="acabado' + i + '' + j + '">' + sesion[1]['acabado' + j]['nombre'] + '</font>'
                        );
                        $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                        $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                        $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                    }
                }
                if (sesion[1]['apoyo'] != undefined) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>' + sesion[1]['apoyo']['productoApoyo']['nombre'] + '</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="sistemaApoyo' + i + '" class="' + sesion[1]['apoyo']['id'] + '">-</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>' + sesion[1]['apoyo']['precio'] + '&euro;</font>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                }
                if (sesion[1]['iluminacion'] != undefined) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>Iluminacion</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="iluminacionCarr' + i + '" class="' + sesion[1]['iluminacion']['id'] + '">-</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append(
                        '<font>' + sesion[1]['iluminacion']['precio'] + '&euro;</font>'
                    );
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                }
            }
        }
        $('#productoCalculadora1 #precios1').empty();
        $('#productoCalculadora1 #precioCalculado1').empty();
        $('#productoCalculadora1 #datos1').empty();
        $('#nombreMesita').empty();
        $('#precioDimension').empty();
        $('#total').empty();
        $('.dimensionesColor1').empty();
        $('.dimensionesColor2').empty();
        $('.dimensionesColor3').empty();
        $('.dimensionesColor4').empty();
        $('.dimensionesColor5').empty();
        $('.dimensionesColor6').empty();
        $('.dimensionesColor1').css({ 'background-color': 'white' });
        $('.dimensionesColor2').css({ 'background-color': 'white' });
        $('.dimensionesColor3').css({ 'background-color': 'white' });
        $('.dimensionesColor4').css({ 'background-color': 'white' });
        $('.dimensionesColor5').css({ 'background-color': 'white' });
        $('.dimensionesColor6').css({ 'background-color': 'white' });
        $('#imagenAcabado').remove();
        $('#medidas').css({ display: 'none' });
        $('#acabado').css({ display: 'none' });
        $('.productosColor').css({ 'background-color': 'white' });
        $('#nombreApoyoTitulo').css({ display: 'none' });
        for (let i = 1; i <= 5; i++) {
            $('.apoyoCogido' + i).empty();
        }
        for (let i = 1; i <= 15; i++) {
            $('#aca1' + i).empty();
        }
    }

    public generarPresupuesto() {
        var nombreTexto = [];
        var prodAca = [];
        var ancho = [];
        var alto = [];
        var fondo = [];
        var nombre;
        var idApoyo;
        var ancho = [];
        var alto = [];
        var fondo = [];
        var productosFinal = [];
        var dimensionesFinal = [];
        var nombreAcabado = [];
        var numeroAcaProd = [];
        var apoyosFinal = [];
        var dimensionEspecialBien = [];
        var anchoTexto;
        var altoTexto;
        var fondoTexto;
        var contadorProd = 0;
        var contadorAcabados = 0;
        var contadorAlto = 0;
        var contadorFondo = 0;
        var contadorAncho = 0;
        var contadorApoyo = 0;
        var contadorDimension = 0;
        var contadorProductos = 0;
        var idDimenEsp;
        var precioTexto;
        var contadorIlu = 0;
        var todasDimensiones = this.todasDimensiones;
        var acabados = this.acabados;
        var productos = this.apoyo;
        var apoyos = this.sistemasApoyo;
        var idIlu;
        var prodIlu = [];
        var iluFinal = [];
        var iluminacion = this.iluminacion;
        var nombreAcabado1;
        for (let j = 1; j <= 10; j++) {
            for (let k = 1; k < 100; k++) {
                nombreAcabado1 = $('#acabado' + j + '' + k).text();
                if (nombreAcabado1 != '') {
                    nombreAcabado[contadorAcabados] = nombreAcabado1;
                    numeroAcaProd[j] = contadorAcabados;
                    contadorAcabados++;
                }
            }
            idIlu = $('#productoCarrito' + j + '  #precios' + j + ' #iluminacionCarr' + j + '').attr('class');
            for (let i = 0; i < iluminacion.length; i++) {
                if (idIlu != '' && idIlu != undefined) {
                    if (iluminacion[i]['id'] == idIlu) {
                        iluFinal[contadorIlu] = iluminacion[i];
                        contadorIlu++;
                    }
                }
            }

            idApoyo = $('#sistemaApoyo' + j).attr('class');
            for (let o = 0; o < apoyos.length; o++) {
                if (apoyos[o]['id'] == idApoyo) {
                    apoyosFinal[contadorApoyo] = apoyos[o];
                    contadorApoyo++;
                }
            }

            nombre = $('#nombreProd' + j).text();
            anchoTexto = $('#productoCarrito' + j + ' #ancho' + j).text();
            idDimenEsp = $('#productoCarrito' + j + ' #ancho' + j).attr('class');
            precioTexto = $('#productoCarrito' + j + ' #alto' + j).attr('class');
            altoTexto = $('#productoCarrito' + j + ' #alto' + j).text();
            fondoTexto = $('#productoCarrito' + j + ' #fondo' + j).text();

            if (nombre != '') {
                nombreTexto[contadorProd] = nombre;
                contadorProd++;
            }
            if (anchoTexto != '') {
                ancho[contadorAncho] = anchoTexto;
                contadorAncho++;
            }
            if (altoTexto != '') {
                alto[contadorAlto] = altoTexto;
                contadorAlto++;
            }
            if (fondoTexto != '') {
                fondo[contadorFondo] = fondoTexto;
                contadorFondo++;
            }

            if (nombre != '' && anchoTexto != '' && altoTexto != '' && fondoTexto != '') {
                for (let k = 0; k < productos.length; k++) {
                    if (productos[k]['nombre'] == nombre) {
                        productosFinal[contadorProductos] = productos[k];
                        contadorProductos++;
                    }
                }
                for (let h = 0; h < todasDimensiones.length; h++) {
                    if (
                        todasDimensiones[h]['ancho'] == anchoTexto &&
                        todasDimensiones[h]['alto'] == altoTexto &&
                        todasDimensiones[h]['fondo'] == fondoTexto &&
                        nombre == todasDimensiones[h]['productosDormitorio']['nombre']
                    ) {
                        dimensionesFinal[contadorDimension] = todasDimensiones[h];
                        contadorDimension++;
                    } else {
                        if (todasDimensiones[h]['id'] == idDimenEsp && todasDimensiones[h]['mensaje'] == 'Medidas Especiales') {
                            todasDimensiones[h]['precio'] = precioTexto;
                            todasDimensiones[h]['alto'] = altoTexto;
                            todasDimensiones[h]['ancho'] = anchoTexto;
                            todasDimensiones[h]['fondo'] = fondoTexto;
                            dimensionesFinal[contadorDimension] = todasDimensiones[h];
                            contadorDimension++;
                        }
                    }
                }
            }
        }

        this.isSaving = true;
        var usuarios = this.user;
        var usuario;
        var idUsu = this.currentAccount['id'];
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i]['id'] == idUsu) {
                usuario = usuarios[i];
            }
        }
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

        const prueba = {
            codigo: 'PR-' + usuario['id'],
            pedido: 0,
            user: usuario,
            fecha_presupuesto: output
        };
        this.presupuestoPedido = prueba;
        console.log(this.presupuestoPedido);
        this.subscribeToSaveResponse(this.presupuestoPedidoService.create(this.presupuestoPedido));
        var presupuesto = this.presupuesto;
        var id = localStorage.getItem('ultimoPresupuesto');
        var id1 = parseFloat(id);
        id1 = id1 + 1;
        localStorage.setItem('ultimoPresupuesto', JSON.stringify(id1));
        const prueba1 = {
            id: id1,
            codigo: 'PR-' + usuario['id'],
            pedido: 0,
            user: usuario,
            fecha_presupuesto: output
        };
        var prodPrePed;
        for (let m = 0; m < productosFinal.length; m++) {
            if (apoyosFinal[m] == undefined) {
                prodPrePed = {
                    productosDormitorio: productosFinal[m],
                    presupuestoPedido: prueba1,
                    dimensionesProductoTipo: dimensionesFinal[m]
                };
            } else {
                prodPrePed = {
                    productosDormitorio: productosFinal[m],
                    presupuestoPedido: prueba1,
                    dimensionesProductoTipo: dimensionesFinal[m],
                    tiposApoyo: apoyosFinal[m]
                };
            }

            prodAca[m] = prodPrePed;
            prodIlu[m] = prodPrePed;
            dimensionEspecialBien[m] = prodPrePed;
            this.productosPresupuestoPedidos = prodPrePed;
            this.subscribeToSaveResponse1(this.productosPresupuestoPedidosService.create(this.productosPresupuestoPedidos));
            if (dimensionesFinal[m]['mensaje'] == 'Medidas Especiales') {
                var acaPedProd = this.acaProdPed.length;
                acaPedProd = this.acaProdPed[acaPedProd - 1];
                dimensionEspecialBien[m]['id'] = acaPedProd['id'] + m + 1;
                const medEsp = {
                    productosPresupuestoPedidos: dimensionEspecialBien[m],
                    ancho: dimensionesFinal[m]['ancho'],
                    fondo: dimensionesFinal[m]['fondo'],
                    alto: dimensionesFinal[m]['alto'],
                    precio: dimensionesFinal[m]['precio']
                };
                this.subscribeToSaveResponse(this.medEspProductoPedidoPresuService.create(medEsp));
            }
            if (iluFinal[m] != undefined && iluFinal[m] != '') {
                var acaPedProd = this.acaProdPed.length;
                acaPedProd = this.acaProdPed[acaPedProd - 1];
                prodIlu[m]['id'] = acaPedProd['id'] + m + 1;
                const iluProd = {
                    iluminacion: iluFinal[m],
                    productosPresupuestoPedidos: prodIlu[m]
                };
                this.subscribeToSaveResponse(this.iluminacionProdPrePedService.create(iluProd));
            }
        }
        let b = 0;
        for (let w = 1; w < numeroAcaProd.length; w++) {
            if (b != 0) {
                b = numeroAcaProd[w];
            }
            for (b; b < nombreAcabado.length; b++) {
                if (b <= numeroAcaProd[w]) {
                    for (let g = 0; g < acabados.length; g++) {
                        if (acabados[g]['nombre'] == nombreAcabado[b]) {
                            var acaPedProd = this.acaProdPed.length;
                            acaPedProd = this.acaProdPed[acaPedProd - 1];
                            prodAca[w - 1]['id'] = acaPedProd['id'] + w;
                            const acabados1 = {
                                acabados: acabados[g],
                                productosPresupuestoPedidos: prodAca[w - 1]
                            };
                            this.subscribeToSaveResponse(this.acabadosProductosPresupuestoPedidoService.create(acabados1));
                        }
                    }
                }
            }
        }
    }

    loadAll() {
        this.productosDormitorioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => this.paginateProductosDormitorios(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.saberPuerta = 0;
        var dimens = [];
        dimens['4 puertas'] = 'margin-left:32%;';
        dimens['5 puertas'] = 'margin-left:30%;';
        dimens['6 puertas'] = 'margin-left:22%;';
        dimens['7 puertas'] = 'margin-left:18%;';
        dimens['8 puertas'] = 'margin-top: 10%;margin-left: 17%;';
        dimens['9 puertas'] = 'margin-top: 10%;margin-left: 14%;';
        dimens['9 puertas IZQUIERDA'] = 'margin-top: 10%;margin-left: 10%;';
        dimens['10 puertas'] = 'margin-top: 13%;margin-left: 8%;';
        dimens['11 puertas IZQUIERDA'] = 'margin-top: 15%;margin-left: 5%;';
        dimens['12 puertas'] = 'margin-top: 15%;';
        dimens['grandes'] = 'margin-left:280px;margin-top:-51px';
        dimens['1 puertas'] = 'margin-left:41%;';
        dimens['2 puertas'] = 'margin-left:40%;';
        dimens['3 puertas'] = 'margin-left:35%;';
        dimens['dimenPuerta1'] = 'margin-left: 85px;margin-top: 320px;z-index: 100000;font-size: 30px;';
        dimens['dimenPuerta2'] = 'margin-left: 220px;margin-top: 300px;z-index: 100000;font-size: 30px;';
        dimens['dimenPuerta3'] = 'margin-left: 360px;margin-top: 280px;z-index: 100000;font-size: 30px;';
        dimens['dimenPuerta4'] = 'margin-left: 500px;margin-top: 260px;z-index: 100000;font-size: 30px;';
        dimens['dimenPuerta5'] = 'margin-left: 650px;margin-top: 240px;z-index: 100000;font-size: 30px;';
        this.dimenArmarios = dimens;
    }

    public carcarCascosInterioresPuertas(id) {
        var ancho = $('#anchosSelect').val();
        var alto = $('#alturaSelect').val();

        this.interioresArmarioNuevosService.findBus(450, 123).subscribe(data => {
            alert(data.body[0].precio);
        });
        this.cascoService.findBus(ancho, alto).subscribe(data => {
            $('#calculadoraCarrito #productoCalculadora1 #datos1').append('<p style="width:100%">Ancho: ' + ancho + '<p/>');
            $('#calculadoraCarrito #productoCalculadora1 #datos1').append('<p style="width:100%">Altura: ' + alto + '<p/>');
            $('#calculadoraCarrito #productoCalculadora1 #datos1').append('<p style="width:100%">Fondo: 600<p/>');
            $('#calculadoraCarrito #productoCalculadora1 #datos1').append(
                '<p style="width:100%">Casco: <span id="acabadoCasco"></span><span style="float:right">+ ' +
                    data.body[0].precio +
                    '€</span><p/>'
            );
        });
        var mai = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z'
        ];
        this.arrayLetras = mai;
        var texto = $('#textoMensajeArmario' + id).text();
        this.textoArmario = texto;
        var puertas = 0;
        puertas = parseFloat(texto.split(' ')[0]);
        var huecos = 0;
        huecos = parseFloat(texto.split(' ')[3]);
        if (!isNaN(huecos)) {
            var perfecto = puertas / huecos;
            var dimens = this.dimenArmarios;
            var grandes = dimens['grandes'];
            var array = [];
            var arrayPuertas = [];
            for (let j = 0; j < huecos; j++) {
                array[j] = j;
            }
            for (let k = 0; k < puertas; k++) {
                arrayPuertas[k] = k + 1;
            }
            this.arraySaberPuertas = arrayPuertas;
            this.arraySaberHuecos = array;
            if (perfecto == huecos) {
                for (let i = 0; i < huecos; i++) {
                    var dimensiones = dimens[puertas + ' puertas'];
                    this.numeroDeHuecos = huecos;
                    if (i == 0) {
                        $('#imagenesArmario1').append('<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>');
                        $('#imagenesArmario').append(
                            '<img id="casco' +
                                i +
                                '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                        );
                        $('#imagenesArmario').append(
                            '<img id="trasera' +
                                i +
                                '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                        );
                    } else {
                        $('#imagenesArmario').append(
                            '<img id="casco' +
                                i +
                                '" style="position:absolute;width: 350px;height: 650px;z-index:' +
                                (100 - (i + 1)) +
                                ';' +
                                grandes +
                                '" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                        );
                        $('#imagenesArmario').append(
                            '<img id="trasera' +
                                i +
                                '" style="position:absolute;width: 350px;height: 650px;z-index:' +
                                (100 - (i + 1)) +
                                ';' +
                                grandes +
                                '" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                        );
                    }
                }
                var html = $('#imagenesArmario1').html();
                $('#imagenesArmario2').css({ 'margin-top': '600px' });
                $('#imagenesArmario2').append(html);
                for (let i = 0; i < huecos; i++) {
                    var dimensiones = dimens[puertas + ' puertas'];
                    this.numeroDeHuecos = huecos;
                    if (i == 0) {
                        $('#imagenesArmario').append(
                            '<p id="textoLetraHueco' +
                                i +
                                '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                mai[i] +
                                '</p>'
                        );
                    } else {
                        $('#imagenesArmario').append(
                            '<p id="textoLetraHueco' +
                                i +
                                '" style="position:absolute;z-index:10000;margin-left: 460px;font-size: 50px;margin-top: 240px;">' +
                                mai[i] +
                                '</p>'
                        );
                    }
                }
                $('#acabadosTodo').removeAttr('class');
                this.acaProdService.findAca(42).subscribe(data => {
                    this.todos = data.body[0]['acabados'];
                    this.acabadosTrasera = data.body[0]['acabados'];
                });
                this.acaProdService.findAca(122).subscribe(data => {
                    this.acabadosInteriores = data.body[0]['acabados'];
                });
            }
        } else {
            if (texto == '1 PUERTA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 1) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        } else {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 460px;font-size: 50px;margin-top: 240px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }
            if (texto == '2 PUERTAS') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 1; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 2) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                            );
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '3 PUERTAS IZQUIERDA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 1; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 3) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '3 PUERTAS DERECHA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 1; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 3) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '4 PUERTAS ASIMETRICAS') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 1; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 4) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 424px;margin-top: -78px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 424px;margin-top: -78px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 590px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '5 PUERTAS CENTRAL') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 2; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 5) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 424px;margin-top: -78px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 424px;margin-top: -78px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 590px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '5 PUERTAS IZQUIERDA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 2; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 5) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 590px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '6 PUERTAS ASIMETRICAS') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 2; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 6) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 704px;margin-top: -130px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 704px;margin-top: -130px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 875px;margin-top: 190px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '7 PUERTAS IZQUIERDA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 3; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 7) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 935px;margin-top: 170px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '7 PUERTAS DERECHA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 3; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 7) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 281px;margin-top: -52px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 281px;margin-top: -52px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 562px;margin-top: -103px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 562px;margin-top: -103px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 772px;margin-top: -142px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 772px;margin-top: -142px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 450px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 730px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 950px;margin-top: 170px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '8 PUERTAS ASIMETRICAS') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 3; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 8) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }

                            if (i == 4) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 985px;margin-top: -182px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 985px;margin-top: -182px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 930px;margin-top: 170px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 4) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1150px;margin-top: 140px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '9 PUERTAS CENTRAL') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 4; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 9) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 492px;margin-top: -92px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 492px;margin-top: -92px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 281px;margin-top: -52px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 281px;margin-top: -52px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 703px;margin-top: -131px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 703px;margin-top: -131px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 4) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 985px;margin-top: -183px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 985px;margin-top: -183px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                        }
                    }
                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 450px;margin-top: 235px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 865px;margin-top: 180px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 4) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1140px;margin-top: 140px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '9 PUERTAS IZQUIERDA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 3; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 9) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas IZQUIERDA'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 4) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 935px;margin-top: 170px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 4) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1210px;margin-top: 150px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '10 PUERTAS ASIMETRICAS') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 4; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 10) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 4) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }

                            if (i == 5) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:95;margin-left: 1266px;margin-top: -233px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:95;margin-left: 1266px;margin-top: -233px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 930px;margin-top: 170px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 4) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1220px;margin-top: 140px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 5) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1430px;margin-top: 120px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '12 PUERTAS ASIMETRICAS') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 5; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 12) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 4) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 5) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:95;margin-left: 1337px;margin-top: -246px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:95;margin-left: 1337px;margin-top: -246px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }

                            if (i == 6) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:94;margin-left: 1545px;margin-top: -286px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:94;margin-left: 1545px;margin-top: -286px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 930px;margin-top: 170px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 4) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1220px;margin-top: 140px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 5) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1510px;margin-top: 100px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 6) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1700px;margin-top: 60px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }

            if (texto == '11 PUERTAS IZQUIERDA') {
                var dimens = this.dimenArmarios;
                var grandes = dimens['grandes'];
                var array = [];
                var arrayPuertas = [];
                for (let j = 0; j < puertas - 5; j++) {
                    array[j] = j;
                }
                for (let k = 0; k < puertas; k++) {
                    arrayPuertas[k] = k + 1;
                }
                this.arraySaberPuertas = arrayPuertas;
                this.arraySaberHuecos = array;
                if (puertas == 11) {
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas IZQUIERDA'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario1').append(
                                '<p style="width:100%;margin-top:7%;' + dimensiones + '" id="imagenesArmario"></p>'
                            );
                            $('#imagenesArmario').append(
                                '<img id="casco' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_blanco.png">'
                            );
                            $('#imagenesArmario').append(
                                '<img id="trasera' +
                                    i +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_blanco.png">'
                            );
                        } else {
                            if (i == 1) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:99;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 2) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:98;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 3) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:97;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 4) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:96;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                            if (i == 5) {
                                $('#imagenesArmario').append(
                                    '<img id="casco' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:95;margin-left: 1338px;margin-top: -246px;" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_blanco.png">'
                                );
                                $('#imagenesArmario').append(
                                    '<img id="trasera' +
                                        i +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:95;margin-left: 1338px;margin-top: -246px;" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_blanco.png">'
                                );
                            }
                        }
                    }

                    var html = $('#imagenesArmario1').html();
                    $('#imagenesArmario2').css({ 'margin-top': '600px' });
                    $('#imagenesArmario2').append(html);
                    for (let i = 0; i < puertas; i++) {
                        var dimensiones = dimens[puertas + ' puertas'];
                        this.numeroDeHuecos = puertas;
                        if (i == 0) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 170px;margin-top: 260px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 1) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 370px;margin-top: 250px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 2) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 650px;margin-top: 220px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 3) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 935px;margin-top: 170px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 4) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1210px;margin-top: 150px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                        if (i == 5) {
                            $('#imagenesArmario').append(
                                '<p id="textoLetraHueco' +
                                    i +
                                    '" style="position:absolute;z-index:10000;margin-left: 1510px;margin-top: 100px;font-size: 50px;">' +
                                    mai[i] +
                                    '</p>'
                            );
                        }
                    }
                    $('#acabadosTodo').removeAttr('class');
                    this.acaProdService.findAca(42).subscribe(data => {
                        this.todos = data.body[0]['acabados'];
                        this.acabadosTrasera = data.body[0]['acabados'];
                    });
                    this.acaProdService.findAca(122).subscribe(data => {
                        this.acabadosInteriores = data.body[0]['acabados'];
                    });
                }
            }
        }
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    public cambiarAcabadoCasco(nombre) {
        var hueco = this.numeroDeHuecos;
        var acabados = this.acabados;
        $('#inputAcabadoCasco').empty();
        for (let w = 0; w < acabados.length; w++) {
            if (acabados[w]['nombre'] == nombre) {
                $('#inputAcabadoCasco').val(acabados[w].nombre);
                $('#datos1 #acabadoCasco').text(acabados[w].nombre);
                $('#inputAcabadoCasco').append(
                    '<img width="100%" height="100%" src="data:image/gif;base64,' +
                        acabados[w]['imagenFondo'] +
                        '" style="max-width:100%;max-height:100%">'
                );
            }
        }
        for (let i = 0; i < hueco; i++) {
            var casco = $('#imagenesArmario1 #casco' + i).attr('src');
            var parte1Casco = casco.split('_')[0];
            var parte2Casco = casco.split('_')[1];
            var enteroCasco = parte1Casco + '_' + parte2Casco + '_' + nombre.toLowerCase() + '.png';
            $('#imagenesArmario1 #casco' + i).attr('src', enteroCasco);
            $('#imagenesArmario2 #casco' + i).attr('src', enteroCasco);
        }
        var interior = $('#inputAcabadoInterior').val();
        var trasera = $('#inputAcabadoTrasera').val();
        if (interior != '' && trasera != '') {
            $('#interioresDiv').removeAttr('class');
            this.productosDormitorioService.categoria(24).subscribe(data => {
                this.productosDormitorioModal = data.body;
            });
            this.productosDormitorioService.categoria(10).subscribe(data => {
                this.puertasModal = data.body;
            });
        }
    }

    public cogerIDHueco(id) {
        this.huecoPinta = id;
    }

    public pintarInteriores(nombre) {
        var texto = this.textoArmario;
        var puertas = 0;
        var dimens = this.dimenArmarios;
        puertas = parseFloat(texto.split(' ')[0]);
        var dimensiones = dimens[puertas + ' puertas'];
        var interior = $('#inputAcabadoInterior').val();
        var interior1 = interior.toString();
        var hueco = this.huecoPinta;
        $('#interiorDentroArmario' + hueco).remove();
        $('#inputInterior' + (hueco - 1)).empty();
        $('#inputInterior' + (hueco - 1)).val('interior ' + nombre);
        $('#inputInterior' + (hueco - 1)).append('interior ' + nombre);
        var grandes = dimens['grandes'];
        if (texto == '1 PUERTA') {
            for (let i = 1; i <= 2; i++) {
                if (hueco == 1) {
                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                        '<img id="interiorDentroArmario' +
                            hueco +
                            '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/3. INTERIORES/' +
                            nombre +
                            '/peque_interior_' +
                            nombre +
                            '_' +
                            interior1.toLowerCase() +
                            '_optimized.png">'
                    );
                    $('#textoLetraHueco' + (hueco - 1)).remove();
                } else {
                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                        '<img id="interiorDentroArmario' +
                            hueco +
                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;' +
                            grandes +
                            '" src="../../../content/images/ar/peque/3. INTERIORES/' +
                            nombre +
                            '/peque_interior_' +
                            nombre +
                            '_' +
                            interior1.toLowerCase() +
                            '_optimized.png">'
                    );
                    $('#textoLetraHueco' + (hueco - 1)).remove();
                }
            }
        } else {
            if (texto == '3 PUERTAS IZQUIERDA') {
                for (let i = 1; i <= 2; i++) {
                    if (hueco == 1) {
                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                            '<img id="interiorDentroArmario' +
                                hueco +
                                '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                nombre +
                                '/peque_interior_' +
                                nombre +
                                '_' +
                                interior1.toLowerCase() +
                                '_optimized.png">'
                        );
                        $('#textoLetraHueco' + (hueco - 1)).remove();
                    } else {
                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                            '<img id="interiorDentroArmario' +
                                hueco +
                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                nombre +
                                '/grande_interior_' +
                                nombre +
                                '_' +
                                interior1.toLowerCase() +
                                '_optimized.png">'
                        );
                        $('#textoLetraHueco' + (hueco - 1)).remove();
                    }
                }
            } else {
                if (texto == '3 PUERTAS DERECHA') {
                    for (let i = 1; i <= 2; i++) {
                        if (hueco == 1) {
                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                '<img id="interiorDentroArmario' +
                                    hueco +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                    nombre +
                                    '/grande_interior_' +
                                    nombre +
                                    '_' +
                                    interior1.toLowerCase() +
                                    '_optimized.png">'
                            );
                            $('#textoLetraHueco' + (hueco - 1)).remove();
                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                '<img id="interiorDentroArmario' +
                                    hueco +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    nombre +
                                    '/peque_interior_' +
                                    nombre +
                                    '_' +
                                    interior1.toLowerCase() +
                                    '_optimized.png">'
                            );
                            $('#textoLetraHueco' + (hueco - 1)).remove();
                        } else {
                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                '<img id="interiorDentroArmario' +
                                    hueco +
                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                    nombre +
                                    '/peque_interior_' +
                                    nombre +
                                    '_' +
                                    interior1.toLowerCase() +
                                    '_optimized.png">'
                            );
                            $('#textoLetraHueco' + (hueco - 1)).remove();
                        }
                    }
                } else {
                    if (texto == '4 PUERTAS ASIMETRICAS') {
                        for (let i = 1; i <= 2; i++) {
                            if (hueco == 1) {
                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                    '<img id="interiorDentroArmario' +
                                        hueco +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                        nombre +
                                        '/peque_interior_' +
                                        nombre +
                                        '_' +
                                        interior1.toLowerCase() +
                                        '_optimized.png">'
                                );
                                $('#textoLetraHueco' + (hueco - 1)).remove();
                            }
                            if (hueco == 2) {
                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                    '<img id="interiorDentroArmario' +
                                        hueco +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                        nombre +
                                        '/grande_interior_' +
                                        nombre +
                                        '_' +
                                        interior1.toLowerCase() +
                                        '_optimized.png">'
                                );
                                $('#textoLetraHueco' + (hueco - 1)).remove();
                            }
                            if (hueco == 3) {
                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                    '<img id="interiorDentroArmario' +
                                        hueco +
                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:424px;margin-top:-78px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                        nombre +
                                        '/peque_interior_' +
                                        nombre +
                                        '_' +
                                        interior1.toLowerCase() +
                                        '_optimized.png">'
                                );
                                $('#textoLetraHueco' + (hueco - 1)).remove();
                            }
                        }
                    } else {
                        if (texto == '5 PUERTAS CENTRAL') {
                            for (let i = 1; i <= 2; i++) {
                                if (hueco == 1) {
                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                        '<img id="interiorDentroArmario' +
                                            hueco +
                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                            nombre +
                                            '/grande_interior_' +
                                            nombre +
                                            '_' +
                                            interior1.toLowerCase() +
                                            '_optimized.png">'
                                    );
                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                }
                                if (hueco == 2) {
                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                        '<img id="interiorDentroArmario' +
                                            hueco +
                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                            nombre +
                                            '/peque_interior_' +
                                            nombre +
                                            '_' +
                                            interior1.toLowerCase() +
                                            '_optimized.png">'
                                    );
                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                }
                                if (hueco == 3) {
                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                        '<img id="interiorDentroArmario' +
                                            hueco +
                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:424px;margin-top:-78px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                            nombre +
                                            '/grande_interior_' +
                                            nombre +
                                            '_' +
                                            interior1.toLowerCase() +
                                            '_optimized.png">'
                                    );
                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                }
                            }
                        } else {
                            if (texto == '5 PUERTAS IZQUIERDA') {
                                for (let i = 1; i <= 2; i++) {
                                    if (hueco == 1) {
                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                            '<img id="interiorDentroArmario' +
                                                hueco +
                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                nombre +
                                                '/peque_interior_' +
                                                nombre +
                                                '_' +
                                                interior1.toLowerCase() +
                                                '_optimized.png">'
                                        );
                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                    }
                                    if (hueco == 2) {
                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                            '<img id="interiorDentroArmario' +
                                                hueco +
                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                nombre +
                                                '/grande_interior_' +
                                                nombre +
                                                '_' +
                                                interior1.toLowerCase() +
                                                '_optimized.png">'
                                        );
                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                    }
                                    if (hueco == 3) {
                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                            '<img id="interiorDentroArmario' +
                                                hueco +
                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                nombre +
                                                '/grande_interior_' +
                                                nombre +
                                                '_' +
                                                interior1.toLowerCase() +
                                                '_optimized.png">'
                                        );
                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                    }
                                }
                            } else {
                                if (texto == '6 PUERTAS ASIMETRICAS') {
                                    for (let i = 1; i <= 2; i++) {
                                        if (hueco == 1) {
                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                '<img id="interiorDentroArmario' +
                                                    hueco +
                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombre +
                                                    '/peque_interior_' +
                                                    nombre +
                                                    '_' +
                                                    interior1.toLowerCase() +
                                                    '_optimized.png">'
                                            );
                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                        }
                                        if (hueco == 2) {
                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                '<img id="interiorDentroArmario' +
                                                    hueco +
                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombre +
                                                    '/grande_interior_' +
                                                    nombre +
                                                    '_' +
                                                    interior1.toLowerCase() +
                                                    '_optimized.png">'
                                            );
                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                        }
                                        if (hueco == 3) {
                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                '<img id="interiorDentroArmario' +
                                                    hueco +
                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombre +
                                                    '/grande_interior_' +
                                                    nombre +
                                                    '_' +
                                                    interior1.toLowerCase() +
                                                    '_optimized.png">'
                                            );
                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                        }
                                        if (hueco == 4) {
                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                '<img id="interiorDentroArmario' +
                                                    hueco +
                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 704px;margin-top: -130px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombre +
                                                    '/peque_interior_' +
                                                    nombre +
                                                    '_' +
                                                    interior1.toLowerCase() +
                                                    '_optimized.png">'
                                            );
                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                        }
                                    }
                                } else {
                                    if (texto == '7 PUERTAS IZQUIERDA') {
                                        for (let i = 1; i <= 2; i++) {
                                            if (hueco == 1) {
                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                    '<img id="interiorDentroArmario' +
                                                        hueco +
                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                        nombre +
                                                        '/peque_interior_' +
                                                        nombre +
                                                        '_' +
                                                        interior1.toLowerCase() +
                                                        '_optimized.png">'
                                                );
                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                            }
                                            if (hueco == 2) {
                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                    '<img id="interiorDentroArmario' +
                                                        hueco +
                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                        nombre +
                                                        '/grande_interior_' +
                                                        nombre +
                                                        '_' +
                                                        interior1.toLowerCase() +
                                                        '_optimized.png">'
                                                );
                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                            }
                                            if (hueco == 3) {
                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                    '<img id="interiorDentroArmario' +
                                                        hueco +
                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                        nombre +
                                                        '/grande_interior_' +
                                                        nombre +
                                                        '_' +
                                                        interior1.toLowerCase() +
                                                        '_optimized.png">'
                                                );
                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                            }
                                            if (hueco == 4) {
                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                    '<img id="interiorDentroArmario' +
                                                        hueco +
                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 776px;margin-top: -145px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                        nombre +
                                                        '/grande_interior_' +
                                                        nombre +
                                                        '_' +
                                                        interior1.toLowerCase() +
                                                        '_optimized.png">'
                                                );
                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                            }
                                        }
                                    } else {
                                        if (texto == '7 PUERTAS DERECHA') {
                                            for (let i = 1; i <= 2; i++) {
                                                if (hueco == 4) {
                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                        '<img id="interiorDentroArmario' +
                                                            hueco +
                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 772px;margin-top: -142px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                            nombre +
                                                            '/peque_interior_' +
                                                            nombre +
                                                            '_' +
                                                            interior1.toLowerCase() +
                                                            '_optimized.png">'
                                                    );
                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                }
                                                if (hueco == 2) {
                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                        '<img id="interiorDentroArmario' +
                                                            hueco +
                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:281px;margin-top:-52px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                            nombre +
                                                            '/grande_interior_' +
                                                            nombre +
                                                            '_' +
                                                            interior1.toLowerCase() +
                                                            '_optimized.png">'
                                                    );
                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                }
                                                if (hueco == 3) {
                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                        '<img id="interiorDentroArmario' +
                                                            hueco +
                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:562px;margin-top:-103px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                            nombre +
                                                            '/grande_interior_' +
                                                            nombre +
                                                            '_' +
                                                            interior1.toLowerCase() +
                                                            '_optimized.png">'
                                                    );
                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                }
                                                if (hueco == 1) {
                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                        '<img id="interiorDentroArmario' +
                                                            hueco +
                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                            nombre +
                                                            '/grande_interior_' +
                                                            nombre +
                                                            '_' +
                                                            interior1.toLowerCase() +
                                                            '_optimized.png">'
                                                    );
                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                }
                                            }
                                        } else {
                                            if (texto == '8 PUERTAS ASIMETRICAS') {
                                                for (let i = 1; i <= 2; i++) {
                                                    if (hueco == 1) {
                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                            '<img id="interiorDentroArmario' +
                                                                hueco +
                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                nombre +
                                                                '/peque_interior_' +
                                                                nombre +
                                                                '_' +
                                                                interior1.toLowerCase() +
                                                                '_optimized.png">'
                                                        );
                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                    }
                                                    if (hueco == 2) {
                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                            '<img id="interiorDentroArmario' +
                                                                hueco +
                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                nombre +
                                                                '/grande_interior_' +
                                                                nombre +
                                                                '_' +
                                                                interior1.toLowerCase() +
                                                                '_optimized.png">'
                                                        );
                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                    }
                                                    if (hueco == 3) {
                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                            '<img id="interiorDentroArmario' +
                                                                hueco +
                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                nombre +
                                                                '/grande_interior_' +
                                                                nombre +
                                                                '_' +
                                                                interior1.toLowerCase() +
                                                                '_optimized.png">'
                                                        );
                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                    }
                                                    if (hueco == 4) {
                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                            '<img id="interiorDentroArmario' +
                                                                hueco +
                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:775px;margin-top:-142px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                nombre +
                                                                '/grande_interior_' +
                                                                nombre +
                                                                '_' +
                                                                interior1.toLowerCase() +
                                                                '_optimized.png">'
                                                        );
                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                    }
                                                    if (hueco == 5) {
                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                            '<img id="interiorDentroArmario' +
                                                                hueco +
                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 985px;margin-top: -182px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                nombre +
                                                                '/peque_interior_' +
                                                                nombre +
                                                                '_' +
                                                                interior1.toLowerCase() +
                                                                '_optimized.png">'
                                                        );
                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                    }
                                                }
                                            } else {
                                                if (texto == '9 PUERTAS CENTRAL') {
                                                    for (let i = 1; i <= 2; i++) {
                                                        if (hueco == 3) {
                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                '<img id="interiorDentroArmario' +
                                                                    hueco +
                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:492px;margin-top:-92px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                    nombre +
                                                                    '/peque_interior_' +
                                                                    nombre +
                                                                    '_' +
                                                                    interior1.toLowerCase() +
                                                                    '_optimized.png">'
                                                            );
                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                        }
                                                        if (hueco == 1) {
                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                '<img id="interiorDentroArmario' +
                                                                    hueco +
                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                    nombre +
                                                                    '/grande_interior_' +
                                                                    nombre +
                                                                    '_' +
                                                                    interior1.toLowerCase() +
                                                                    '_optimized.png">'
                                                            );
                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                        }
                                                        if (hueco == 2) {
                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                '<img id="interiorDentroArmario' +
                                                                    hueco +
                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:281px;margin-top:-52px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                    nombre +
                                                                    '/grande_interior_' +
                                                                    nombre +
                                                                    '_' +
                                                                    interior1.toLowerCase() +
                                                                    '_optimized.png">'
                                                            );
                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                        }
                                                        if (hueco == 4) {
                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                '<img id="interiorDentroArmario' +
                                                                    hueco +
                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:703px;margin-top:-131px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                    nombre +
                                                                    '/grande_interior_' +
                                                                    nombre +
                                                                    '_' +
                                                                    interior1.toLowerCase() +
                                                                    '_optimized.png">'
                                                            );
                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                        }
                                                        if (hueco == 5) {
                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                '<img id="interiorDentroArmario' +
                                                                    hueco +
                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 985px;margin-top: -183px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                    nombre +
                                                                    '/grande_interior_' +
                                                                    nombre +
                                                                    '_' +
                                                                    interior1.toLowerCase() +
                                                                    '_optimized.png">'
                                                            );
                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                        }
                                                    }
                                                } else {
                                                    if (texto == '9 PUERTAS IZQUIERDA') {
                                                        for (let i = 1; i <= 2; i++) {
                                                            if (hueco == 1) {
                                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                    '<img id="interiorDentroArmario' +
                                                                        hueco +
                                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                        nombre +
                                                                        '/peque_interior_' +
                                                                        nombre +
                                                                        '_' +
                                                                        interior1.toLowerCase() +
                                                                        '_optimized.png">'
                                                                );
                                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                                            }
                                                            if (hueco == 2) {
                                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                    '<img id="interiorDentroArmario' +
                                                                        hueco +
                                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                        nombre +
                                                                        '/grande_interior_' +
                                                                        nombre +
                                                                        '_' +
                                                                        interior1.toLowerCase() +
                                                                        '_optimized.png">'
                                                                );
                                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                                            }
                                                            if (hueco == 3) {
                                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                    '<img id="interiorDentroArmario' +
                                                                        hueco +
                                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                        nombre +
                                                                        '/grande_interior_' +
                                                                        nombre +
                                                                        '_' +
                                                                        interior1.toLowerCase() +
                                                                        '_optimized.png">'
                                                                );
                                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                                            }
                                                            if (hueco == 4) {
                                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                    '<img id="interiorDentroArmario' +
                                                                        hueco +
                                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:776px;margin-top:-142px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                        nombre +
                                                                        '/grande_interior_' +
                                                                        nombre +
                                                                        '_' +
                                                                        interior1.toLowerCase() +
                                                                        '_optimized.png">'
                                                                );
                                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                                            }
                                                            if (hueco == 5) {
                                                                $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                    '<img id="interiorDentroArmario' +
                                                                        hueco +
                                                                        '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                        nombre +
                                                                        '/grande_interior_' +
                                                                        nombre +
                                                                        '_' +
                                                                        interior1.toLowerCase() +
                                                                        '_optimized.png">'
                                                                );
                                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                $('#textoLetraHueco' + (hueco - 1)).remove();
                                                            }
                                                        }
                                                    } else {
                                                        if (texto == '10 PUERTAS ASIMETRICAS') {
                                                            for (let i = 1; i <= 2; i++) {
                                                                if (hueco == 1) {
                                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                        '<img id="interiorDentroArmario' +
                                                                            hueco +
                                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                            nombre +
                                                                            '/peque_interior_' +
                                                                            nombre +
                                                                            '_' +
                                                                            interior1.toLowerCase() +
                                                                            '_optimized.png">'
                                                                    );
                                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                }
                                                                if (hueco == 2) {
                                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                        '<img id="interiorDentroArmario' +
                                                                            hueco +
                                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                            nombre +
                                                                            '/grande_interior_' +
                                                                            nombre +
                                                                            '_' +
                                                                            interior1.toLowerCase() +
                                                                            '_optimized.png">'
                                                                    );
                                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                }
                                                                if (hueco == 3) {
                                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                        '<img id="interiorDentroArmario' +
                                                                            hueco +
                                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                            nombre +
                                                                            '/grande_interior_' +
                                                                            nombre +
                                                                            '_' +
                                                                            interior1.toLowerCase() +
                                                                            '_optimized.png">'
                                                                    );
                                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                }
                                                                if (hueco == 4) {
                                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                        '<img id="interiorDentroArmario' +
                                                                            hueco +
                                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:775px;margin-top:-142px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                            nombre +
                                                                            '/grande_interior_' +
                                                                            nombre +
                                                                            '_' +
                                                                            interior1.toLowerCase() +
                                                                            '_optimized.png">'
                                                                    );
                                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                }
                                                                if (hueco == 5) {
                                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                        '<img id="interiorDentroArmario' +
                                                                            hueco +
                                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:1056px;margin-top:-194px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                            nombre +
                                                                            '/grande_interior_' +
                                                                            nombre +
                                                                            '_' +
                                                                            interior1.toLowerCase() +
                                                                            '_optimized.png">'
                                                                    );
                                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                }
                                                                if (hueco == 6) {
                                                                    $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                        '<img id="interiorDentroArmario' +
                                                                            hueco +
                                                                            '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 1266px;margin-top: -233px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                            nombre +
                                                                            '/peque_interior_' +
                                                                            nombre +
                                                                            '_' +
                                                                            interior1.toLowerCase() +
                                                                            '_optimized.png">'
                                                                    );
                                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                    $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                }
                                                            }
                                                        } else {
                                                            if (texto == '11 PUERTAS IZQUIERDA') {
                                                                for (let i = 1; i <= 2; i++) {
                                                                    if (hueco == 1) {
                                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                            '<img id="interiorDentroArmario' +
                                                                                hueco +
                                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                                nombre +
                                                                                '/peque_interior_' +
                                                                                nombre +
                                                                                '_' +
                                                                                interior1.toLowerCase() +
                                                                                '_optimized.png">'
                                                                        );
                                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                    }
                                                                    if (hueco == 2) {
                                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                            '<img id="interiorDentroArmario' +
                                                                                hueco +
                                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                nombre +
                                                                                '/grande_interior_' +
                                                                                nombre +
                                                                                '_' +
                                                                                interior1.toLowerCase() +
                                                                                '_optimized.png">'
                                                                        );
                                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                    }
                                                                    if (hueco == 3) {
                                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                            '<img id="interiorDentroArmario' +
                                                                                hueco +
                                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                nombre +
                                                                                '/grande_interior_' +
                                                                                nombre +
                                                                                '_' +
                                                                                interior1.toLowerCase() +
                                                                                '_optimized.png">'
                                                                        );
                                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                    }
                                                                    if (hueco == 4) {
                                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                            '<img id="interiorDentroArmario' +
                                                                                hueco +
                                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:775px;margin-top:-142px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                nombre +
                                                                                '/grande_interior_' +
                                                                                nombre +
                                                                                '_' +
                                                                                interior1.toLowerCase() +
                                                                                '_optimized.png">'
                                                                        );
                                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                    }
                                                                    if (hueco == 5) {
                                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                            '<img id="interiorDentroArmario' +
                                                                                hueco +
                                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:1057px;margin-top:-194px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                nombre +
                                                                                '/grande_interior_' +
                                                                                nombre +
                                                                                '_' +
                                                                                interior1.toLowerCase() +
                                                                                '_optimized.png">'
                                                                        );
                                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                    }
                                                                    if (hueco == 6) {
                                                                        $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                            '<img id="interiorDentroArmario' +
                                                                                hueco +
                                                                                '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:1338px;margin-top:-246px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                nombre +
                                                                                '/grande_interior_' +
                                                                                nombre +
                                                                                '_' +
                                                                                interior1.toLowerCase() +
                                                                                '_optimized.png">'
                                                                        );
                                                                        $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                    }
                                                                }
                                                            } else {
                                                                if (texto == '12 PUERTAS ASIMETRICAS') {
                                                                    for (let i = 1; i <= 2; i++) {
                                                                        if (hueco == 1) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/peque_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                        if (hueco == 2) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:212px;margin-top:-39px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/grande_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                        if (hueco == 3) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:494px;margin-top:-91px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/grande_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                        if (hueco == 4) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:775px;margin-top:-142px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/grande_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                        if (hueco == 5) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:1056px;margin-top:-194px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/grande_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                        if (hueco == 6) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left:1337px;margin-top:-246px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/grande_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                        if (hueco == 7) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;margin-left: 1545px;margin-top: -286px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/peque_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                    }
                                                                } else {
                                                                    for (let i = 1; i <= 2; i++) {
                                                                        if (hueco == 1) {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/grande_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        } else {
                                                                            $('#imagenesArmario' + i + ' #imagenesArmario').append(
                                                                                '<img id="interiorDentroArmario' +
                                                                                    hueco +
                                                                                    '" style="position:absolute;width: 350px;height: 650px;z-index:100;' +
                                                                                    grandes +
                                                                                    '" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                                                    nombre +
                                                                                    '/grande_interior_' +
                                                                                    nombre +
                                                                                    '_' +
                                                                                    interior1.toLowerCase() +
                                                                                    '_optimized.png">'
                                                                            );
                                                                            $('#textoLetraHueco' + (hueco - 1)).remove();
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public cambiarAcabadoInterior(nombre) {
        var hueco = this.numeroDeHuecos;
        var acabados = this.acabados;
        var dimens = this.dimenArmarios;
        var grandes = dimens['grandes'];
        $('#inputAcabadoInterior').empty();
        for (let w = 0; w < acabados.length; w++) {
            if (acabados[w]['nombre'] == nombre) {
                $('#inputAcabadoInterior').val(acabados[w].nombre);
                $('#inputAcabadoInterior').append(
                    '<img width="100%" height="100%" src="data:image/gif;base64,' +
                        acabados[w]['imagenFondo'] +
                        '" style="max-width:100%;max-height:100%">'
                );
                for (let j = 1; j <= 12; j++) {
                    var src = $('#interiorDentroArmario' + j).attr('src');
                    if (src != '' && src != null && src != undefined) {
                        var parte1 = src.split('_')[0];
                        var parte2 = src.split('_')[1];
                        var parte3 = src.split('_')[2];
                        var todo = parte1 + '_' + parte2 + '_' + parte3 + '_' + nombre.toLowerCase() + '_optimized.png';
                        $('#imagenesArmario1 #interiorDentroArmario' + j).attr('src', todo);
                        $('#imagenesArmario2 #interiorDentroArmario' + j).attr('src', todo);
                    }
                }
            }
        }
        var casco = $('#inputAcabadoCasco').val();
        var trasera = $('#inputAcabadoTrasera').val();
        if (casco != '' && trasera != '') {
            $('#interioresDiv').removeAttr('class');
            this.productosDormitorioService.categoria(24).subscribe(data => {
                this.productosDormitorioModal = data.body;
            });
            this.productosDormitorioService.categoria(10).subscribe(data => {
                this.puertasModal = data.body;
            });
            if (this.saberPuerta != 1) {
                var texto = this.textoArmario;
                var puertas = 0;
                puertas = parseFloat(texto.split(' ')[0]);
                var huecos = 0;
                huecos = parseFloat(texto.split(' ')[3]);
                if (!isNaN(huecos)) {
                    var cuenta = puertas / huecos;
                    if (cuenta % 1 == 0) {
                        for (let i = 1; i <= huecos; i++) {
                            if (i == 1) {
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                );
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                );
                            } else {
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;' +
                                        grandes +
                                        '" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                );
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;' +
                                        grandes +
                                        '" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                );
                            }
                        }
                    }
                    for (let i = 1; i <= puertas; i++) {
                        $('#imagenesArmario2 #imagenesArmario').append(
                            '<p id="nombrePuerta' +
                                i +
                                '" style="position:absolute;' +
                                dimens['dimenPuerta' + i] +
                                '"> Puerta ' +
                                i +
                                '</p>'
                        );
                    }
                } else {
                    if (texto == '1 PUERTA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    ';margin-left:150px"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '2 PUERTAS') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '3 PUERTAS IZQUIERDA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:430px;margin-top:280px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '3 PUERTAS DERECHA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:85px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:225px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:365px;margin-top:280px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '4 PUERTAS ASIMETRICAS') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 424px;margin-top: -78px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '5 PUERTAS CENTRAL') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 212px;margin-top: -39px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 424px;margin-top: -78px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 424PX;margin-top: -78px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '5 PUERTAS IZQUIERDA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494PX;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '6 PUERTAS ASIMETRICAS') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494PX;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 704px;margin-top: -130px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 855px;margin-top: 220px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '7 PUERTAS IZQUIERDA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494PX;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 776PX;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 776PX;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 855px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 1000px;margin-top: 200px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '7 PUERTAS DERECHA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -52px;margin-left:281px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -52px;margin-left:281px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 562px;margin-top: -103px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 562px;margin-top: -103px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 772PX;margin-top: -142px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:85px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:230px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:370px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:510px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:640px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 780px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 935px;margin-top: 200px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '8 PUERTAS ASIMETRICAS') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494PX;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 5) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor7" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 985px;margin-top: -182px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 855px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 1000px;margin-top: 200px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta8'] = 'margin-left: 1140px;margin-top: 180px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '9 PUERTAS CENTRAL') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left:492px;margin-top:-92px" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 281px;margin-top: -52px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 281px;margin-top: -52px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 703px;margin-top: -131px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 703px;margin-top: -131px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 5) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor7" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 985px;margin-top: -183px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor8" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 985px;margin-top: -183px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:85px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:230px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:370px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:510px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:650px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 790px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 935px;margin-top: 200px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta8'] = 'margin-left: 1075px;margin-top: 180px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta9'] = 'margin-left: 1205px;margin-top: 160px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '9 PUERTAS IZQUIERDA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left:212px;margin-top:-39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left:212px;margin-top:-39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 5) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor7" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor8" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 855px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 1000px;margin-top: 200px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta8'] = 'margin-left: 1140px;margin-top: 180px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta9'] = 'margin-left: 1270px;margin-top: 160px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '10 PUERTAS ASIMETRICAS') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494PX;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 5) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor7" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor8" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 6) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor9" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1266px;margin-top: -233px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 855px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 1000px;margin-top: 200px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta8'] = 'margin-left: 1140px;margin-top: 180px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta9'] = 'margin-left: 1270px;margin-top: 160px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta10'] = 'margin-left: 1410px;margin-top: 140px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '12 PUERTAS ASIMETRICAS') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-top: -39px;margin-left:212px" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494PX;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 775px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 5) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor7" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor8" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1056px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 6) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor9" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1337px;margin-top: -246px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor10" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1337px;margin-top: -246px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 7) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor11" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1545px;margin-top: -286px;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 855px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 1000px;margin-top: 200px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta8'] = 'margin-left: 1140px;margin-top: 180px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta9'] = 'margin-left: 1270px;margin-top: 160px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta10'] = 'margin-left: 1410px;margin-top: 140px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta11'] = 'margin-left: 1550px;margin-top: 110px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta12'] = 'margin-left: 1690px;margin-top: 80px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }

                    if (texto == '11 PUERTAS IZQUIERDA') {
                        var cuenta = puertas;
                        if (cuenta % 1 == 0) {
                            for (let i = 1; i <= puertas; i++) {
                                if (i == 1) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor0" style="position:absolute;width: 350px;height: 650px;z-index:101;" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_blanco_optimized.png">'
                                    );
                                }
                                if (i == 2) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor1" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left:212px;margin-top:-39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor2" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left:212px;margin-top:-39px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 3) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor3" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor4" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 494px;margin-top: -91px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 4) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor5" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor6" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 776px;margin-top: -142px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 5) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor7" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor8" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1057px;margin-top: -194px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                                if (i == 6) {
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor9" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1338px;margin-top: -246px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_blanco_optimized.png">'
                                    );
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="puertaColor10" style="position:absolute;width: 350px;height: 650px;z-index:101;margin-left: 1338px;margin-top: -246px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_blanco_optimized.png">'
                                    );
                                }
                            }
                        }
                        for (let i = 1; i <= puertas; i++) {
                            dimens['dimenPuerta1'] = 'margin-left:150px;margin-top:320px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta2'] = 'margin-left:295px;margin-top:300px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta3'] = 'margin-left:435px;margin-top:280px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta4'] = 'margin-left:575px;margin-top:260px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta5'] = 'margin-left:715px;margin-top:240px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta6'] = 'margin-left: 855px;margin-top: 220px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta7'] = 'margin-left: 1000px;margin-top: 200px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta8'] = 'margin-left: 1140px;margin-top: 180px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta9'] = 'margin-left: 1270px;margin-top: 160px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta10'] = 'margin-left: 1410px;margin-top: 140px;z-index:100000;font-size:30px';
                            dimens['dimenPuerta11'] = 'margin-left: 1555px;margin-top: 120px;z-index:100000;font-size:30px';
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<p id="nombrePuerta' +
                                    i +
                                    '" style="position:absolute;' +
                                    dimens['dimenPuerta' + i] +
                                    '"> Puerta ' +
                                    i +
                                    '</p>'
                            );
                        }
                    }
                }
            }
        }
    }

    public puertasArmarioModal(nombre) {
        var id = this.idPuertaInput;
        var puertas = this.arraySaberPuertas.length;
        var alto;
        var ancho;
        ancho = $('#anchosSelect').val();
        alto = $('#alturaSelect').val();
        var cuenta = 0;
        cuenta = ancho / puertas;
        this.puertasPreciosService.findBus(cuenta, alto, 47).subscribe(data => {
            alert(data.body[0].precio);
        });
        $('#inputPuertas' + id).val(nombre);
        if (nombre == 'Puerta Madera') {
            this.acaProdService.findAca(47).subscribe(data => {
                $('#inputs #inputPuertas' + id).attr('data-target', '#modalAcabadosPuertas1');
                this.acabadosPuerta1 = data.body[0]['acabados'];
            });
        } else {
            this.acaProdService.findAca(48).subscribe(data => {
                $('#inputs #inputPuertas' + id).attr('data-target', '#modalAcabadosPuertas2');
                this.acabadosPuerta2 = data.body[0]['acabados'];
            });
        }
    }

    public cambioAcabadoImagenPuertas(nombre) {
        var id = this.idPuertaInput;
        var texto = this.textoArmario;
        var prueba = 0;
        var acabados = this.acabados;
        $('#marco' + id).remove();
        for (let w = 0; w < acabados.length; w++) {
            if (acabados[w]['nombre'] == nombre) {
                $('#inputs #inputPuertas' + id).empty();
                $('#inputs #inputPuertas' + id).val(acabados[w].nombre);
                $('#inputs #inputPuertas' + id).append(
                    '<img width="100%" height="100%" src="data:image/gif;base64,' +
                        acabados[w]['imagenFondo'] +
                        '" style="max-width:100%;max-height:100%">'
                );
            }
        }

        if (nombre != 'Cristal Bronce' && nombre != 'Cristal Transparente') {
            this.saberPuerta = 1;
            if (texto == '3 PUERTAS DERECHA' && id == 2) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '3 PUERTAS IZQUIERDA' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '4 PUERTAS ASIMETRICAS' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '4 PUERTAS ASIMETRICAS' && id == 3) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '5 PUERTAS CENTRAL' && id == 2) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '5 PUERTAS IZQUIERDA' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '5 PUERTAS DERECHA' && id == 4) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '6 PUERTAS ASIMETRICAS' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '6 PUERTAS ASIMETRICAS' && id == 5) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '7 PUERTAS IZQUIERDA' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '7 PUERTAS DERECHA' && id == 6) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '8 PUERTAS ASIMETRICAS' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '8 PUERTAS ASIMETRICAS' && id == 7) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '9 PUERTAS IZQUIERDA' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '9 PUERTAS CENTRAL' && id == 4) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '9 PUERTAS DERECHA' && id == 8) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '10 PUERTAS ASIMETRICAS' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '10 PUERTAS ASIMETRICAS' && id == 9) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '11 PUERTAS IZQUIERDA' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '12 PUERTAS ASIMETRICAS' && id == 0) {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto == '12 PUERTAS ASIMETRICAS' && id == 11) {
                var sr = $('#puertaColor' + id).attr('src');
                var parte1 = '../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera';
                $('#nombrePuerta' + (id + 1)).remove();
                $('#puertaColor' + id).attr('src', parte1 + '_' + nombre.toLowerCase() + '_optimized.png');
                $('#puertaColor' + id).css({ opacity: '1' });
                prueba = 1;
            }
            if (texto != '1 PUERTA') {
                if (prueba == 0) {
                    var src = $('#puertaColor' + id).attr('src');
                    var parte1 = src.split('_')[0];
                    var parte2 = src.split('_')[1];
                    var parte3 = src.split('_')[2];
                    $('#nombrePuerta' + (id + 1)).remove();
                    console.log(parte1);
                    $('#puertaColor' + id).attr('src', parte1 + '_' + parte2 + '_' + parte3 + '_' + nombre.toLowerCase() + '.png');
                }
            } else {
                var src = $('#puertaColor' + id).attr('src');
                var parte1 = src.split('_')[0];
                var parte2 = src.split('_')[1];
                $('#nombrePuerta' + (id + 1)).remove();
                console.log(parte1);
                $('#puertaColor' + id).attr('src', parte1 + '_' + parte2 + '_' + nombre.toLowerCase() + '.png');
            }
        } else {
            this.saberPuerta = 1;
            var tipo = id % 2 ? 'Par' : 'Impar';
            if (texto == '1 PUERTA') {
                if (nombre == 'Cristal Bronce') {
                    if (tipo == 'Par') {
                        src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                        $('#nombrePuerta' + (id + 1)).remove();
                        $('#puertaColor' + id).attr('src', src);
                        var attr = $('#puertaColor' + id).attr('style');
                        $('#puertaColor' + id).css({ opacity: '0.6' });
                        $('#imagenesArmario2 #imagenesArmario').append(
                            '<img id="marco' +
                                id +
                                '" style="' +
                                attr +
                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                        );
                    } else {
                        src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                        $('#nombrePuerta' + (id + 1)).remove();
                        $('#puertaColor' + id).attr('src', src);
                        var attr = $('#puertaColor' + id).attr('style');
                        $('#puertaColor' + id).css({ opacity: '0.6' });
                        $('#imagenesArmario2 #imagenesArmario').append(
                            '<img id="marco' +
                                id +
                                '" style="' +
                                attr +
                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                        );
                    }
                } else {
                    if (tipo == 'Par') {
                        src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                        $('#nombrePuerta' + (id + 1)).remove();
                        $('#puertaColor' + id).attr('src', src);
                        var attr = $('#puertaColor' + id).attr('style');
                        $('#puertaColor' + id).css({ opacity: '0.5' });
                        $('#imagenesArmario2 #imagenesArmario').append(
                            '<img id="marco' +
                                id +
                                '" style="' +
                                attr +
                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                        );
                    } else {
                        src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                        $('#nombrePuerta' + (id + 1)).remove();
                        $('#puertaColor' + id).css({ opacity: '0.5' });
                        var attr = $('#puertaColor' + id).attr('style');
                        $('#puertaColor' + id).attr('src', src);
                        $('#imagenesArmario2 #imagenesArmario').append(
                            '<img id="marco' +
                                id +
                                '" style="' +
                                attr +
                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                        );
                    }
                }
            } else {
                if (texto == '3 PUERTAS IZQUIERDA') {
                    if (nombre == 'Cristal Bronce') {
                        if (id == 0) {
                            src = '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                            $('#nombrePuerta' + (id + 1)).remove();
                            $('#puertaColor' + id).attr('src', src);
                            var attr = $('#puertaColor' + id).attr('style');
                            $('#puertaColor' + id).css({ opacity: '0.6' });
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<img id="marco' +
                                    id +
                                    '" style="' +
                                    attr +
                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                            );
                        }
                        if (id == 1) {
                            src =
                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                            $('#nombrePuerta' + (id + 1)).remove();
                            $('#puertaColor' + id).attr('src', src);
                            var attr = $('#puertaColor' + id).attr('style');
                            $('#puertaColor' + id).css({ opacity: '0.6' });
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<img id="marco' +
                                    id +
                                    '" style="' +
                                    attr +
                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                            );
                        }
                        if (id == 2) {
                            src =
                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                            $('#nombrePuerta' + (id + 1)).remove();
                            $('#puertaColor' + id).attr('src', src);
                            var attr = $('#puertaColor' + id).attr('style');
                            $('#puertaColor' + id).css({ opacity: '0.6' });
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<img id="marco' +
                                    id +
                                    '" style="' +
                                    attr +
                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                            );
                        }
                    } else {
                        if (id == 0) {
                            src =
                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                            $('#nombrePuerta' + (id + 1)).remove();
                            $('#puertaColor' + id).attr('src', src);
                            var attr = $('#puertaColor' + id).attr('style');
                            $('#puertaColor' + id).css({ opacity: '0.6' });
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<img id="marco' +
                                    id +
                                    '" style="' +
                                    attr +
                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                            );
                        }
                        if (id == 1) {
                            src =
                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                            $('#nombrePuerta' + (id + 1)).remove();
                            $('#puertaColor' + id).attr('src', src);
                            var attr = $('#puertaColor' + id).attr('style');
                            $('#puertaColor' + id).css({ opacity: '0.6' });
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<img id="marco' +
                                    id +
                                    '" style="' +
                                    attr +
                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                            );
                        }
                        if (id == 2) {
                            src =
                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                            $('#nombrePuerta' + (id + 1)).remove();
                            $('#puertaColor' + id).attr('src', src);
                            var attr = $('#puertaColor' + id).attr('style');
                            $('#puertaColor' + id).css({ opacity: '0.6' });
                            $('#imagenesArmario2 #imagenesArmario').append(
                                '<img id="marco' +
                                    id +
                                    '" style="' +
                                    attr +
                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                            );
                        }
                    }
                } else {
                    if (texto == '3 PUERTAS DERECHA') {
                        if (nombre == 'Cristal Bronce') {
                            if (id == 2) {
                                src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                $('#nombrePuerta' + (id + 1)).remove();
                                $('#puertaColor' + id).attr('src', src);
                                var attr = $('#puertaColor' + id).attr('style');
                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="marco' +
                                        id +
                                        '" style="' +
                                        attr +
                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                );
                            }
                            if (id == 0) {
                                src =
                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                $('#nombrePuerta' + (id + 1)).remove();
                                $('#puertaColor' + id).attr('src', src);
                                var attr = $('#puertaColor' + id).attr('style');
                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="marco' +
                                        id +
                                        '" style="' +
                                        attr +
                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                );
                            }
                            if (id == 1) {
                                src =
                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                $('#nombrePuerta' + (id + 1)).remove();
                                $('#puertaColor' + id).attr('src', src);
                                var attr = $('#puertaColor' + id).attr('style');
                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="marco' +
                                        id +
                                        '" style="' +
                                        attr +
                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                );
                            }
                        } else {
                            if (id == 2) {
                                src =
                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                $('#nombrePuerta' + (id + 1)).remove();
                                $('#puertaColor' + id).attr('src', src);
                                var attr = $('#puertaColor' + id).attr('style');
                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="marco' +
                                        id +
                                        '" style="' +
                                        attr +
                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                );
                            }
                            if (id == 0) {
                                src =
                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                $('#nombrePuerta' + (id + 1)).remove();
                                $('#puertaColor' + id).attr('src', src);
                                var attr = $('#puertaColor' + id).attr('style');
                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="marco' +
                                        id +
                                        '" style="' +
                                        attr +
                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                );
                            }
                            if (id == 1) {
                                src =
                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                $('#nombrePuerta' + (id + 1)).remove();
                                $('#puertaColor' + id).attr('src', src);
                                var attr = $('#puertaColor' + id).attr('style');
                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                $('#imagenesArmario2 #imagenesArmario').append(
                                    '<img id="marco' +
                                        id +
                                        '" style="' +
                                        attr +
                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                );
                            }
                        }
                    } else {
                        if (texto == '4 PUERTAS ASIMETRICAS') {
                            if (nombre == 'Cristal Bronce') {
                                if (id == 0) {
                                    src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                    );
                                }
                                if (id == 1) {
                                    src =
                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                    );
                                }
                                if (id == 2) {
                                    src =
                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                    );
                                }
                                if (id == 3) {
                                    src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                    );
                                }
                            } else {
                                if (id == 0) {
                                    src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                    );
                                }
                                if (id == 1) {
                                    src =
                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                    );
                                }
                                if (id == 2) {
                                    src =
                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                    );
                                }
                                if (id == 3) {
                                    src =
                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                    $('#nombrePuerta' + (id + 1)).remove();
                                    $('#puertaColor' + id).attr('src', src);
                                    var attr = $('#puertaColor' + id).attr('style');
                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                    $('#imagenesArmario2 #imagenesArmario').append(
                                        '<img id="marco' +
                                            id +
                                            '" style="' +
                                            attr +
                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                    );
                                }
                            }
                        } else {
                            if (texto == '5 PUERTAS CENTRAL') {
                                if (nombre == 'Cristal Bronce') {
                                    if (id == 2) {
                                        src =
                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                        );
                                    }
                                    if (id == 0) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                        );
                                    }
                                    if (id == 1) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                        );
                                    }
                                    if (id == 3) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                        );
                                    }
                                    if (id == 4) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                        );
                                    }
                                } else {
                                    if (id == 2) {
                                        src =
                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                        );
                                    }
                                    if (id == 0) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                        );
                                    }
                                    if (id == 1) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                        );
                                    }
                                    if (id == 3) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                        );
                                    }
                                    if (id == 4) {
                                        src =
                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                        $('#nombrePuerta' + (id + 1)).remove();
                                        $('#puertaColor' + id).attr('src', src);
                                        var attr = $('#puertaColor' + id).attr('style');
                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                        $('#imagenesArmario2 #imagenesArmario').append(
                                            '<img id="marco' +
                                                id +
                                                '" style="' +
                                                attr +
                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                        );
                                    }
                                }
                            } else {
                                if (texto == '5 PUERTAS IZQUIERDA') {
                                    if (nombre == 'Cristal Bronce') {
                                        if (id == 0) {
                                            src =
                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                            );
                                        }
                                        if (id == 1) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                            );
                                        }
                                        if (id == 2) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                            );
                                        }
                                        if (id == 3) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                            );
                                        }
                                        if (id == 4) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                            );
                                        }
                                    } else {
                                        if (id == 0) {
                                            src =
                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                            );
                                        }
                                        if (id == 1) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                            );
                                        }
                                        if (id == 2) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                            );
                                        }
                                        if (id == 3) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                            );
                                        }
                                        if (id == 4) {
                                            src =
                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                            $('#nombrePuerta' + (id + 1)).remove();
                                            $('#puertaColor' + id).attr('src', src);
                                            var attr = $('#puertaColor' + id).attr('style');
                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                '<img id="marco' +
                                                    id +
                                                    '" style="' +
                                                    attr +
                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                            );
                                        }
                                    }
                                } else {
                                    if (texto == '6 PUERTAS ASIMETRICAS') {
                                        if (nombre == 'Cristal Bronce') {
                                            if (id == 0) {
                                                src =
                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                );
                                            }
                                            if (id == 1) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                );
                                            }
                                            if (id == 2) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                );
                                            }
                                            if (id == 3) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                );
                                            }
                                            if (id == 4) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                );
                                            }
                                            if (id == 5) {
                                                src =
                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                );
                                            }
                                        } else {
                                            if (id == 0) {
                                                src =
                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                );
                                            }
                                            if (id == 1) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                );
                                            }
                                            if (id == 2) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                );
                                            }
                                            if (id == 3) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                );
                                            }
                                            if (id == 4) {
                                                src =
                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                );
                                            }
                                            if (id == 5) {
                                                src =
                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                $('#nombrePuerta' + (id + 1)).remove();
                                                $('#puertaColor' + id).attr('src', src);
                                                var attr = $('#puertaColor' + id).attr('style');
                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                    '<img id="marco' +
                                                        id +
                                                        '" style="' +
                                                        attr +
                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                );
                                            }
                                        }
                                    } else {
                                        if (texto == '7 PUERTAS IZQUIERDA') {
                                            if (nombre == 'Cristal Bronce') {
                                                if (id == 0) {
                                                    src =
                                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                    );
                                                }
                                                if (id == 1) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                    );
                                                }
                                                if (id == 2) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                    );
                                                }
                                                if (id == 3) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                    );
                                                }
                                                if (id == 4) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                    );
                                                }
                                                if (id == 5) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                    );
                                                }
                                                if (id == 6) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                    );
                                                }
                                            } else {
                                                if (id == 0) {
                                                    src =
                                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                    );
                                                }
                                                if (id == 1) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                    );
                                                }
                                                if (id == 2) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                    );
                                                }
                                                if (id == 3) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                    );
                                                }
                                                if (id == 4) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                    );
                                                }
                                                if (id == 5) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                    );
                                                }
                                                if (id == 6) {
                                                    src =
                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                    $('#puertaColor' + id).attr('src', src);
                                                    var attr = $('#puertaColor' + id).attr('style');
                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                        '<img id="marco' +
                                                            id +
                                                            '" style="' +
                                                            attr +
                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                    );
                                                }
                                            }
                                        } else {
                                            if (texto == '7 PUERTAS DERECHA') {
                                                if (nombre == 'Cristal Bronce') {
                                                    if (id == 6) {
                                                        src =
                                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 0) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 1) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 2) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 3) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 4) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 5) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                        );
                                                    }
                                                } else {
                                                    if (id == 6) {
                                                        src =
                                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 0) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 1) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 2) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 3) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 4) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (id == 5) {
                                                        src =
                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                        $('#puertaColor' + id).attr('src', src);
                                                        var attr = $('#puertaColor' + id).attr('style');
                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                            '<img id="marco' +
                                                                id +
                                                                '" style="' +
                                                                attr +
                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                        );
                                                    }
                                                }
                                            } else {
                                                if (texto == '8 PUERTAS ASIMETRICAS') {
                                                    if (nombre == 'Cristal Bronce') {
                                                        if (id == 0) {
                                                            src =
                                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 1) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 2) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 3) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 4) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 5) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 6) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 7) {
                                                            src =
                                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                            );
                                                        }
                                                    } else {
                                                        if (id == 0) {
                                                            src =
                                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 1) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 2) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 3) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 4) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 5) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 6) {
                                                            src =
                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                        if (id == 7) {
                                                            src =
                                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                            $('#puertaColor' + id).attr('src', src);
                                                            var attr = $('#puertaColor' + id).attr('style');
                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                '<img id="marco' +
                                                                    id +
                                                                    '" style="' +
                                                                    attr +
                                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                            );
                                                        }
                                                    }
                                                } else {
                                                    if (texto == '9 PUERTAS CENTRAL') {
                                                        if (nombre == 'Cristal Bronce') {
                                                            if (id == 4) {
                                                                src =
                                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 0) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 1) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 2) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 3) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 5) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 6) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 7) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 8) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                );
                                                            }
                                                        } else {
                                                            if (id == 4) {
                                                                src =
                                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 0) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 1) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 2) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 3) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 5) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 6) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 7) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                            if (id == 8) {
                                                                src =
                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                $('#puertaColor' + id).attr('src', src);
                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                    '<img id="marco' +
                                                                        id +
                                                                        '" style="' +
                                                                        attr +
                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                );
                                                            }
                                                        }
                                                    } else {
                                                        if (texto == '9 PUERTAS IZQUIERDA') {
                                                            if (nombre == 'Cristal Bronce') {
                                                                if (id == 0) {
                                                                    src =
                                                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 1) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 2) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 3) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 4) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 5) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 6) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 7) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 8) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                    );
                                                                }
                                                            } else {
                                                                if (id == 0) {
                                                                    src =
                                                                        '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 1) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 2) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 3) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 4) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 5) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 6) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 7) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                                if (id == 8) {
                                                                    src =
                                                                        '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                    $('#nombrePuerta' + (id + 1)).remove();
                                                                    $('#puertaColor' + id).attr('src', src);
                                                                    var attr = $('#puertaColor' + id).attr('style');
                                                                    $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                    $('#imagenesArmario2 #imagenesArmario').append(
                                                                        '<img id="marco' +
                                                                            id +
                                                                            '" style="' +
                                                                            attr +
                                                                            '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                    );
                                                                }
                                                            }
                                                        } else {
                                                            if (texto == '10 PUERTAS ASIMETRICAS') {
                                                                if (nombre == 'Cristal Bronce') {
                                                                    if (id == 0) {
                                                                        src =
                                                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 1) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 2) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 3) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 4) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 5) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 6) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 7) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 8) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 9) {
                                                                        src =
                                                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                                        );
                                                                    }
                                                                } else {
                                                                    if (id == 0) {
                                                                        src =
                                                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 1) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 2) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 3) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 4) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 5) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 6) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 7) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 8) {
                                                                        src =
                                                                            '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                    if (id == 9) {
                                                                        src =
                                                                            '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                                        $('#nombrePuerta' + (id + 1)).remove();
                                                                        $('#puertaColor' + id).attr('src', src);
                                                                        var attr = $('#puertaColor' + id).attr('style');
                                                                        $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                        $('#imagenesArmario2 #imagenesArmario').append(
                                                                            '<img id="marco' +
                                                                                id +
                                                                                '" style="' +
                                                                                attr +
                                                                                '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                                        );
                                                                    }
                                                                }
                                                            } else {
                                                                if (texto == '11 PUERTAS IZQUIERDA') {
                                                                    if (nombre == 'Cristal Bronce') {
                                                                        if (id == 0) {
                                                                            src =
                                                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 1) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 2) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 3) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 4) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 5) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 6) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 7) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 8) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 9) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 10) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                            );
                                                                        }
                                                                    } else {
                                                                        if (id == 0) {
                                                                            src =
                                                                                '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 1) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 2) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 3) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 4) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 5) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 6) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 7) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 8) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 9) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                        if (id == 10) {
                                                                            src =
                                                                                '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                            $('#nombrePuerta' + (id + 1)).remove();
                                                                            $('#puertaColor' + id).attr('src', src);
                                                                            var attr = $('#puertaColor' + id).attr('style');
                                                                            $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                            $('#imagenesArmario2 #imagenesArmario').append(
                                                                                '<img id="marco' +
                                                                                    id +
                                                                                    '" style="' +
                                                                                    attr +
                                                                                    '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                            );
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (texto == '12 PUERTAS ASIMETRICAS') {
                                                                        if (nombre == 'Cristal Bronce') {
                                                                            if (id == 0) {
                                                                                src =
                                                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 1) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 2) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 3) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 4) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 5) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 6) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 7) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 8) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 9) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 10) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 11) {
                                                                                src =
                                                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                        } else {
                                                                            if (id == 0) {
                                                                                src =
                                                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 1) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 2) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 3) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 4) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 5) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 6) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 7) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 8) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 9) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 10) {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                            if (id == 11) {
                                                                                src =
                                                                                    '../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/peque/5. PUERTA ALUMINIO/peque_puertaaluminio_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                        }
                                                                    } else {
                                                                        if (nombre == 'Cristal Bronce') {
                                                                            if (tipo == 'Par') {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_bronce_optimized.png">'
                                                                                );
                                                                            } else {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_bronce_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.6' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_bronce_optimized.png">'
                                                                                );
                                                                            }
                                                                        } else {
                                                                            if (tipo == 'Par') {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).css({ opacity: '0.5' });
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/DERECHA/grande_puertaaluminio_derecha_marco_transparente_optimized.png">'
                                                                                );
                                                                            } else {
                                                                                src =
                                                                                    '../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_cristal_transparente_optimized.png';
                                                                                $('#nombrePuerta' + (id + 1)).remove();
                                                                                $('#puertaColor' + id).css({ opacity: '0.5' });
                                                                                var attr = $('#puertaColor' + id).attr('style');
                                                                                $('#puertaColor' + id).attr('src', src);
                                                                                $('#imagenesArmario2 #imagenesArmario').append(
                                                                                    '<img id="marco' +
                                                                                        id +
                                                                                        '" style="' +
                                                                                        attr +
                                                                                        '" src="../../../content/images/ar/grande/5. PUERTAS ALUMINIO/IZQUIERDA/grande_puertaaluminio_izquierda_marco_transparente_optimized.png">'
                                                                                );
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    public guardarIdPuerta(id) {
        this.idPuertaInput = id;
    }
    public cambiarAcabadoTrasera(nombre) {
        var hueco = this.numeroDeHuecos;
        var acabados = this.acabados;
        $('#inputAcabadoTrasera').empty();
        for (let w = 0; w < acabados.length; w++) {
            if (acabados[w]['nombre'] == nombre) {
                $('#inputAcabadoTrasera').val(acabados[w].nombre);
                $('#inputAcabadoTrasera').append(
                    '<img width="100%" height="100%" src="data:image/gif;base64,' +
                        acabados[w]['imagenFondo'] +
                        '" style="max-width:100%;max-height:100%">'
                );
            }
        }
        for (let i = 0; i < hueco; i++) {
            var trasera = $('#imagenesArmario1 #trasera' + i).attr('src');
            var parte1Trasera = trasera.split('_')[0];
            var parte2Trasera = trasera.split('_')[1];
            var enteraTrasera = parte1Trasera + '_' + parte2Trasera + '_' + nombre.toLowerCase() + '.png';
            $('#imagenesArmario1 #trasera' + i).attr('src', enteraTrasera);
            $('#imagenesArmario2 #trasera' + i).attr('src', enteraTrasera);
        }
        var interior = $('#inputAcabadoInterior').val();
        var casco = $('#inputAcabadoCasco').val();
        if (interior != '' && casco != '') {
            $('#interioresDiv').removeAttr('class');
            this.productosDormitorioService.categoria(24).subscribe(data => {
                this.productosDormitorioModal = data.body;
            });
            this.productosDormitorioService.categoria(10).subscribe(data => {
                this.puertasModal = data.body;
            });
        }
    }

    transition() {
        this.router.navigate(['/productos-dormitorio'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/productos-dormitorio',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.precioTienda = sessionStorage.getItem('precioTienda');
        this.registerChangeInProductosDormitorios();
    }

    ngOnDestroy() {
        this.armarioService.todo = undefined;
        this.eventManager.destroy(this.eventSubscriber);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInProductosDormitorios() {
        this.eventSubscriber = this.eventManager.subscribe('productosDormitorioListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriasDormi>>) {
        result.subscribe((res: HttpResponse<ICategoriasDormi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected onSaveError() {
        this.isSaving = false;
    }

    protected subscribeToSaveResponse1(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    previousState() {
        this.presupuestoPedido;
        $('#modalPresupuesto .modal-body').empty();
        $('#modalPresupuesto .modal-title').text('Presupuesto Generado');
        $('#modalPresupuesto .modal-body').append('<p style="text-align:center">Codigo</p>');
        $('#modalPresupuesto .modal-body').append('<p style="text-align:center">' + this.presupuestoPedido['codigo'] + '</p>');
        $('#modalPresupuesto #verPresupuesto').removeAttr('style');
        $('#modalPresupuesto #verPresupuesto').attr('style');
        $('#modalPresupuesto #verPresupuesto').css({ 'text-align': 'center' });
        for (let i = 1; i <= 10; i++) {
            if (sessionStorage.getItem('prod' + i) != 'undefinded') {
                sessionStorage.removeItem('prod' + i);
            }
        }
    }
    protected subscribeToSaveResponse2(result: Observable<HttpResponse<IAcabadosProductosPresupuestoPedido>>) {
        result.subscribe(
            (res: HttpResponse<IAcabadosProductosPresupuestoPedido>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected paginateProductosDormitorios(data: IProductosDormitorio[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosDormitorios = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    public cargarInterioresArmarios() {
        var ancho = $('#anchosSelect').val();
        var alto = $('#alturaSelect').val();
        if (ancho != '' && alto != '') {
            this.armarioService.findBus(ancho, ancho).subscribe(data => {
                this.armarioService.todo = data.body;
                console.log(data.body);
                $('#textoTituloInterior').text('OPCIONES DISPONIBLES');
            });
        }
    }

    public guardarIdInterior(id) {
        this.idInteriorInput = id;
    }

    public cogidoInterior(id) {
        var mai = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z'
        ];
        var idInt = this.idInteriorInput;
        this.idInteriorCogido = id;
        var interior = this.interiorArmario;
        for (let i = 0; i < interior.length; i++) {
            if (interior[i]['id'] == id) {
                $('.interior' + idInt).val(interior[i]['nombre']);
                $('.interiorAcabado' + idInt).removeAttr('style');
                $('.interiorAcabado' + idInt).attr('style');
                $('.interiorAcabado' + idInt).css({ border: '1px solid black' });
                $('.interiorAcabado' + idInt).css({ width: '140px' });
                $('.interiorAcabado' + idInt).css({ height: '30px' });
                $('.interiorAcabado' + idInt).css({ float: 'left' });
                $('.interiorLuz' + idInt).removeAttr('style');
                $('#interioresArmario #datos1 #nombreInteriorDentro' + idInt).remove();
                $('#interioresArmario #precios1 #precioInteriorDentro' + idInt).remove();
                $('#interioresArmario #precioCalculado1 #precioCalculadoInteriorDentro' + idInt).remove();

                $('#interioresArmario #datos1').append('<p id="nombreInteriorDentro' + idInt + '">Interior ' + mai[idInt] + '</p>');
                $('#interioresArmario #precios1').append('<p id="precioInteriorDentro' + idInt + '">Sin luz</p>');

                $('#interioresArmario #precioCalculado1').append(
                    '<p id="precioCalculadoInteriorDentro' + idInt + '">' + interior[i]['precio'] + '&euro;</p>'
                );
            }
        }
        $('.interior' + idInt).attr('style');
        $('.interior' + idInt).css({ 'background-color': '#DFDDDC' });
        var acabados;
        this.acaProdService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IAcaProd[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['productosDormitorio']['id'] == 50) {
                            acabados = res.body[i]['acabados'];
                        }
                    }
                    this.acabadosInteriorArmario = acabados;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    public cogerLuz(id) {
        var idInt = this.idInteriorCogido;
        var interior = this.interiorArmario;
        for (let i = 0; i < interior.length; i++) {
            if (interior[i]['id'] == idInt) {
                $('.interiorLuz' + id).attr('style');
                $('.interiorLuz' + id).css({ 'background-color': '#DFDDDC' });
                $('#interioresArmario #precioCalculado1 #precioCalculadoInteriorDentro' + id).remove();
                $('#interioresArmario #precios1 #precioInteriorDentro' + id).text('Con luz');
                $('#interioresArmario #precioCalculado1').append(
                    '<p id="precioCalculadoInteriorDentro' + id + '">' + (interior[i]['precio'] + interior[i]['precioLuz']) + '&euro;</p>'
                );
            }
        }
    }

    public cambiarAcabado(idImagen, id, id1) {
        $('#iluminacion').removeAttr('style');
        $('#iluminacion').attr('style');
        $('#iluminacion').css({ display: 'none' });
        $('#textoFinal').removeAttr('style');
        $('#textoFinal').attr('style');
        $('#textoFinal').css({ display: 'none' });
        var k = 1;
        var nombreAcabado;
        var nombre = $('#nombreMesita')
            .text()
            .toLowerCase();
        if (nombre == '1 cajon') {
            nombre = '1cajon';
        }
        var idAca = $('#myModalColores' + id1 + ' #acabadoImagen' + idImagen + ' #imagenAcabado' + idImagen).attr('class');
        var todosAcabados = this.acabados;
        $.each(todosAcabados, function(index, value) {
            if (value['id'] == idAca) {
                $('#acabado1 #imagenAcabadoPrincipal' + k).remove();
                nombreAcabado = value['nombre'].toLowerCase();
                $('#acabado1').append(
                    '<img  src="data:image/gif;base64,' +
                        value['imagenFondo'] +
                        '" id="imagenAcabadoPrincipal' +
                        k +
                        '" class="' +
                        value['id'] +
                        '" height="60px" width="200px" style=" opacity: 0.7;margin-left:20px">'
                );
                $('#acabado1 #acabadoNombrePrincipal').remove();
                $('#acabado1').append(
                    '<p id="acabadoNombrePrincipal" style="color:black;margin-left: 90px;margin-top: -60px;" >' + value['nombre'] + '</p>'
                );

                $('#cascoEstandar #datos1').append('<p id="val' + id1 + '">Casco</p>');
                $('#cascoEstandar #precios1').append('<p id="val' + id1 + 'Dato" class="' + value['id'] + '">' + value['nombre'] + '</p>');
                k++;
            }
        });
    }

    public cargarPuertas(id) {
        var cogerPuerInt = this.cogerPuertasInterior;
        $('#textoImagenInterior').text('5. ACABADOS PUERTAS E INTERIORES');
        $('#acabado1').removeAttr('style');
        $('#tipoAcabados').removeAttr('style');
        $('#tipoAcabados').css({ 'text-align': 'center' });
        $('#tiradoresDiv').removeAttr('style');
        $('#tiradoresDiv').attr('style');
        $('#tiradoresDiv').css({ float: 'left' });
        $('#tiradoresDiv').css({ width: '100%' });
        $('#tiradoresDiv').css({ 'margin-top': '5%' });
        var armarios = this.armarios;
        var dimensiones = this.dimensionesArmarios;
        var ancho = $('#anchoCalculadora').text();
        var anchoPrimero;
        var alto = $('#altoCalculadora').text();
        var idInt = $('#interioresArmarios' + id + ' #idInterior').attr('class');
        $('#altoCalculadora').attr('class', idInt);
        var acabadosProductos = this.acabadosProductos;
        var altoPrimero;
        var modelo = [];
        var numeroPuertas = [];
        var cont = 0;
        var yes = 0;
        for (let j = 0; j < 16; j++) {
            $('#interioresArmarios' + j).css({ 'background-color': 'white' });
        }
        var idNueva = $('#mensajeId' + id).attr('class');
        for (let i = 0; i < cogerPuerInt.length; i++) {
            if (cogerPuerInt[i][0]['id'] == idInt && cogerPuerInt[i][1][2]['id'] == idNueva) {
                $('#imagenInteriorPuertas #imagenesLasDos').append(
                    '<p id="idInterior" class="' +
                        cogerPuerInt[i][0]['id'] +
                        '" style="text-align:center"><img  src="data:image/gif;base64,' +
                        cogerPuerInt[i][1][2]['imagen'] +
                        '" width="70%" style=" opacity: 0.7;margin-left:20px;max-height:300px;max-width:400px"></p>'
                );
                $('#imagenInteriorPuertas #imagenesLasDos').append(
                    '<p style="text-align:center"><img  src="data:image/gif;base64,' +
                        cogerPuerInt[i][0]['imagen'] +
                        '" width="70%" style=" opacity: 0.7;margin-left:20px;max-height:300px;max-width:400px"></p>'
                );
            }
        }
        this.idArmarioCogido = idNueva;
        var interiores = this.interioresArmarios;
        for (let u = 0; u < interiores.length; u++) {
            if (interiores[u]['productosDormitorio']['id'] == idNueva) {
                if (interiores[u]['ancho'] == ancho && interiores[u]['alto'] == alto) {
                    $('#precioDimension').text(interiores[u]['precio']);
                } else {
                    if (interiores[u]['ancho'] > ancho) {
                        if (interiores[u]['alto'] == alto && yes == 0) {
                            $('#precioDimension').text(interiores[u]['precio']);
                            yes++;
                        } else {
                            if (interiores[u]['alto'] > alto && yes == 0) {
                                $('#precioDimension').text(interiores[u]['precio']);
                                yes++;
                            }
                        }
                    }
                }
            }
        }
        var acabadosPuertas = [];
        var contAca = 0;
        for (let i = 0; i < armarios.length; i++) {
            if (armarios[i]['id'] == idNueva) {
                var str = armarios[i]['nombre'];
                var patrón = /[0-9]+/;
                var matches = str.match(patrón);
                for (let k = 0; k < dimensiones.length; k++) {
                    if (dimensiones[k]['productosDormitorio']['id'] == idNueva) {
                        if (modelo[0] == undefined || dimensiones[k]['tipoProducto']['id'] != modelo[cont - 1]['tipoProducto']['id']) {
                            modelo[cont] = dimensiones[k];
                            cont++;
                        }
                    }
                }
                this.tipoPuerta = modelo;
                for (let j = 0; j < matches[0]; j++) {
                    $('#numeroPuertas0').append('<p>Puerta ' + j + '</p>');
                    numeroPuertas[j] = 'Puerta ' + (j + 1);
                }

                for (let h = 0; h < modelo.length; h++) {
                    if (modelo[h]['productosDormitorio']['id'] == idNueva) {
                        for (let u = 0; u < acabadosProductos.length; u++) {
                            if (
                                modelo[h]['productosDormitorio']['id'] == acabadosProductos[u]['productosDormitorio']['id'] &&
                                modelo[h]['tipoProducto']['id'] == acabadosProductos[u]['tipoProducto']['id']
                            ) {
                                acabadosPuertas[contAca] = acabadosProductos[u]['acabados'];
                                contAca++;
                            }
                        }
                    }
                }
                this.numeroPuertas = numeroPuertas;
                this.acabadosPuertas = acabadosPuertas;
            }
        }
        $('#interioresArmarios' + id).css({ 'background-color': '#DFDDDC' });

        var tipo1 = [];
        var cont = 0;
        var numero = this.numeroPuertas;
        var saber = 0;
        var valor = [];
        var interior = [];
        var precio;
        var tiradoresBuenos = [];
        var ancho = $('#anchoCalculadora').text();
        var alto = $('#altoCalculadora').text();
        var int = 0;
        var idInt = '';
        var idNueva = '';
        idInt = $('#altoCalculadora').attr('class');
        idNueva = this.idArmarioCogido;
        var dimensiones = this.dimensionesArmarios;
        valor = this.valores;
        tipo1 = this.tipoPuerta1;
        if ($('input:radio[name=radio' + id + ']:checked').val()) {
            tipo1[id] = $('input:radio[name=radio' + id + ']:checked').val();
            valor[id] = $('#' + armarios + ' #select' + id).val();
            cont++;
        }
        for (let h = 0; h < numero.length; h++) {
            if (valor[h] != '' && valor[h] != undefined && tipo1[h] != '' && tipo1[h] != undefined) {
                saber = 1;
            } else {
                saber = 0;
            }
        }
        if (saber == 1 || saber == 0) {
            for (let i = 0; i < dimensiones.length; i++) {
                if (dimensiones[i]['productosDormitorio']['id'] == idNueva) {
                    if (dimensiones[i]['ancho'] == ancho && dimensiones[i]['alto'] == alto) {
                        precio = dimensiones[i]['precio'];
                    } else {
                        if (dimensiones[i]['ancho'] == ancho && dimensiones[i]['alto'] != alto) {
                            if (dimensiones[i]['alto'] > alto) {
                                precio = dimensiones[i]['precio'];
                            }
                        } else {
                            if (dimensiones[i]['ancho'] != ancho && dimensiones[i]['alto'] == alto) {
                                if (dimensiones[i]['ancho'] > ancho) {
                                    precio = dimensiones[i]['precio'];
                                }
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < valor.length; i++) {
                $('#datos1 #puertaAcabado' + i).remove();
                $('#precios1 #puertaValor' + i).remove();
                $('#precioCalculado1 #puertaRaya' + i).remove();

                $('#datos1').append('<p id="puertaAcabado' + i + '">Puerta ' + (i + 1) + '</p>');
                $('#precios1').append('<p id="puertaValor' + i + '">' + tipo1[i] + ' ' + valor[i] + '</p>');
                $('#precioCalculado1').append('<p id="puertaRaya' + i + '">' + precio + '</p>');
            }
            var tiradores = this.tiradores;
            tiradoresBuenos[1] = tiradores[3];
            tiradoresBuenos[2] = tiradores[4];
            var altura = $('#altoCalculadora').text();
            var contAltura = 0;
            for (let i = 0; i < tiradores.length; i++) {
                if (tiradores[i]['altura'] != null && tiradores[i]['altura'] != undefined) {
                    if (tiradores[i]['altura'] == altura) {
                        contAltura = 1;
                        tiradoresBuenos[0] = tiradores[i];
                    } else {
                        if (contAltura == 0) {
                            if (tiradores[i + 1] != undefined) {
                                if (tiradores[i + 1]['altura'] > altura) {
                                    contAltura = 1;
                                    tiradoresBuenos[0] = tiradores[i + 1];
                                }
                            }
                        }
                    }
                }
            }
            this.tiradoresBuenos = tiradoresBuenos;
            $('#textoTiradores').text('Escoge los Tiradores');
        }

        console.log(tipo1);
        this.valores = valor;
        this.tipoPuerta1 = tipo1;

        var int = 0;
        var numero = this.numeroPuertas.length;
        numero = numero / 2;
        numero = Math.round(numero);
        var tiradores = this.tiradores;
        var idTir = $('.tirador' + id).attr('id');
        for (let i = 0; i < tiradores.length; i++) {
            if (tiradores[i]['id'] == idTir) {
                $('#datos1 #tiradorDato').remove();
                $('#precios1 #tiradorUnidades').remove();
                $('#precioCalculado1 #tiradoresPrecio').remove();

                $('#datos1').append('<p id="tiradorDato">' + tiradores[i]['nombre'] + '</p>');
                $('#precios1').append('<p id="tiradorUnidades">' + numero + ' unidades</p>');
                $('#precioCalculado1').append('<p id="tiradoresPrecio">' + tiradores[i]['precio'] * numero + '&euro;</p>');
            }
        }
        var tiradores = this.tiradores;
        $('.tirador1').removeAttr('style');
        $('.tirador2').removeAttr('style');
        $('.tirador0').removeAttr('style');
        var interior = [];
        var cont = 1;
        var tiradoresMostrar = [];
        this.numeroInteriorArmario;
        var si = 0;
        var no = 0;
        var aux = [];
        var idInt1 = parseFloat(idInt);
        var idNueva1 = parseFloat(idNueva);
        $('.tirador' + id).attr('style');
        $('.tirador' + id).css({ 'background-color': '#DFDDDC' });
        $('#textoInteriores').text('Escoge los interiores');
        this.interiorArmarioDentroService
            .query({
                size: 100000
            })
            .subscribe(
                (res: HttpResponse<IInteriorArmarioDentro[]>) => {
                    for (let v = 0; v < res.body.length; v++) {
                        if (res.body[v]['interioresArmarios']['id'] == idInt1 && res.body[v]['productosDormitorio']['id'] == idNueva1) {
                            if (interior[int - 1] == undefined || interior[int - 1]['nombre'] != res.body[v]['nombre']) {
                                interior[int] = res.body[v];

                                if (aux[1] != undefined) {
                                    tiradoresMostrar[si] = aux;
                                    aux = [];
                                    si++;
                                    cont = 1;
                                }

                                aux[0] = interior[int];
                                tiradoresMostrar[si] = aux;
                                int++;
                            } else {
                                aux[cont] = res.body[v];
                                cont++;
                            }
                        }
                    }

                    this.interiorArmario = interior;
                    this.numeroInteriorArmario = tiradoresMostrar;
                    console.log(tiradoresMostrar);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        var puertasTabla;
        var contTabla = 0;
        var idProd = this.idArmarioCogido;
        this.puertasService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPuertas[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['productosDormitorio']['id'] == idProd) {
                            puertasTabla = res.body[i]['puertasProductos'];
                        }
                    }
                    this.puertasTabla = puertasTabla;
                    console.log(this.puertasTabla);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        var numero = this.numeroPuertas.length;

        $('#puertasArmario').attr('style');
        $('#puertasArmario').css({ width: '100%' });
        $('#puertasArmario').css({ float: 'left' });
        $('#textoPuertas').attr('style');
        $('#textoPuertas').css({ width: '100%' });
        $('#textoPuertas').css({ 'background-color': '#DFDDDC' });
        $('#textoPuertas').text('Puertas');
        for (let i = 1; i <= numero; i++) {
            $('#puertasArmario #datos1').append('<p>Puerta ' + i + '</p>');
        }
        $('#tiradoresArmario').attr('style');
        $('#tiradoresArmario').css({ width: '100%' });
        $('#tiradoresArmario').css({ float: 'left' });
        $('#textoTirador').attr('style');
        $('#textoTirador').css({ width: '100%' });
        $('#textoTirador').css({ 'background-color': '#DFDDDC' });
        $('#textoTirador').text('Tirador');

        $('#interioresArmario').attr('style');
        $('#interioresArmario').css({ width: '100%' });
        $('#interioresArmario').css({ float: 'left' });
        $('#textoInterior').attr('style');
        $('#textoInterior').css({ width: '100%' });
        $('#textoInterior').css({ 'background-color': '#DFDDDC' });
        $('#textoInterior').text('Interiores');
    }

    public calculadoraTiradores(id) {
        var tiradores = this.tiradoresBuenos;
        var numero = this.numeroPuertas.length;
        numero = numero / 2;
        numero = Math.round(numero);
        for (let i = 0; i < tiradores.length; i++) {
            if (tiradores[i]['id'] == id) {
                $('#inputTiradores').val(tiradores[i]['nombre']);
                $('#tiradoresArmario #datos1 #tiradorDato').remove();
                $('#tiradoresArmario #precios1 #tiradorUnidades').remove();
                $('#tiradoresArmario #precioCalculado1 #tiradoresPrecio').remove();

                $('#tiradoresArmario #datos1').append('<p id="tiradorDato">' + tiradores[i]['nombre'] + '</p>');
                $('#tiradoresArmario #precios1').append('<p id="tiradorUnidades">' + numero + ' unidades</p>');
                $('#tiradoresArmario #precioCalculado1').append(
                    '<p id="tiradoresPrecio">' + tiradores[i]['precio'] * numero + '&euro;</p>'
                );
            }
        }
    }

    public cogerIdAcabados(id, ud) {
        this.posicionInput = id;
        this.posicionU = ud;
    }

    public cargarAcabadosPuertas(id) {
        var acabados = [];
        var todos = this.acabadosPuertasTodos;
        var ud = this.posicionU;
        var cont = 0;
        var idNueva = this.idArmarioCogido;
        var dimensiones = this.dimensionesArmarios;
        var ancho = $('#anchoCalculadora').text();
        var alto = $('#altoCalculadora').text();
        var precio;
        var numero = this.numeroPuertas.length;
        var dentro = 0;
        var puertas = this.puertasTabla;
        for (let i = 0; i < dimensiones.length; i++) {
            if (dimensiones[i]['productosDormitorio']['id'] == idNueva && dentro == 0) {
                if (dimensiones[i]['ancho'] == ancho && dimensiones[i]['alto'] == alto) {
                    precio = dimensiones[i]['precio'];
                    dentro = 1;
                } else {
                    if (dimensiones[i]['ancho'] == ancho && dimensiones[i]['alto'] != alto) {
                        if (dimensiones[i]['alto'] > alto) {
                            precio = dimensiones[i]['precio'];
                            dentro = 1;
                        }
                    } else {
                        if (dimensiones[i]['ancho'] != ancho && dimensiones[i]['alto'] == alto) {
                            if (dimensiones[i]['ancho'] > ancho) {
                                precio = dimensiones[i]['precio'];
                                dentro = 1;
                            }
                        }
                    }
                }
            }
        }

        for (let i = 0; i < puertas.length; i++) {
            if (puertas[i]['id'] == id) {
                $('#puertasTodo #puertaAcabados .input0' + ud).val(puertas[i]['nombre']);
                this.nombreTipoPuerta = puertas[i]['nombre'];
            }
        }

        $('#puertasArmario #precios1').append('<p>' + this.nombreTipoPuerta + ' </p>');
        $('#puertasArmario #precioCalculado1').append('<p>' + precio / numero + '&euro;</p>');
        this.acaProdService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IAcaProd[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['productosDormitorio']['id'] == id) {
                            acabados[cont] = res.body[i]['acabados'];
                            $('.input' + (cont + 1) + '' + ud).removeAttr('disabled');
                            $('.input' + (cont + 1) + '' + ud).css({ border: '1px solid' });
                            cont++;
                        }
                    }
                    todos[ud] = acabados;
                    this.acabadosPuertasTodos = todos;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    public mostrarAcabadosPuerta(id, ud) {
        this.acabadosPuertasId = this.acabadosPuertasTodos[ud][id];
        this.cogerIdAcabados(id, ud);
    }

    public pintarAcabadosCalculadora(id) {
        var acabados = this.acabados;
        this.posicionInput;
        var ud = this.posicionU;
        var idNueva = this.idArmarioCogido;
        var dimensiones = this.dimensionesArmarios;
        var ancho = $('#anchoCalculadora').text();
        var alto = $('#altoCalculadora').text();
        var precio;
        var numero = this.numeroPuertas.length;
        var dentro = 0;
        for (let i = 0; i < dimensiones.length; i++) {
            if (dimensiones[i]['productosDormitorio']['id'] == idNueva && dentro == 0) {
                if (dimensiones[i]['ancho'] == ancho && dimensiones[i]['alto'] == alto) {
                    precio = dimensiones[i]['precio'];
                    dentro = 1;
                } else {
                    if (dimensiones[i]['ancho'] == ancho && dimensiones[i]['alto'] != alto) {
                        if (dimensiones[i]['alto'] > alto) {
                            precio = dimensiones[i]['precio'];
                            dentro = 1;
                        }
                    } else {
                        if (dimensiones[i]['ancho'] != ancho && dimensiones[i]['alto'] == alto) {
                            if (dimensiones[i]['ancho'] > ancho) {
                                precio = dimensiones[i]['precio'];
                                dentro = 1;
                            }
                        }
                    }
                }
            }
        }

        for (let i = 0; i < acabados.length; i++) {
            if (acabados[i]['id'] == id) {
                $('.input' + (this.posicionInput + 1) + '' + this.posicionU).append(
                    '<img width="100%" height="100%" src="data:image/gif;base64,' +
                        acabados[i]['imagenFondo'] +
                        '" style="max-width:100%;max-height:100%">'
                );
                $('#puertasArmario #precios1').append('<p>' + this.nombreTipoPuerta + ' </p>');
                $('#puertasArmario #precioCalculado1').append('<p>' + (acabados[i]['precio'] + precio / numero) + '&euro;</p>');
            }
        }
    }
    public pintarAcabadosInterior(id) {
        var acabados = this.acabados;
        var idInt = this.idInteriorInput;
        for (let i = 0; i < acabados.length; i++) {
            if (acabados[i]['id'] == id) {
                $('.interiorAcabado' + idInt).append(
                    '<img width="100%" height="100%" src="data:image/gif;base64,' +
                        acabados[i]['imagenFondo'] +
                        '" style="max-width:100%;max-height:100%">'
                );
            }
        }
    }

    public cogerInterior(id, ud, luz) {
        var interior = this.interiorArmario;
        var idInt;
        for (let i = 0; i < interior.length; i++) {
            $('.interior' + i + '' + ud).removeAttr('style');
            $('.interiorluz' + i + '' + ud).removeAttr('style');
        }
        if (luz == 'no') {
            $('.interior' + id + '' + ud).attr('style');
            idInt = $('.interior' + id + '' + ud).attr('id');
            $('.interior' + id + '' + ud).css({ 'background-color': '#DFDDDC' });
        }
        if (luz == 'si') {
            $('.interiorluz' + id + '' + ud).attr('style');
            idInt = $('.interiorluz' + id + '' + ud).attr('id');
            $('.interiorluz' + id + '' + ud).css({ 'background-color': '#DFDDDC' });
        }
        this.interiorArmarioDentroService
            .query({
                size: 100000
            })
            .subscribe(
                (res: HttpResponse<IInteriorArmarioDentro[]>) => {
                    for (let v = 0; v < res.body.length; v++) {
                        if (res.body[v]['id'] == idInt) {
                            $('#datos1 #nombreInteriorDentro' + ud).remove();
                            $('#precios1 #precioInteriorDentro' + ud).remove();
                            $('#precioCalculado1 #precioCalculadoInteriorDentro' + ud).remove();

                            $('#datos1').append('<p id="nombreInteriorDentro' + ud + '">' + res.body[v]['nombre'] + '</p>');
                            $('#precios1').append('<p id="precioInteriorDentro' + ud + '">Interior</p>');
                            if (luz == 'si') {
                                $('#precioCalculado1').append(
                                    '<p id="precioCalculadoInteriorDentro' +
                                        ud +
                                        '">' +
                                        (res.body[v]['precio'] + res.body[v]['precioLuz']) +
                                        '&euro;</p>'
                                );
                            } else {
                                $('#precioCalculado1').append(
                                    '<p id="precioCalculadoInteriorDentro' + ud + '">' + res.body[v]['precio'] + '&euro;</p>'
                                );
                            }
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    ngAfterViewInit() {
        var todasDimensiones = [];
        var apoyo = [];
        var usuarios = [];
        var acabados = [];
        var sistemasApoyo = [];
        var numeroProductos = [];
        var ilu = [];
        var especiales = [];
        $('#producto').append('<datalist id="listaAnchos"></datalist>');
        $('#producto').append('<datalist id="listaAltura"></datalist>');
        for (let i = 375; i < 6050; i + 25) {
            i = i + 25;
            $('#listaAnchos').append('<option value="' + i + '">' + i + '</option>');
        }
        for (let i = 2190; i < 2600; i + 10) {
            i = i + 10;
            $('#listaAltura').append('<option style="color:red" value="' + i + '">' + i + '</option>');
        }
        var interiores = [];
        this.interioresArmariosService
            .query({
                size: 100000
            })
            .subscribe(
                (res: HttpResponse<IInterioresArmarios[]>) => {
                    for (let k = 0; k < res.body.length; k++) {
                        interiores[k] = res.body[k];
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.interioresArmarios = interiores;
        this.productosPresupuestoPedidosService
            .query({
                size: 1000
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    numeroProductos[index] = value;
                });
            });
        this.acaProdPed = numeroProductos;
        this.tiposApoyoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    sistemasApoyo[index] = value;
                });
            });
        this.sistemasApoyo = sistemasApoyo;
        this.acabadosService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    acabados[index] = value;
                });
            });
        this.acabados = acabados;
        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    usuarios[index] = value;
                });
            });
        this.user = usuarios;
        this.dimensionesProductoTipoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    todasDimensiones[index] = value;
                });
            });
        this.todasDimensiones = todasDimensiones;

        var tiradores = [];
        this.tiradoresArmarioService
            .query({
                size: 100000
            })
            .subscribe(
                (res: HttpResponse<ITiradoresArmario[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        tiradores[i] = res.body[i];
                    }
                    this.tiradores = tiradores;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.productosDormitorioService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    apoyo[index] = value;
                });
            });
        this.apoyo = apoyo;

        for (let i = 1; i <= 100; i++) {
            var sesion = JSON.parse(sessionStorage.getItem('prod' + i));
            if (sesion != null) {
                console.log(sessionStorage);
                $('#productoCarrito' + i).removeAttr('style');
                $('#productoCarrito' + i).attr('style');
                $('#productoCarrito' + i).css({ float: 'left' });
                $('#productoCarrito' + i).attr('class', 'prod' + i);
                $('#productoCarrito' + i + ' #datos' + i).append(
                    '<strong id="nombreProd' + i + '"><font>' + sesion[1]['productosDormitorio']['nombre'] + '</font></strong>'
                );
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Ancho</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append(
                    '<font id="ancho' + i + '" class="' + sesion[1]['id'] + '">' + sesion[1]['ancho'] + '</font>'
                );
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Alto</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append(
                    '<font id="alto' + i + '" class="' + sesion[1]['precio'] + '">' + sesion[1]['alto'] + '</font>'
                );
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                $('#productoCarrito' + i + ' #datos' + i).append('<font>Fondo</font>');
                $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                $('#productoCarrito' + i + ' #precios' + i).append('<font id="fondo' + i + '">' + sesion[1]['fondo'] + '</font>');
                $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                for (let j = 1; j < 100; j++) {
                    if (sesion[1]['acabado' + j] != undefined) {
                        $('#productoCarrito' + i + ' #datos' + i).append('<font>Acabado ' + j + '</font>');
                        $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                        $('#productoCarrito' + i + ' #precios' + i).append(
                            '<font id="acabado' + i + '' + j + '">' + sesion[1]['acabado' + j]['nombre'] + '</font>'
                        );
                        $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                        $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>-</font>');
                        $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                    }
                }
                if (sesion[1]['apoyo'] != undefined) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>' + sesion[1]['apoyo']['productoApoyo']['nombre'] + '</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="sistemaApoyo' + i + '" class="' + sesion[1]['apoyo']['id'] + '">-</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<font>' + sesion[1]['apoyo']['precio'] + '&euro;</font>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                }
                if (sesion[1]['iluminacion'] != undefined) {
                    $('#productoCarrito' + i + ' #datos' + i).append('<font>Iluminacion</font>');
                    $('#productoCarrito' + i + ' #datos' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precios' + i).append(
                        '<font id="iluminacionCarr' + i + '" class="' + sesion[1]['iluminacion']['id'] + '">-</font>'
                    );
                    $('#productoCarrito' + i + ' #precios' + i).append('<br>');
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append(
                        '<font>' + sesion[1]['iluminacion']['precio'] + '&euro;</font>'
                    );
                    $('#productoCarrito' + i + ' #precioCalculado' + i).append('<br>');
                }
            }
        }
        this.acabadosPuertasTodos = [];
        this.medidasEspecialesService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                $.each(data['body'], function(index, value) {
                    especiales[index] = value;
                });
            });
        this.especiales = especiales;
        var datos;
        this.acaProdService
            .query({
                size: 1000000,
                sort: this.sort()
            })
            .subscribe(data => {
                datos = data['body'];
                this.acabadosProductos = datos;
                var contador = 1;
                var contnuevo = 1;
                var u = 1;
                var i = 0;
                $.each(datos, function(index, value) {
                    if (value['productosDormitorio']['id'] == 42) {
                        var idAca = value['id'];
                        for (let m = 0; m < value['acabados'].length; m++) {
                            $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                '<img  src="data:image/gif;base64,' +
                                    value['acabados'][m]['imagenFondo'] +
                                    '" id="imagenAcabado' +
                                    i +
                                    '" class="' +
                                    value['acabados'][m]['id'] +
                                    '" height="160px" width="280px" style=" opacity: 0.7;">'
                            );
                            $('#myModalColores' + u + ' .modal-body #acabadoImagen' + i).append(
                                '<strong><p style="color:white;position: absolute;margin-top: -105px;font-size: 30px;margin-left: 80px;">' +
                                    value['acabados'][m]['nombre'] +
                                    '</strong></p>'
                            );

                            i++;
                            $('.cambiarAca' + u).attr('style');
                            $('.cambiarAca' + u).css({ 'margin-bottom': '35px' });
                            $('.cambiarAca' + u).css({ 'margin-top': '15px' });
                            $('.cambiarAca' + u).text('Cambiar Acabado');
                        }

                        $('#acabado1').append(
                            '<p style="margin-left:145px;font-size:25px">Acabado</p><strong class="cambiarAcabado" style="margin-bottom:35px;margin-top:15px" class="cambiarAca1" id="color" data-toggle="modal" data-target="#myModalColores' +
                                u +
                                '">CASCO</strong>'
                        );
                        $('#acabado1').append(
                            '<img id="imagenAcabadoPrincipal1" src"../../../content/images/blanco.jpg" height="60px" border="0" width="200px" style=" opacity: 0.7;margin-left:20px;" data-toggle="modal" data-target="#myModalColores' +
                                u +
                                '" />'
                        );
                        u++;
                        i = 0;
                        contnuevo++;
                    }
                });
            });
        this.valores = [];
        this.tipoPuerta1 = [];
        this.dimensionesProductoTipoService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(data => {
                var contador = 1;
                var cont = 1;
                var cont1 = 1;
                var anchos = [];
                var altura = [];
                var fondo = [];
                altura[1] = '';
                fondo[1] = '';
                var precioInicial = 0;
                var anchosRepetidos = [];
                var ListadoPrecios = [];
                anchos[1] = '';
                $.each(data['body'], function(index, value) {
                    if (value['productosDormitorio']['categoriasDormi']['id'] == 8) {
                        if (jQuery.inArray(value['ancho'], anchos) == -1) {
                            anchos[contador] = value['ancho'];
                            $('#ancho' + contador).text(anchos[contador]);
                            $('#ancho' + contador).css({ border: '1px solid black' });
                            contador++;
                        }
                        if (jQuery.inArray(value['alto'], altura) == -1) {
                            altura[cont] = value['alto'];
                            $('#altura' + cont).text(altura[cont]);
                            $('#altura' + cont).css({ border: '1px solid black' });
                            cont++;
                        }
                        if (jQuery.inArray(value['fondo'], fondo) == -1) {
                            fondo[cont1] = value['fondo'];
                            $('#fondo' + cont1).text(fondo[cont1]);
                            $('#fondo' + cont1).css({ border: '1px solid black' });
                            cont1++;
                        }
                    }
                });
            });
    }
}
