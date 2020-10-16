import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WindowComponent } from '../window/window.component';
import { Events } from './interfaces';
import { SliderService } from './slider.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  eventData = [];
  currentData: string;
  constructor(
    public service: SliderService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

  /**
   * init Handler
   */
  ngOnInit(): void {
    this.currentData = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.service.fetchSliders(this.currentData).subscribe();
  }

  /**
   * Prepare styles for slider
   * @param event - event on slider
   */
  getSlideStype(event: Events) {
    return {
      height: '100%',
      backgroundImage: `url(https://zapomni.lastick.ru${event.events[0].poster.path})`,
      backgroundSize: 'cover',
    };
  }

  /**
   * Open modal window with addition information
   */
  showMore(header: string, description: string) {
    this.dialog.open(WindowComponent, {
      data: { header, description },
    });
  }
}
