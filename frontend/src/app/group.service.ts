import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupIds: string[] = [];

  getGroupIds(): string[] {
    return this.groupIds;
  }

  setGroupIds(ids: string[]): void {
    this.groupIds = ids;
  }
}
