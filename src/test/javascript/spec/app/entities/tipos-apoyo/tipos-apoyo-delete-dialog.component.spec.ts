/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TorgaPedidosTestModule } from '../../../test.module';
import { TiposApoyoDeleteDialogComponent } from 'app/entities/tipos-apoyo/tipos-apoyo-delete-dialog.component';
import { TiposApoyoService } from 'app/entities/tipos-apoyo/tipos-apoyo.service';

describe('Component Tests', () => {
    describe('TiposApoyo Management Delete Component', () => {
        let comp: TiposApoyoDeleteDialogComponent;
        let fixture: ComponentFixture<TiposApoyoDeleteDialogComponent>;
        let service: TiposApoyoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TorgaPedidosTestModule],
                declarations: [TiposApoyoDeleteDialogComponent]
            })
                .overrideTemplate(TiposApoyoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TiposApoyoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TiposApoyoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
