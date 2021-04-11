import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  userId : any;
  topics = [];
  constructor(private route: ActivatedRoute,public userservc:UserService,private spinner:NgxSpinnerService,private toast:ToastrService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.userId = params.userId;
        this.getUserTopics(this.userId);
      }
    );
  }


  getUserTopics(userId){
    this.spinner.show();
   this.userservc.getUserTopics(userId).subscribe((data:any) => {
   this.topics = data;
   this.spinner.hide();
   this.toast.success("Topic Fetch Success !!!");
   }, err => {
    this.spinner.hide();
    this.toast.error("Error fetching Topics !!!");
   })
  }
}
