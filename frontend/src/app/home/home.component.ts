import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userinfo:any;
  disscussionForm: FormGroup;
  allUsersList = [];
  start = 0;
  end = 5;

  constructor(private formbuilder: FormBuilder,public userservc:UserService,private spinner:NgxSpinnerService,private router:Router,private toast:ToastrService) { }

  ngOnInit() {
    this.disscussionForm = this.formbuilder.group({
      topicControl:[null,Validators.compose([Validators.required])],
      discussionControl:[null, Validators.compose([Validators.required])]
    })
    
    this.getCurrentUser();
    const obj = {
      start: this.start,
      end: this.end,
    };
    this.getAllUsers(obj);
  }

  get formControls() { return this.disscussionForm.controls; }

  

  getCurrentUser(){
    this.userinfo = null;
    this.userinfo = JSON.parse(localStorage.getItem('currentUser'));
  }

  nextRecords() {
    if (this.start >= 0 && this.end >= 0) {
      this.start = this.end;
      this.end = this.end + 5;
      const obj = {
        start: this.start,
        end: this.end,
      };
      this.getAllUsers(obj);
    }
  }

  previousRecords() {
    if (this.start >= 0 && this.end >= 0) {
      if (this.start === 0 && this.end === 5) {
      } else {
        this.start = this.start - 5;
        this.end = this.end - 5;
        const obj = {
          start: this.start,
          end: this.end,
        };
        this.getAllUsers(obj);
      }
    }

  }

  getAllUsers(obj){
    this.spinner.show();
    this.allUsersList = [];
    this.userservc.getAllUsers(obj).subscribe((data: any) => {
      this.allUsersList = data && data.length ? data : [];
      this.spinner.hide();
      this.toast.success('Fetched Records Successfully !!!')
    }, err => {
      this.toast.error('Failed to fetch Records !!!');
      this.spinner.hide();
    })
  }

 
  logout(event) {
    event.stopPropagation();
     this.userservc.logout();
     this.userinfo = null;
  }

  createTopic(event){
    event.stopPropagation();
   if(this.disscussionForm.valid){
     this.spinner.show();
    this.userservc.createTopicDesc(this.disscussionForm.value).subscribe((data:any) => {
      if (data && data.message) {
        this.toast.success(data.message);
        this.disscussionForm.reset();
      } else {
        this.toast.error('Failed to add Topic and Discussion !!!');
      }
      this.spinner.hide();
    }, err => {
      this.toast.error('Failed to add Topic and Discussion !!!');
      this.spinner.hide();
    })
   }
  }

  navToTopics(user){
    this.router.navigate(['/topic'], { queryParams: { userId: user._id} });
  }

}
