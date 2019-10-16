import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, Account, AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { DatosUsuarioService } from '../../entities/datos-usuario/datos-usuario.service';
import * as $ from 'jquery';
import { AcaProdService } from '../../entities/aca-prod/aca-prod.service';
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { DimensionesProductoTipoService } from '../../entities/dimensiones-producto-tipo/dimensiones-producto-tipo.service';
import { InterioresService } from '../../entities/interiores/interiores.service';
import { MedidasEspecialesService } from '../../entities/medidas-especiales/medidas-especiales.service';
import { ProductosDormitorioService } from '../../entities/productos-dormitorio/productos-dormitorio.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    ruta: any;
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    id: any;
    acaProdSer: any;
    version: string;
    closeResult: string;
    account: Account;
    link: string;
    settingsAccount: any;
    contador: any;
    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        protected dimensionesProductoTipoService: DimensionesProductoTipoService,
        private sessionStorage: SessionStorageService,
        protected datosUsuarioService: DatosUsuarioService,
        private accountService: AccountService,
        protected acaProdService: AcaProdService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        protected interioresService: InterioresService,
        protected medidasEspecialesService: MedidasEspecialesService,
        protected jhiAlertService: JhiAlertService,
        private router: Router,
        private modalService: NgbModal,
        protected productosDormitorioService: ProductosDormitorioService,
        private eventManager: JhiEventManager
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngAfterViewInit() {
        setTimeout(function() {
            var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
            if (prueba['logo'] != undefined) {
                this.logo = prueba;
                $('#logoImagen').remove();
                $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
            }
        }, 10);
    }

    open(ruta, bool, content) {
        var prod = $('#calculadoraCarrito #nombreMesita').text();
        if (prod != '') {
            if (bool == false) {
                this.ruta = ruta;
                $('#modalPreguntarSalida').attr('style');
                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
                    result => {
                        this.closeResult = `Closed with: ${result}`;
                    },
                    reason => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    }
                );
            } else {
                this.productosDormitorioService.todos = undefined;
                this.router.navigate(['/' + ruta]);
                this.modalService.dismissAll();
                $('#menuPrincipal').css({ display: 'none' });
                $('#botonEsconder').removeAttr('onclick');
                $('#botonEsconder').attr('onclick', 'apareceMenu()');
            }
        } else {
            this.router.navigate(['/' + ruta]);
            this.productosDormitorioService.todos = undefined;
            $('#menuPrincipal').css({ display: 'none' });
            $('#botonEsconder').removeAttr('onclick');
            $('#botonEsconder').attr('onclick', 'apareceMenu()');
        }
    }

    open1(ruta, bool, content, id) {
        var prod = $('#nombreMesita').text();
        if (prod != '') {
            if (bool == false) {
                this.ruta = ruta;
                this.id = id;
                $('#modalPreguntarSalida').attr('style');
                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
                    result => {
                        this.closeResult = `Closed with: ${result}`;
                    },
                    reason => {
                        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                    }
                );
            } else {
                this.productosDormitorioService.todos = undefined;
                this.cargarProductosCategoria(id, ruta);
                this.modalService.dismissAll();
                $('#menuPrincipal').css({ display: 'none' });
                $('#botonEsconder').removeAttr('onclick');
                $('#botonEsconder').attr('onclick', 'apareceMenu()');
            }
        } else {
            this.productosDormitorioService.todos = undefined;
            this.cargarProductosCategoria(id, ruta);
            $('#menuPrincipal').css({ display: 'none' });
            $('#botonEsconder').removeAttr('onclick');
            $('#botonEsconder').attr('onclick', 'apareceMenu()');
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        var cont = 0;
        this.contador = 0;
        this.datosUsuarioService
            .query({
                size: 10000
            })
            .subscribe(data => {
                for (let i = 0; i < data['body'].length; i++) {
                    if (
                        data['body'][i]['direccion'] == null ||
                        (data['body'][i]['direccion'] == '' && data['body'][i]['codPostal'] == null) ||
                        (data['body'][i]['codPostal'] == '' && data['body'][i]['cif'] == null) ||
                        (data['body'][i]['cif'] == '' && data['body'][i]['nombreFiscal'] == null) ||
                        data['body'][i]['nombreFiscal'] == ''
                    ) {
                        cont++;
                        this.contador = cont;
                        if (this.contador > 0) {
                            $('#contadorDatos').css({ color: 'red' });
                            $('#contadorDatos').css({ 'font-size': '36px' });
                        }
                    }
                }
            });
    }
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
            setTimeout(function() {
                var prueba = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
                if (prueba['logo'] != undefined) {
                    this.logo = prueba;
                    $('#logoImagen').remove();
                    $('.logo-img').append('<img id="logoImagen"  src="data:image/gif;base64,' + prueba['logo'] + '"/>');
                }
            }, 10);
        });
    }

    public cargarProductosCategoria(id, url) {
        this.productosDormitorioService.categoria(id).subscribe(data => {
            this.productosDormitorioService.todos = data.body;
            this.router.navigate(['/' + url + '']);
        });
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    public tarifa() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuComercial').attr('class', 'collapse');
    }

    public comercial() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
    }

    public contacto() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuComercial').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
    }

    public fabricantes() {
        $('#menuComercialTorga').attr('class', 'collapse');
        $('#menuTienda').attr('class', 'collapse');
        $('#menuComercial').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
    }
    public gestionTienda() {
        $('#menuComercial').attr('class', 'collapse');
        $('#menuTarifa').attr('class', 'collapse');
        $('#menuContactoTorga').attr('class', 'collapse');
        $('#menuTarifaTorga').attr('class', 'collapse');
        $('#menuTarifaComedores').attr('class', 'collapse');
        $('#menuTarifaDormitorios').attr('class', 'collapse');
        $('#menuFabricanteTorga').attr('class', 'collapse');
        $('#menuFabricanteTorgaDentro').attr('class', 'collapse');
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
