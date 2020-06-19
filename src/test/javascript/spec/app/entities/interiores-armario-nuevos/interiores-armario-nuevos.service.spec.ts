/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { InterioresArmarioNuevosService } from 'app/entities/interiores-armario-nuevos/interiores-armario-nuevos.service';
import { IInterioresArmarioNuevos, InterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';

describe('Service Tests', () => {
    describe('InterioresArmarioNuevos Service', () => {
        let injector: TestBed;
        let service: InterioresArmarioNuevosService;
        let httpMock: HttpTestingController;
        let elemDefault: IInterioresArmarioNuevos;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(InterioresArmarioNuevosService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new InterioresArmarioNuevos(0, 'AAAAAAA', 0, 0, 0, 0, 0, 0, 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a InterioresArmarioNuevos', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new InterioresArmarioNuevos(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a InterioresArmarioNuevos', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        ancho: 1,
                        precio: 1,
                        luz: 1,
                        a: 1,
                        b: 1,
                        c: 1,
                        d: 1,
                        e: 1,
                        piloto: 1
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of InterioresArmarioNuevos', async () => {
                const returnedFromService = Object.assign(
                    {
                        nombre: 'BBBBBB',
                        ancho: 1,
                        precio: 1,
                        luz: 1,
                        a: 1,
                        b: 1,
                        c: 1,
                        d: 1,
                        e: 1,
                        piloto: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a InterioresArmarioNuevos', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
