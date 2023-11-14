import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserEntityService extends EntityCollectionServiceBase<UserModel>{

  constructor(
    private serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('User', serviceElementsFactory);
  }
}
