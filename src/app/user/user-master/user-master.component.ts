import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../service/user-data.service';
import { UserEntityService } from '../service/user-entity.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {

  loginForm!: FormGroup;
  mode: 'create' | 'edit' = 'create'
  userId!: number
  user: any = {}
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userDataService: UserDataService,
    public userEntityService: UserEntityService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id: [],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });

    this.activatedRoute.params.subscribe(params => {
      if(params['id']) {
        this.mode = 'edit'
        this.userId = params['id']
        this.setForm()
      } else {
        this.mode = 'create'
      }
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    if(this.mode == 'create') {
      this.userEntityService.add(this.loginForm.value)
    } else {
      this.userEntityService.update(this.loginForm.value)
    }
    this.router.navigate(['/users/list'])
  }

  setForm() {
    // this.httpClient.get(`http://localhost:3000/users/${this.userId}`).pipe(
    //   tap((res: any) => {
    //     console.log(res)
    //     this.user = res.data.user
    //     if(this.user) {
    //       this.loginForm.patchValue({
    //         id: this.userId,
    //         first_name: this.user.first_name,
    //         last_name: this.user.last_name,
    //         email: this.user.email,
    //         password: this.user.password
    //       })
    //     }
    //   })
    // ).subscribe()
    
    this.userEntityService.getByKey(this.userId)
    .subscribe(res => {
      console.log('res getByKey', res)
    })
  }
}
