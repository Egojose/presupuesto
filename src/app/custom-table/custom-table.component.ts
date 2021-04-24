import { Input } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent implements OnInit {

  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
  @Input() actions: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
