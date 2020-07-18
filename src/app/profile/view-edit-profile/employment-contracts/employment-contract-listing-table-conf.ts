import { TableConfig } from '@app/shared/table/TableConfig';
export class EmploymentContractListTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'name',
      'effectiveDate',
      'expiryDate',
      'created_by',
      'status'
    ];

    this.columns = {
      name: {
        code: 'name',
        text: 'Club/Academy',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      effectiveDate: {
        code: 'effectiveDate',
        text: 'Effective Date',
        getValue: (ele: any) => {
          return ele[this.columns.effectiveDate.code];
        }
      },
      expiryDate: {
        code: 'expiryDate',
        text: 'Expiry Date',
        getValue: (ele: any) => {
          return ele[this.columns.expiryDate.code];
        }
      },
      created_by: {
        code: 'created_by',
        text: 'Created By',
        getValue: (ele: any) => {
          return ele[this.columns.created_by.code];
        }
      },
      status: {
        code: 'status',
        text: 'Status',
        getValue: (ele: any) => {
          return ele[this.columns.status.code];
        }
      },
      action: {
        code: 'action',
        text: 'Action',
        getValue: (ele: any) => {
          return ele[this.columns.action.code];
        }
      }
    };
  }
}
