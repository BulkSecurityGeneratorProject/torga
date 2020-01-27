import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';

import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';
import { AccountService } from 'app/core';
import { IProductosPresupuestoPedidos } from 'app/shared/model/productos-presupuesto-pedidos.model';
import { AcabadosProductosPresupuestoPedidoService } from '../acabados-productos-presupuesto-pedido/acabados-productos-presupuesto-pedido.service';
import { IluminacionProdPrePedService } from '../iluminacion-prod-pre-ped/iluminacion-prod-pre-ped.service';
import { PagosTiendaService } from '../pagos-tienda/pagos-tienda.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { PresupuestoPedidoService } from './presupuesto-pedido.service';
import { ProductosPresupuestoPedidosService } from '../productos-presupuesto-pedidos/productos-presupuesto-pedidos.service';
import { MedEspProductoPedidoPresuService } from '../med-esp-producto-pedido-presu/med-esp-producto-pedido-presu.service';
import { IPagosTienda } from 'app/shared/model/pagos-tienda.model';
import { ProvinciasService } from '../provincias/provincias.service';
import { MunicipiosService } from '../municipios/municipios.service';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { DatosClienteService } from '../datos-cliente/datos-cliente.service';
import { IDatosCliente } from 'app/shared/model/datos-cliente.model';
import { ContactoFabricaService } from '../contacto-fabrica/contacto-fabrica.service';
import { IAcabadosProductosPresupuestoPedido } from 'app/shared/model/acabados-productos-presupuesto-pedido.model';
import { PresupuestoArmarioService } from '../presupuesto-armario/presupuesto-armario.service';
import { PresupuestoArmarioInterioresService } from '../presupuesto-armario-interiores/presupuesto-armario-interiores.service';
import { PresupuestoArmarioPuertasService } from '../presupuesto-armario-puertas/presupuesto-armario-puertas.service';
import { PrecioTiendaProductosService } from '../precio-tienda-productos/precio-tienda-productos.service';
import { PrecioTiendaService } from '../precio-tienda/precio-tienda.service';
import { PrecioFinalPresuService } from '../precio-final-presu/precio-final-presu.service';

@Component({
    selector: 'jhi-pedidos-productos',
    templateUrl: './pedidos-productos.component.html'
})
export class PedidosProductosComponent implements OnInit, OnDestroy, AfterViewInit {
    currentAccount: any;
    error: any;
    isSaving: boolean;
    success: any;
    presupuestoPedidos: IPresupuestoPedido[];
    eventSubscriber: Subscription;
    productos: any;
    provincias: any;
    municipios: any;
    acabados: any;
    iluminacion: any;
    routeData: any;
    presupuestos = [];
    precioTienda: any;
    links: any;
    totalItems: any;
    queryCount: any;
    account: any;
    itemsPerPage: any;
    idPresu: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    interioresArmario: any;
    armario: any;
    idArmario: any;
    modulosBajos: any;
    precioPunto: any;
    aparadores: any;
    apoyoPrecios: any;
    productosPresupuestoPedidos: any;
    tiendaNombre: any;
    numero: any;
    constructor(
        protected productosPresupuestoPedidosService: ProductosPresupuestoPedidosService,
        public presupuestoArmarioPuertasService: PresupuestoArmarioPuertasService,
        public presupuestoArmarioInterioresService: PresupuestoArmarioInterioresService,
        protected presupuestoPedidoService: PresupuestoPedidoService,
        protected contactoFabricaService: ContactoFabricaService,
        protected iluminacionProdPrePedService: IluminacionProdPrePedService,
        protected parseLinks: JhiParseLinks,
        protected precioTiendaService: PrecioTiendaService,
        protected precioFinalPresuService: PrecioFinalPresuService,
        protected precioTiendaProductosService: PrecioTiendaProductosService,
        protected jhiAlertService: JhiAlertService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected datosClienteService: DatosClienteService,
        protected pagosTiendaService: PagosTiendaService,
        protected presupuestoArmarioService: PresupuestoArmarioService,
        protected acabadosProductosPresupuestoPedidoService: AcabadosProductosPresupuestoPedidoService,
        protected accountService: AccountService,
        protected medEspProductoPedidoPresuService: MedEspProductoPedidoPresuService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    public imprimir() {
        var divToPrint = document.getElementById('imprimir');
        var ventana = window.open('');
        ventana.document.write(
            '<html><head><style type="text/css">#tapa {max-width:250px;max-height:183px} #datosMeter0 {width:50% !important;font-size:12px} #pNombreProd{font-size:18px !important;} #datosMeter1 {width:50% !important;font-size:12px} #datosMeter2 {width:50% !important;font-size:12px} #datosMeter3 {width:50% !important;font-size:12px} .primerDivPresu{margin-top:0px !important; margin-bottom:0px !important;} #imagen0{ width:20% !important; height:183px !important;} #imagen1{ width:20% !important; height:183px !important;} #imagen2{ width:20% !important; height:183px !important;} #imagen3{ width:20% !important; height:183px !important;} #hrUltimo{ display: none} #logoPresu{max-width: 60px !important;position: absolute !important;margin-top: 100px !important;margin-left: 110px !important;} #idLineaDiv{float:right !important; width:45% !important; margin-right:50px !important; } #bajarFontSize{font-size:15px !important;} #totalDescuentoTexto{font-size:15px !important;} #euro{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #ivaPrecioQuitar{font-size:15px !important;} #bajarFontSize{font-size:15px !important;} #precioIvaSumado{font-size:15px !important;} #rightImprimir{float:right !important; margin-right:-100px !important; right:0; text-align:right; width:80% !important;} .pietrasin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(125%);} .norwaysin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .broncesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .transparentesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;} .nocesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .naturesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .tabaksin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .kobesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .blancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .beigesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(140%);} .lattesin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .grafenosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(150%);} .lagosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .maresin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(130%);} .marmolblancosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .marmolnegrosin {position: absolute;max-width: 400px;max-height: 592.75px;margin-left: -400px;filter: brightness(190%);} .norway {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .bronce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .transparente {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;} .noce {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .nature {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .tabak {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .kobe {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .blanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .beige {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(140%);} .latte {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .grafeno {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(150%);} .lago {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .mare {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(130%);} .marmolblanco {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);} .marmolnegro {position: absolute;max-width: 650px;max-height: 433px;margin-left: -650px;filter: brightness(190%);}</style><title>' +
                document.title +
                '</title>'
        );
        ventana.document.write('</head><body style="font-family: Lato , sans-serif;font-weight: 400;">');
        ventana.document.write(divToPrint.innerHTML);
        ventana.document.write('</body></html>');

        ventana.document.close();
        ventana.focus();
        ventana.print();
        return true;
    }

    public eliminar() {
        var id = parseFloat(sessionStorage.getItem('presupuesto'));
        this.presupuestoPedidoService.delete(id).subscribe();
        var actualizar;
        var todosPresupuestos = this.presupuestos;
        for (let i = 0; i < todosPresupuestos.length; i++) {
            if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                    actualizar = todosPresupuestos[i];
                    this.productosPresupuestoPedidosService.delete(actualizar['id']).subscribe();
                }
            }
        }
    }
    public mostrarPrecioFabrica() {
        var productos = this.productos;
        for (let i = 0; i < productos.length; i++) {
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).removeAttr('style');
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).attr('style');
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).css({ float: 'right' });
            $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).css({ 'margin-right': '10%' });
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).removeAttr('style');
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).attr('style');
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).css({ float: 'right' });
            $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).css({ 'margin-right': '20%' });
        }
    }

    public pedido() {
        var actualizar;
        var todosPresupuestos = this.productosPresupuestoPedidosService.todos;
        var actualizar = todosPresupuestos[0];
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

        actualizar['presupuestoPedido']['pedido'] = 1;
        actualizar['presupuestoPedido']['fecha_pedido'] = output;
        var presupuestoActualizado = actualizar['presupuestoPedido'];
        console.log(actualizar);
        console.log(presupuestoActualizado);

        this.subscribeToSaveResponse(this.presupuestoPedidoService.update(presupuestoActualizado));
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuestoPedido>>) {
        result.subscribe((res: HttpResponse<IPresupuestoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected subscribeToSaveResponse1(result: Observable<HttpResponse<IProductosPresupuestoPedidos>>) {
        result.subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    ngAfterViewInit() {}
    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }
    previousState() {
        window.history.back();
    }
    protected onSaveError() {
        this.isSaving = false;
    }
    protected subscribeToSaveResponse3(result: Observable<HttpResponse<IDatosCliente>>) {
        result.subscribe((res: HttpResponse<IDatosCliente>) => this.onSaveSuccess3(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected onSaveSuccess3() {
        this.isSaving = false;
    }

    loadAll() {
        var medidasEspeciales = [];
        this.medEspProductoPedidoPresuService
            .query({
                size: 10000000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    medidasEspeciales[i] = data['body'][i];
                }
            });

        var productosPresupuesto = [];
        var acabados1 = [];
        var precioTienda = this.precioTienda;
        var cont = 0;
        var presu;
        var todaTienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.tiendaNombre = todaTienda['nombreComercial'];
        this.numero = todaTienda['telefono'];
        presu = sessionStorage.getItem('presupuesto');

        var ilu = [];

        this.iluminacionProdPrePedService
            .query({
                size: 1000000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    ilu[i] = data['body'][i];
                }
            });
        this.iluminacion = ilu;
        var acabados = [];
        var todosInteriores;
        var iluminacion = this.iluminacion;
        this.productosPresupuestoPedidosService.query1(parseFloat(presu)).subscribe(
            (res: HttpResponse<IProductosPresupuestoPedidos[]>) => {
                for (let i = 0; i < res.body.length; i++) {
                    if (res.body[i]['presupuestoPedido'] != null) {
                        if (parseFloat(presu) == res.body[i]['presupuestoPedido']['id']) {
                            if (res.body[i]['productosDormitorio']['categoriasDormi']['id'] == 9) {
                                console.log(cont);
                                this.presupuestoArmarioService.findBus(presu).subscribe(data => {
                                    var idCat = 9;
                                    var cat = {
                                        id: idCat
                                    };

                                    var uno = {
                                        nombre: data.body[0]['armario']['mensaje'],
                                        categoriasDormi: cat
                                    };
                                    var codigo = {
                                        codigo: data.body[0]['productosPresupuestoPedidos']['presupuestoPedido']['codigo'],
                                        fecha_presupuesto:
                                            data.body[0]['productosPresupuestoPedidos']['presupuestoPedido']['fecha_presupuesto']
                                    };
                                    var dimen = {
                                        incremento: undefined,
                                        ancho: data.body[0]['ancho'],
                                        alto: data.body[0]['alto'],
                                        fondo: data.body[0]['fondo']
                                    };
                                    var todo = {
                                        productosDormitorio: uno,
                                        presupuestoPedido: codigo,
                                        dimensionesProductoTipo: dimen
                                    };

                                    productosPresupuesto[cont] = todo;
                                    cont++;

                                    this.presupuestoArmarioInterioresService.busqueda(data.body[0]['id']).subscribe(data => {
                                        this.presupuestoArmarioInterioresService.todos = data.body;
                                        var datosInteriores = data.body;
                                        console.log(data.body);
                                        var nombre = data.body[0]['presupuestoArmario']['armario']['mensaje'];
                                        for (let p = 0; p < datosInteriores.length; p++) {
                                            if (p == 0) {
                                                $('#datosMeter' + (cont - 1)).append(
                                                    '<p><strong>Casco &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>+ ' +
                                                        datosInteriores[p]['presupuestoArmario']['cascoPrecio'] +
                                                        ' €</span></p>'
                                                );
                                            }
                                            $('#datosMeter' + (cont - 1)).append(
                                                '<p><strong>Interior ' +
                                                    datosInteriores[p]['productosDormitorio']['nombre'] +
                                                    '&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>+ ' +
                                                    datosInteriores[p]['precio'] +
                                                    ' €</span></p>'
                                            );
                                        }
                                        var casco = data.body[0]['presupuestoArmario']['acabadosCasco']['nombre'].toLowerCase();
                                        var trasera = data.body[0]['presupuestoArmario']['acabados']['nombre'].toLowerCase();
                                        var interiorAca = data.body[0]['presupuestoArmario']['acabadosInterior']['nombre'].toLowerCase();
                                        if ('3 PUERTAS IZQUIERDA' == nombre) {
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:-19px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:296px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                        }
                                        if ('5 PUERTAS IZQUIERDA' == nombre) {
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top:-44px;z-index:98" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top: 271px;z-index:98" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top:-44px;z-index:98" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top: 271px;z-index:98" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:-19px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:296px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:212px;margin-top:-44px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:212px;margin-top:271px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                        }
                                        if ('6 PUERTAS ASIMETRICAS' == nombre) {
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top:-44px;z-index:98" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top: 271px;z-index:98" src="../../../content/images/ar/grande/1. CASCO MADERA/grande_casco_' +
                                                    casco +
                                                    '.png">'
                                            );

                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top:-19px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top:-44px;z-index:98" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:91px;margin-top: 296px;z-index:99" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;margin-left:212px;margin-top: 271px;z-index:98" src="../../../content/images/ar/grande/2. TRASERA/grande_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: -63px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: -63px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: 253px;" src="../../../content/images/ar/peque/1. CASCO/peque_casco_' +
                                                    casco +
                                                    '.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:97;margin-left: 302px;margin-top: 253px;" src="../../../content/images/ar/peque/2. TRASERA/peque_trasera_' +
                                                    trasera +
                                                    '.png">'
                                            );

                                            var nombreInt = datosInteriores[0]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-top:315px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );

                                            var nombreInt = datosInteriores[1]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:-19px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:91px;margin-top:296px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );

                                            var nombreInt = datosInteriores[2]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:212px;margin-top:-44px;" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:212px;margin-top:271px" src="../../../content/images/ar/grande/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/grande_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            var nombreInt = datosInteriores[3]['productosDormitorio']['nombre'];
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:302px;margin-top:-63px;" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                            $('#imagen' + (cont - 1)).append(
                                                '<img style="max-width: 150px;position: absolute;z-index:100;margin-left:302px;margin-top:253px" src="../../../content/images/ar/peque/3. INTERIORES/' +
                                                    nombreInt +
                                                    '/peque_interior_' +
                                                    nombreInt +
                                                    '_' +
                                                    interiorAca +
                                                    '_optimized.png">'
                                            );
                                        }
                                        $('#imagen' + (cont - 1)).css({ height: '650px' });
                                    });
                                    this.presupuestoArmarioPuertasService.busqueda(data.body[0]['id']).subscribe(data => {
                                        this.presupuestoArmarioPuertasService.todos = data.body;
                                        var datosInteriores = data.body;
                                        console.log(data.body);
                                        var nombre = data.body[0]['presupuestoArmario']['armario']['mensaje'];
                                        for (let p = 0; p < datosInteriores.length; p++) {
                                            $('#datosMeter' + (cont - 1)).append(
                                                '<p><strong>Puerta ' +
                                                    (p + 1) +
                                                    ' ' +
                                                    datosInteriores[p]['productosDormitorio']['nombre'] +
                                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><span>+ ' +
                                                    datosInteriores[p]['precio'] +
                                                    ' €</span></p>'
                                            );
                                        }
                                        if ('3 PUERTAS IZQUIERDA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            var acabado = data.body[0]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top:315px" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];
                                            var acabado = data.body[1]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[1]['productosDormitorio']['nombre'];
                                            var acabado = data.body[1]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                        }
                                        if ('5 PUERTAS IZQUIERDA' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            var acabado = data.body[0]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top:315px" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];
                                            var acabado = data.body[1]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[2]['productosDormitorio']['nombre'];
                                            var acabado = data.body[2]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];
                                            var acabado = data.body[3]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 272px;margin-left: 213px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[4]['productosDormitorio']['nombre'];
                                            var acabado = data.body[4]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 272px;margin-left: 213px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                        }

                                        if ('6 PUERTAS ASIMETRICAS' == nombre) {
                                            var tipo = data.body[0]['productosDormitorio']['nombre'];
                                            var acabado = data.body[0]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top:315px" src="../../../content/images/ar/peque/4. PUERTA MADERA/peque_puertamadera_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }

                                            var tipo = data.body[1]['productosDormitorio']['nombre'];
                                            var acabado = data.body[1]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[2]['productosDormitorio']['nombre'];
                                            var acabado = data.body[2]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 297px;margin-left: 92px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }

                                            var tipo = data.body[3]['productosDormitorio']['nombre'];
                                            var acabado = data.body[3]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 272px;margin-left: 213px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[4]['productosDormitorio']['nombre'];
                                            var acabado = data.body[4]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 272px;margin-left: 213px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/DERECHA/grande_puertamadera_derecha_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                            var tipo = data.body[5]['productosDormitorio']['nombre'];
                                            var acabado = data.body[3]['acabados']['nombre'].toLowerCase();
                                            if (tipo == 'Puerta Madera') {
                                                $('#imagen' + (cont - 1)).append(
                                                    '<img style="max-width: 150px;position: absolute;z-index:101;margin-top: 247px;margin-left: 333px;" src="../../../content/images/ar/grande/4. PUERTAS MADERA/IZQUIERDA/grande_puertamadera_izquierda_' +
                                                        acabado +
                                                        '_optimized.png">'
                                                );
                                            }
                                        }
                                    });
                                });
                            } else {
                                if (res.body[i]['dimensionesProductoTipo']['mensaje'] == 'Medidas Especiales') {
                                    for (let k = 0; k < medidasEspeciales.length; k++) {
                                        if (medidasEspeciales[k]['productosPresupuestoPedidos']['id'] == res.body[i]['id']) {
                                            res.body[i]['dimensionesProductoTipo']['ancho'] = medidasEspeciales[k]['ancho'];
                                            res.body[i]['dimensionesProductoTipo']['alto'] = medidasEspeciales[k]['alto'];
                                            res.body[i]['dimensionesProductoTipo']['fondo'] = medidasEspeciales[k]['fondo'];
                                            res.body[i]['dimensionesProductoTipo']['precio'] = medidasEspeciales[k]['precio'];
                                            var precioEspecial = parseFloat(medidasEspeciales[k]['precio']);
                                            var menosPrecio = precioEspecial * 0.3;
                                            menosPrecio = precioEspecial - menosPrecio;
                                            var incremento = menosPrecio * 0.3;
                                            res.body[i]['dimensionesProductoTipo']['incremento'] = incremento.toFixed(2);
                                            productosPresupuesto[cont] = res.body[i];
                                            cont++;
                                        }
                                    }
                                } else {
                                    productosPresupuesto[cont] = res.body[i];
                                    cont++;
                                }
                            }
                        }
                    }
                }
                this.productosPresupuestoPedidos = productosPresupuesto;

                this.productos = productosPresupuesto;
                this.interioresArmario = todosInteriores;
                console.log(this.interioresArmario);
                console.log(this.productos);
                var precioModulosBajos = this.modulosBajos;
                var productos = this.productos;
                var precioPunto = this.precioPunto;
                var apoyoPrecios = this.apoyoPrecios;
                var precioAparadores = this.aparadores;
                for (let w = 0; w < productos.length; w++) {
                    if (productos[w]['productosDormitorio']['categoriasDormi']['id'] != 9) {
                        var datosPrecioFinal;
                        this.precioFinalPresuService.query12(presu).subscribe(data => {
                            datosPrecioFinal = data.body;
                        });
                        this.acabadosProductosPresupuestoPedidoService
                            .query1(productos[w]['id'])
                            .subscribe((res: HttpResponse<IAcabadosProductosPresupuestoPedido[]>) => {
                                for (let i = 0; i < res.body.length; i++) {
                                    acabados[i] = res.body[i];
                                }
                                console.log(res.body);
                                var apoyo;
                                setTimeout(function() {
                                    if (productos != undefined) {
                                        for (let i = 0; i < productos.length; i++) {
                                            var contador = 1;
                                            apoyo = undefined;
                                            for (let k = 0; k < acabados.length; k++) {
                                                if (productos[i]['id'] == acabados[k]['productosPresupuestoPedidos']['id']) {
                                                    $('.' + productos[i]['id'] + 'Datos').append(
                                                        '<p >Acabado ' +
                                                            contador +
                                                            '&nbsp;&nbsp;&nbsp; <span class="acabado' +
                                                            contador +
                                                            '">' +
                                                            acabados[k]['acabados']['nombre'] +
                                                            '</span></p>'
                                                    );
                                                    var prodNombre =
                                                        acabados[k]['productosPresupuestoPedidos']['productosDormitorio']['nombre'];
                                                    if (prodNombre == 'Modulo Bajo 1') {
                                                        prodNombre = 'mb1';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 2') {
                                                        prodNombre = 'mb2';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 3') {
                                                        prodNombre = 'mb4';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 4 Apertura Izquierda') {
                                                        prodNombre = 'mb6';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 4 Apertura Derecha') {
                                                        prodNombre = 'mb5';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 5 Apertura Izquierda') {
                                                        prodNombre = 'mb8';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 5 Apertura Derecha') {
                                                        prodNombre = 'mb7';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 6') {
                                                        prodNombre = 'mb9';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 7 Apertura Izquierda') {
                                                        prodNombre = 'mb11';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 7 Apertura Derecha') {
                                                        prodNombre = 'mb10';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 8 Apertura Izquierda') {
                                                        prodNombre = 'mb13';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 8 Apertura Derecha') {
                                                        prodNombre = 'mb12';
                                                    }
                                                    if (prodNombre == 'Modulo Bajo 9') {
                                                        prodNombre = 'mb14';
                                                    }
                                                    if (prodNombre == 'Aparador 2') {
                                                        prodNombre = 'ap2';
                                                    }

                                                    if (prodNombre == 'Aparador 3') {
                                                        prodNombre = 'ap3';
                                                    }
                                                    if (prodNombre == 'Aparador 4') {
                                                        prodNombre = 'ap4';
                                                    }
                                                    if (prodNombre == 'Aparador 5') {
                                                        prodNombre = 'ap5';
                                                    }
                                                    if (prodNombre == 'Aparador 6') {
                                                        prodNombre = 'ap6';
                                                    }
                                                    if (prodNombre == 'Aparador 7') {
                                                        prodNombre = 'ap7';
                                                    }
                                                    if (prodNombre == 'Aparador 8') {
                                                        prodNombre = 'ap8';
                                                    }
                                                    if (prodNombre == 'Aparador 9') {
                                                        prodNombre = 'ap9';
                                                    }
                                                    if (prodNombre == 'Aparador 10') {
                                                        prodNombre = 'ap10';
                                                    }
                                                    var nombreAcabado = acabados[k]['acabados']['nombre'].toLowerCase();
                                                    if (nombreAcabado == 'marmol blanco') {
                                                        nombreAcabado = 'marmolblanco';
                                                    }
                                                    if (nombreAcabado == 'marmol negro') {
                                                        nombreAcabado = 'marmolnegro';
                                                    }

                                                    if (nombreAcabado == 'cristal bronce') {
                                                        var aca1Nombre = $('.' + productos[i]['id'] + 'Datos .acabado1')
                                                            .text()
                                                            .toLowerCase();
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                ' BRONCE/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                aca1Nombre +
                                                                '_bronce_optimized.png">'
                                                        );
                                                    }
                                                    if (nombreAcabado == 'cristal transparente') {
                                                        var aca1Nombre = $('.' + productos[i]['id'] + 'Datos .acabado1')
                                                            .text()
                                                            .toLowerCase();
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                ' TRANSPARENTE/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                aca1Nombre +
                                                                '_transparente_optimized.png">'
                                                        );
                                                    }
                                                    if (nombreAcabado != 'cristal transparente' && nombreAcabado != 'cristal bronce') {
                                                        $('#imagen' + i).append(
                                                            '<img id="tapa" class="' +
                                                                nombreAcabado +
                                                                '" width="500px" height="333px" style="position: absolute;margin-top: 5px;margin-left:0px" src="../../../content/images/' +
                                                                prodNombre +
                                                                '/' +
                                                                contador +
                                                                '/' +
                                                                prodNombre +
                                                                '_' +
                                                                contador +
                                                                '_' +
                                                                nombreAcabado +
                                                                '_optimized.png">'
                                                        );
                                                    }

                                                    if (
                                                        contador == 1 &&
                                                        acabados[k]['productosPresupuestoPedidos']['tiposApoyo'] != undefined
                                                    ) {
                                                        apoyo = acabados[k];
                                                    }

                                                    contador++;
                                                }
                                            }
                                            if (apoyo != undefined) {
                                                $('.' + productos[i]['id'] + 'Datos').append(
                                                    '<p>' +
                                                        apoyo['productosPresupuestoPedidos']['tiposApoyo']['productoApoyo']['nombre'] +
                                                        '&nbsp;&nbsp;&nbsp; <span id="precioApoyo' +
                                                        i +
                                                        '"></span>&euro;</p>'
                                                );
                                            }
                                            var precios = datosPrecioFinal[0]['precioProds'];
                                            var precioTodo = precios.split(',');
                                            for (let i = 0; i < precioTodo.length; i++) {
                                                if (precioTodo[i] != '') {
                                                    var precio1 = precioTodo[i].split('-')[0];
                                                    var precio2 = precioTodo[i].split('-')[1];
                                                    precio1 = precio1.split(':')[1];
                                                    $('#precioTotal' + i).text(precio1);
                                                    $('#precioApoyo' + i).text(precio2);
                                                }
                                            }

                                            $('#totalDescuentoTexto').text(datosPrecioFinal[0]['totalSinIva']);
                                            $('#ivaQuitar').text(datosPrecioFinal[0]['iva'] + ' €');
                                            $('#precioCalculadoIva').append(
                                                '<p style="font-size:25px">' + datosPrecioFinal[0]['totalConIva'] + ' €</p>'
                                            );
                                            var descuento = datosPrecioFinal[0]['descuentoPorcentaje'];
                                            if (descuento != null) {
                                                $('#todoDivDescuento').css({ display: 'block' });
                                                $('#totalDescuentoTexto').text(descuento + ' %');
                                                $('#meterQuitadoDescuento').text(datosPrecioFinal[0]['precioDescuento'] + ' €');
                                            }
                                            for (let j = 0; j < iluminacion.length; j++) {
                                                if (iluminacion[j]['productosPresupuestoPedidos']['id'] == productos[i]['id']) {
                                                    $('.' + productos[i]['id'] + 'Datos').append(
                                                        '<p>Iluminacion&nbsp;&nbsp;&nbsp;' +
                                                            iluminacion[j]['iluminacion']['precio'] +
                                                            '&euro;</p>'
                                                    );
                                                    var precioTotal = $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text();
                                                    var fabrica;
                                                    fabrica = $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).text();
                                                    var ganancias;
                                                    ganancias = $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).text();
                                                    var precioFloat = 0;
                                                    precioFloat = parseFloat(precioTotal);
                                                    fabrica = parseFloat(fabrica);
                                                    ganancias = parseFloat(fabrica);
                                                    precioFloat = precioFloat + iluminacion[j]['iluminacion']['precio'];
                                                    fabrica = fabrica + iluminacion[j]['iluminacion']['precio'] / 2;
                                                    ganancias = ganancias + iluminacion[j]['iluminacion']['precio'] / 2;
                                                    var subTotal = parseFloat($('#precioSubtotal').text());
                                                    if (subTotal == 0) {
                                                        subTotal = precioFloat;
                                                    }

                                                    $('#precioSubtotal').text(precioFloat.toFixed(2));
                                                    var iva = precioFloat * 0.21;
                                                    $('#ivaPrecioQuitar').remove();
                                                    $('#ivaQuitar').append(
                                                        '<p id="ivaPrecioQuitar" style="font-size:25px">' + iva.toFixed(2) + '</p>'
                                                    );
                                                    iva = precioFloat + iva;
                                                    $('#precioIvaSumado').remove();
                                                    $('#precioCalculadoIva').append(
                                                        '<p id="precioIvaSumado" style="font-size:25px">' + iva.toFixed(2) + '</p>'
                                                    );
                                                    $('#totalDescuentoTexto').text(precioFloat);
                                                    $('.' + productos[i]['id'] + 'Datos #precioTotal' + i).text(precioFloat.toFixed(2));
                                                    $('.' + productos[i]['id'] + 'Datos #precioFabrica' + i).text(fabrica.toFixed(2));
                                                    $('.' + productos[i]['id'] + 'Datos #precioGanancias' + i).text(ganancias.toFixed(2));
                                                }
                                            }
                                        }
                                    }
                                }, 0);
                            });
                    }
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.datosClienteService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IDatosCliente[]>) => {
                    for (let m = 0; m < res.body.length; m++) {
                        if (res.body[m]['presupuestoPedido']['id'] == presu) {
                            $('#nombre').val(res.body[m]['nombre']);
                            $('#correo').val(res.body[m]['correo']);
                            $('#telefono').val(res.body[m]['telefono']);
                            $('#provincia').val(res.body[m]['provincias']['nombre']);
                            $('#municipios').val(res.body[m]['municipios']['nombre']);
                            $('#direccion').val(res.body[m]['direccion']);
                            $('#codPostal').val(res.body[m]['codigoPostal']);
                            $('#enviar').val(res.body[m]['fines']);
                            $('#mandar').val(res.body[m]['enviar']);
                            $('#nombre').css({ 'background-color': '#D7D9DA' });
                            $('#correo').css({ 'background-color': '#D7D9DA' });
                            $('#telefono').css({ 'background-color': '#D7D9DA' });
                            $('#provincia').css({ 'background-color': '#D7D9DA' });
                            $('#municipios').css({ 'background-color': '#D7D9DA' });
                            $('#direccion').css({ 'background-color': '#D7D9DA' });
                            $('#codPostal').css({ 'background-color': '#D7D9DA' });
                            $('#enviar').css({ 'background-color': '#D7D9DA' });
                            $('#mandar').css({ 'background-color': '#D7D9DA' });
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/productos-presupuesto-pedidos'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    public contactoPresupuesto() {
        var pedido = this.productos[0]['presupuestoPedido'];
        var usuario = this.currentAccount;
        $('#modal #relacion').val('Presupuestos');
        if (usuario['id'] == pedido['user']['id'] && pedido['pedido'] == 0) {
            $('#relacionCodigo').val(pedido['id']);
        }
    }
    public crearChat() {
        var pedido;
        pedido = this.productos[0]['presupuestoPedido'];
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output;
        output = d.getFullYear() + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
        var numero;
        numero = 1;
        const contacto = {
            fechaInicio: output,
            tipo: numero,
            codigo: pedido['id'],
            user: this.currentAccount,
            presupuestoPedido: pedido
        };

        this.subscribeToSaveResponse2(this.contactoFabricaService.create(contacto));
    }

    public modificarDatos() {
        var id;
        var nombre;
        var correo;
        var telefono;
        var provinciaCoger;
        var municipioCoger;
        var provinciaBuena;
        var municipioBueno;
        var direccion;
        var provincias = this.provincias;
        var municipios = this.municipios;
        var todosPresupuestos = this.productosPresupuestoPedidos;
        var codPostal;
        var pres;
        var enviar;
        var mandar;
        id = $('#nombre').attr('class');
        if (id == 'id') {
            nombre = $('#nombre').val();
            correo = $('#correo').val();
            telefono = $('#telefono').val();
            provinciaCoger = $('#provincia').val();
            municipioCoger = $('#municipios').val();
            direccion = $('#direccion').val();
            codPostal = $('#codPostal').val();
            enviar = $('#enviar').val();
            mandar = $('#mandar').val();
            for (let i = 0; i < provincias.length; i++) {
                if (provincias[i]['id'] == provinciaCoger) {
                    provinciaBuena = provincias[i];
                }
            }

            for (let k = 0; k < municipios.length; k++) {
                if (municipios[k]['id'] == municipioCoger) {
                    municipioBueno = municipios[k];
                }
            }

            for (let i = 0; i < todosPresupuestos.length; i++) {
                if (todosPresupuestos[i]['presupuestoPedido'] != null) {
                    if (todosPresupuestos[i]['presupuestoPedido']['id'] == sessionStorage.getItem('presupuesto')) {
                        pres = todosPresupuestos[i]['presupuestoPedido'];
                    }
                }
            }
            const datos = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                direccion: direccion,
                codigoPostal: codPostal,
                fines: enviar,
                enviar: mandar,
                provincias: provinciaBuena,
                municipios: municipioBueno,
                presupuestoPedido: pres
            };
            this.subscribeToSaveResponse3(this.datosClienteService.create(datos));
            $('#nombre').css({ 'background-color': '#D7D9DA' });
            $('#correo').css({ 'background-color': '#D7D9DA' });
            $('#telefono').css({ 'background-color': '#D7D9DA' });
            $('#provincia').css({ 'background-color': '#D7D9DA' });
            $('#municipios').css({ 'background-color': '#D7D9DA' });
            $('#direccion').css({ 'background-color': '#D7D9DA' });
            $('#codPostal').css({ 'background-color': '#D7D9DA' });
            $('#enviar').css({ 'background-color': '#D7D9DA' });
            $('#mandar').css({ 'background-color': '#D7D9DA' });
        } else {
            nombre = $('#nombre').val();
            correo = $('#correo').val();
            telefono = $('#telefono').val();
            provincias = $('#provincia').val();
            municipios = $('#municipio').val();
            direccion = $('#direccion').val();
            codPostal = $('#codPostal').val();
            enviar = $('#enviar').val();
            mandar = $('#mandar').val();
        }
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/productos-presupuesto-pedidos',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.precioTiendaProductosService.findProdId(8, tienda.id).subscribe(data => {
            this.modulosBajos = data.body;
        });
        this.precioTiendaService.findBus(tienda.id).subscribe(data => {
            this.precioPunto = data.body;
        });
        this.precioTiendaProductosService.findProdId(11, tienda.id).subscribe(data => {
            this.aparadores = data.body;
        });
        this.precioTiendaProductosService.findProdId(2, tienda.id).subscribe(data => {
            this.apoyoPrecios = data.body;
        });
        this.presupuestoArmarioInterioresService.todos = undefined;
        this.precioTienda = sessionStorage.getItem('precioTienda');
        $('body').removeAttr('class');
        var presupuestos = [];
        var saber = 0;
        var acabados = [];
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProductosPresupuestoPedidos();
        var idPresu;
        idPresu = sessionStorage.getItem('presupuesto');
        this.idPresu = idPresu;
        this.contactoFabricaService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i] != undefined) {
                            if (res.body[i]['user']['id'] == this.currentAccount['id']) {
                                if (res.body[i]['presupuestoPedido'] != null) {
                                    if (res.body[i]['presupuestoPedido']['id'] == parseFloat(idPresu)) {
                                        saber = 1;
                                    }
                                }
                            }
                        }
                    }
                    if (saber == 1) {
                        $('#contacto1').remove();
                    } else {
                        $('#contacto2').remove();
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        var municipios = [];
        var provincias = [];
        this.accountService.identity().then(account => {
            this.account = account;
        });

        this.municipiosService.query1({}).subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                municipios[i] = data['body'][i];
            }
        });
        this.municipios = municipios;

        this.provinciasService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    provincias[i] = data['body'][i];
                }
            });
        this.provincias = provincias;

        this.productosPresupuestoPedidosService.query1(idPresu).subscribe(data => {
            this.productosPresupuestoPedidosService.todos = data.body;
        });

        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        this.pagosTiendaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    $('#pago').html('<form><select style="width:150px;height:50px" class="tipoPago"><option></option></select></form>');
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['datosUsuario']['id'] == tienda['id']) {
                            $('.tipoPago').append('<option value="' + res.body[i]['id'] + '">' + res.body[i]['pago'] + '</option>');
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    public cargarMunicipios() {
        var idProv = $('#provincia').val();
        $('#municipios').empty();
        $('#municipios').append('<option></option>');
        this.municipiosService.query1({}).subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                if (data['body'][i]['provincias']['id'] == idProv) {
                    $('#municipios').append('<option value="' + data['body'][i]['id'] + '">' + data['body'][i]['nombre'] + '</option>');
                }
            }
        });
    }

    public provinciasCargar() {
        this.provinciasService
            .query({
                size: 100000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    $('#provincia').append('<option value="' + data['body'][i]['id'] + '">' + data['body'][i]['nombre'] + '</option>');
                }
            });
    }
    public descuento() {
        var valor;
        var precioNormal = parseFloat($('#precioSubtotal').text());
        valor = $('#descuentoPago').val();
        valor = parseFloat(valor);
        valor = valor / 100;
        var cuenta = precioNormal * valor;
        $('#cuentatextodivDescuento').css({ display: 'block' });
        $('#meterQuitadoDescuento').text(cuenta.toFixed(2));
        cuenta = precioNormal - cuenta;
        var iva = cuenta * 0.21;
        $('#ivaPrecioQuitar').text(iva.toFixed(2) + ' €');
        var todo = iva + cuenta;
        $('#precioIvaSumado').text(todo.toFixed(2) + ' €');
    }

    public pago() {
        var id = $('.tipoPago').val();

        this.pagosTiendaService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IPagosTienda[]>) => {
                    for (let i = 0; i < res.body.length; i++) {
                        if (res.body[i]['id'] == id) {
                            var arr = res.body[i]['descuento'].split('%');
                            console.log(arr);
                            $('#descuentoPago').attr('max', arr[0]);
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductosPresupuestoPedidos) {
        return item.id;
    }

    registerChangeInProductosPresupuestoPedidos() {
        this.eventSubscriber = this.eventManager.subscribe('productosPresupuestoPedidosListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateProductosPresupuestoPedidos(data: IProductosPresupuestoPedidos[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.productosPresupuestoPedidos = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    protected subscribeToSaveResponse2(result: Observable<HttpResponse<IContactoFabrica>>) {
        result.subscribe((res: HttpResponse<IContactoFabrica>) => this.onSaveSuccess2(), (res: HttpErrorResponse) => this.onSaveError2());
    }

    public onSaveSuccess2() {
        this.isSaving = false;
        var ultimo;
        this.contactoFabricaService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IContactoFabrica[]>) => {
                    ultimo = res.body.length;
                    ultimo = ultimo - 1;
                    this.router.navigate(['/contacto-fabrica', res.body[ultimo]['id'], 'chat']);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    protected onSaveError2() {
        this.isSaving = false;
    }
}
