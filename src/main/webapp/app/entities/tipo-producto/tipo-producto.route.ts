import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoProducto } from 'app/shared/model/tipo-producto.model';
import { TipoProductoService } from './tipo-producto.service';
import { TipoProductoComponent } from './tipo-producto.component';
import { TipoProductoDetailComponent } from './tipo-producto-detail.component';
import { TipoProductoUpdateComponent } from './tipo-producto-update.component';
import { TipoProductoDeletePopupComponent } from './tipo-producto-delete-dialog.component';
import { ITipoProducto } from 'app/shared/model/tipo-producto.model';

@Injectable({ providedIn: 'root' })
export class TipoProductoResolve implements Resolve<ITipoProducto> {
    constructor(private service: TipoProductoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoProducto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoProducto>) => response.ok),
                map((tipoProducto: HttpResponse<TipoProducto>) => tipoProducto.body)
            );
        }
        return of(new TipoProducto());
    }
}

export const tipoProductoRoute: Routes = [
    {
        path: 'tipo-producto',
        component: TipoProductoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'torgaPedidosApp.tipoProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-producto/:id/view',
        component: TipoProductoDetailComponent,
        resolve: {
            tipoProducto: TipoProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tipoProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-producto/new',
        component: TipoProductoUpdateComponent,
        resolve: {
            tipoProducto: TipoProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tipoProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-producto/:id/edit',
        component: TipoProductoUpdateComponent,
        resolve: {
            tipoProducto: TipoProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tipoProducto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoProductoPopupRoute: Routes = [
    {
        path: 'tipo-producto/:id/delete',
        component: TipoProductoDeletePopupComponent,
        resolve: {
            tipoProducto: TipoProductoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'torgaPedidosApp.tipoProducto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
