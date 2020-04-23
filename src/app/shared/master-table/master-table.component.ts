import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  TemplateRef,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss']
})
export class MasterTableComponent implements OnInit {
  @Input() tableConfig: any = {};
  @Input() TableActions: TemplateRef<any>;
  @Input() NumberColumn: boolean = false;
  @Input() rows = new MatTableDataSource([]);
  @Input() TableOptions: {};
  // dataSource = new MatTableDataSource<any>();
  // rows = new MatTableDataSource([
  //   {
  //     serialNo: '1',
  //     ability: 'Physical'
  //   },
  //   {
  //     serialNo: '2',
  //     ability: 'Mental'
  //   },
  //   {
  //     serialNo: '3',
  //     ability: 'Goal Keeping'
  //   },
  //   {
  //     serialNo: '4',
  //     ability: 'Technical'
  //   }
  // ]);
  public columns: string[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('nameRef', { static: true }) ElementnameRef: ElementRef;

  constructor() {}

  ngOnInit() {
    this.columns = this.tableConfig.allowedColumns;
    if (this.TableActions) {
      this.columns = this.columns.concat('action');
    }
    // if (this.NumberColumn) {
    //   this.columns = ['sno'].concat(this.columns);
    // }

    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.rows.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rows.sort = this.sort;
  }
}
