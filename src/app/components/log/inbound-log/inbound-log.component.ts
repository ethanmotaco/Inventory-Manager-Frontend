import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/data/client-service';
import { LogItemElement } from 'src/app/data/models';

@Component({
  selector: 'app-outbound-log',
  templateUrl: './inbound-log.component.html',
  styleUrls: ['./inbound-log.component.css']
})
export class InboundLogComponent implements OnInit, AfterViewInit {
  
  logsDataSource: LogItemElement[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['store', 'product', 'quantity', 'timestamp'];

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
      this.getInboundLogs();
  }

  ngAfterViewInit(): void {
  }

  public getInboundLogs(): void {
    this.clientService.getInboundLogs().subscribe(
      (response: LogItemElement[]) => {
        this.logsDataSource = response.reverse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
