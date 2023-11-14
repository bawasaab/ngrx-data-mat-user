import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map, tap } from 'rxjs';
import { UserEntityService } from '../service/user-entity.service';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'password', 'actions'];
  dataSource = [];
  unsubscribe: Subscription[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public userEntityService: UserEntityService,
    public userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.load()
  }

  load() {

    let loadedObj = this.userEntityService.loaded$.pipe(
      tap(loaded => {
        console.log('loaded', loaded)
        if(!loaded) {
          // load data from api
          let getAllObj = this.userEntityService.getAll().subscribe()
          this.unsubscribe.push(getAllObj)
        } else {
          // load data from store
          let entitiesObj = this.userEntityService.entities$.pipe(
            map((users: any) => {
                console.log('users', users)
                this.dataSource = users
              })
          ).subscribe()
          this.unsubscribe.push(entitiesObj)
        }
      })
    ).subscribe()
    this.unsubscribe.push(loadedObj)
  }

  goToMaster() {
    this.router.navigate(['/users/master'])
  }

  edit(user: any) {
    this.router.navigate([`/users/master/${user.id}`])
  }

  delete(user: any) {
    if(confirm('Are you sure ?')) {
      this.userEntityService.delete(user.id)
      alert('User Deletion Successfull')
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(element => {
      element.unsubscribe()
    });
  }
}
