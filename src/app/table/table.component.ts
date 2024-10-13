import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  dataSource = input.required<any[]>();
  displayedColumns: string[] = ['id', 'title', 'body', 'button'];

  edit(data: any) {
    console.log(data);

  }
}
