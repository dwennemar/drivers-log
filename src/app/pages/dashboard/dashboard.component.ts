import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MilDataService} from '../../services/mil-data/mil-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService, private milService: MilDataService) { }

  ngOnInit() {
  }

  onMileageSubmit(mileage: string) {
    const mil = Number(mileage);
    this.milService.addMilage(mil);
  }
}
