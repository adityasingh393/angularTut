import { Component } from '@angular/core';
import {
  ColGroupComponent,
  GridModule,
  KENDO_GRID,
} from '@progress/kendo-angular-grid';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ToolbarComponent } from '@progress/kendo-angular-grid';
@Component({
  selector: 'app-kendo-implementation',
  standalone: true,
  imports: [KENDO_GRID],
  templateUrl: './kendo-implementation.component.html',
  styleUrl: './kendo-implementation.component.css',
})
export class KendoImplementationComponent {
  public gridData: any = [
    {
      ProductID: 1,
      ProductName: 'Chai',
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      ProductID: 2,
      ProductName: 'Chai',
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      ProductID: 3,
      ProductName: 'Chai',
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      ProductID: 4,
      ProductName: 'Chai',
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
  ];
}
