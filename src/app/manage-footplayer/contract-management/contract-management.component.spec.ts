import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagementComponent } from './contract-management.component';

describe('ContractManagementComponent', () => {
  let component: ContractManagementComponent;
  let fixture: ComponentFixture<ContractManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractManagementComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
