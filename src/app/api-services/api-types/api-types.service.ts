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

export interface User {
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
  dashboard?: DashboardData;
}

export interface DashboardData {
  accounts?: { all: number, closed: number, active: number, paused: number }
}
export interface Members {
  admins?: User[],
  directors?: User[],
  managers?: User[],
}

export interface TokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: string;
  createdAt?: string;
  user?: User,
}

export enum Priority {
  'low' = 'low',
  'normal' = 'normal',
  'high' = 'high',
  'urgent' = 'urgent'
}
export enum AccountStatus {

  'requiredSetup' = 'requiredSetup',
  'active' = 'active',
  'paused' = 'paused',
  'closed' = 'closed'
}

export interface AdAccount {
  id?: number;
  g_acc_id?: string;
  acc_name?: string;
  budget?: string;
  impressions?: string;
  click?: string;
  cpc?: string;
  conversion?: string;
  cost?: string;
  totalConversion?: string;
  cpa?: string;
  conversion_rate?: string;
  account_director?: number;
  director_name?: string;
  account_manager?: number;
  manager_name?: string;
  add_by?: number;
  cron_time?: number;
  acc_priority?: Priority;
  acc_status?: AccountStatus;
  created_at?: string;
  updated_at?: string;
  history?: { data: AccountHistory[], users: User[] };
  reason_id?: number;
  comment?: string;
  up_comments?: string,
  rating?: number,
  ascs_id?: number,
}

export interface AccountHistory {
  id?: number;
  acc_id?: number;
  add_by?: number;
  changes?: HistoryChanges[];
  created_at?: string;
  updated_at?: string;
  user?: User;
  addByName?: string;
}

export interface HistoryChanges {
  desc?: string;
  field?: string;
  new_value?: any;
  old_value?: any;
  filed_name?: string;
  newValueName?: string;
  oldValueName?: string;

}

export interface UnassignedAccounts {
  id: number
  g_acc_id: string
  acc_name: string
  budget: string
  cpa: string
  conversion_rate: string
  cron_time: string
  account_director: string
  account_manager: string
  created_at: string
  updated_at: string
  add_by: number
  acc_priority: string
  cost: string
  impressions: string
  click: string
  acc_status: string
  conversoin: string
  cpc: string
  totalConversion: string
  director_name: string
  manager_name: string
  selected: boolean
}

export interface Reasons {
  id?: number;
  title: string;
  rank: number;
  sortOrder: number;
}