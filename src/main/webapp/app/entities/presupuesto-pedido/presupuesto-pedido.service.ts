import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPresupuestoPedido } from 'app/shared/model/presupuesto-pedido.model';

type EntityResponseType = HttpResponse<IPresupuestoPedido>;
type EntityArrayResponseType = HttpResponse<IPresupuestoPedido[]>;

@Injectable({ providedIn: 'root' })
export class PresupuestoPedidoService {
    public resourceUrl = SERVER_API_URL + 'api/presupuesto-pedidos';

    constructor(protected http: HttpClient) {}

    create(presupuestoPedido: IPresupuestoPedido): Observable<EntityResponseType> {
        return this.http.post<IPresupuestoPedido>(this.resourceUrl, presupuestoPedido, { observe: 'response' });
    }

    update(presupuestoPedido: IPresupuestoPedido): Observable<EntityResponseType> {
        return this.http.put<IPresupuestoPedido>(this.resourceUrl, presupuestoPedido, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPresupuestoPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPresupuestoPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
