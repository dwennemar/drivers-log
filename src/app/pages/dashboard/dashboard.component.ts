import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {MilDataService} from '../../services/mil-data/mil-data.service';
import {Mileage} from '../../entities/mileage';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: Mileage[] = Array<Mileage>(0);

  constructor(public auth: AuthService, private milService: MilDataService) {
  }

  ngOnInit() {
    this.collect();
  }

  onMileageSubmit(mileage: string) {
    const mil = Number(mileage);
    this.milService.addMilage(mil);
    this.collect();
  }

  async collect() {
    this.data = Array<Mileage>(0);
    await this.milService.getAllData().then(res => {
      res.get().forEach(snapshot => snapshot.forEach(doc => {
        this.data.push(doc.data() as Mileage);
      }));
    });
    this.sort();
  }

  sort() {
    this.data.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  formatDate(date: Date): string {
    return new DatePipe('de-DE').transform(date);
  }
}
