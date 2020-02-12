import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiTypesService {

  constructor() { }
}

export enum UserRoles {
  'Super Admin' = 1,
  'Admin' = 2,
  'Account Director' = 3,
  'Account Manager' = 4,
}

export interface User{
  id?: number;
  name?: string;
  email?: string;
  about?: string;
  tag_line?: string;
  parent_id?: number;
  add_by?: number;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
  role?: UserRoles;
  role_id?: number;
  children?: User[];
  parent?: User;
  members?: Members;
}

export interface Members {
  admins?: User[],
  directors?: User[],
  managers?: User[],
}

export interface TokenResponse{
  access_token?: string;
  token_type?: string;
  expires_in?: string;
  createdAt?: string;
  user?: User,
}

export enum Priority {
  'low' = 'low',
  'normal' = 'normal',
  'moderate' = 'moderate',
  'high' = 'high',
  'urgent' = 'urgent'
}

export interface AdAccount{
  id?: number;
  g_acc_id?: string;
  acc_name?: string;
  budget?: string;
  cpa?: string;
  conversion_rate?: string;
  account_director?: number;
  director_name?: string;
  account_manager?: number;
  manager_name?: string;
  add_by?: number;
  cron_time?: number;
  acc_priority?: Priority;
  created_at?: string;
  updated_at?: string;
  history?: AccountHistory[];
}

export interface  AccountHistory {
  id?: number;
  acc_id?: number;
  add_by?: number;
  changes?: HistoryChanges[];
  created_at?: string;
  updated_at?: string;
  user?: User;
}

export interface HistoryChanges {
  desc?: string;
  field?: string;
  new_value?: string;
  old_value?: string;
  filed_name?: string;
}