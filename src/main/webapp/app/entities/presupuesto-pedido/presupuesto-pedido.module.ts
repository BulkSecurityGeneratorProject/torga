import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgaPedidosSharedModule } from 'app/shared';
import { TorgaPedidosAdminModule } from 'app/admin/admin.module';
import {
    PresupuestoPedidoComponent,
    PresupuestoUsuarioComponent,
    PedidosUsuarioComponent,
    PedidosFabricaComponent,
    PedidosProductosComponent,
    PresupuestoPedidoDetailComponent,
    PresupuestoPedidoUpdateComponent,
    PresupuestoPedidoDeletePopupComponent,
    PresupuestoPedidoDeleteDialogComponent,
    PresupuestoProductosComponent,
    PresupuestoEdicionComponent,
    presupuestoPedidoRoute,
    presupuestoPedidoPopupRoute
} from './';

const ENTITY_STATES = [...presupuestoPedidoRoute, ...presupuestoPedidoPopupRoute];

@NgModule({
    imports: [TorgaPedidosSharedModule, TorgaPedidosAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PresupuestoPedidoComponent,
        PresupuestoPedidoDetailComponent,
        PresupuestoPedidoUpdateComponent,
        PresupuestoUsuarioComponent,
        PedidosFabricaComponent,
        PedidosProductosComponent,
        PedidosUsuarioComponent,
        PresupuestoEdicionComponent,
        PresupuestoProductosComponent,
        PresupuestoPedidoDeleteDialogComponent,
        PedidosUsuarioComponent,
        PresupuestoPedidoDeletePopupComponent
    ],
    entryComponents: [
        PresupuestoPedidoComponent,
        PresupuestoUsuarioComponent,
        PedidosUsuarioComponent,
        PedidosFabricaComponent,
        PresupuestoPedidoUpdateComponent,
        PedidosProductosComponent,
        PresupuestoEdicionComponent,
        PresupuestoProductosComponent,
        PresupuestoPedidoDeleteDialogComponent,
        PresupuestoPedidoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgaPedidosPresupuestoPedidoModule {}
