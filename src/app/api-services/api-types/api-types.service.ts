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

export interface Profile {
  id?: number
  profile_name: string,
  profile_id?: number,
  username?: string,
  password: string
}

export interface Client {
  id?: number,
  client_name?: string,
  email?: string,
  skype?: string,
  phone?: number
}

export interface Project {
  id?: number,
  project_name: string,
  contract_start_date: any,
  hourly_rate: string,
  weekly_limit: string,
  questionnaire: any,
  sales_person: number,
  profile: number,
  client: number,
  client_name?: string,
  email?: string,
  skype?: string,
  phone?: number,
  comment?: string,
  items?: Items[]


}

export interface Items {
  acc_name: string,
  g_acc_id: string,
}


export interface Stages {
  id?: number,
  g_acc_id?: string,
  acc_name?: string,
  acc_status?: string,
  project_id?: string,
  director_name?: string,
  manager_name?: string,
  project_name?: string,
  stage_id?: boolean,
  keywords?: boolean,
  adcopies?: boolean,
  peer_review?: boolean,
  client_keyad_review?: boolean,
  campaign_setup?: boolean,
  client_review?: boolean,
  conversion_tracking?: boolean,
  google_analytics?: string
  gtm?: boolean,
  keywords_url?: string,
  keywords_by?: number,
  keywords_on?: string,
  keywords_score?: string,
  adcopies_url?: string,
  adcopies_by?: number,
  adcopies_on?: string,
  adcopies_score?: string,
  peer_review_by?: number,
  peer_review_on?: string,
  client_keyad_review_by?: number,
  client_keyad_review_on?: string,
  campaign_setup_by?: string,
  campaign_setup_on?: string,
  client_review_confirmed_by?: number,
  client_review_confirmed_on?: string,
  conversion_tracking_by?: string,
  conversion_tracking_on?: string,
  google_analytics_by?: string,
  google_analytics_on?: string,
  gtm_by?: number,
  gtm_on?: string,
  keywords_user_name?: string,
  adcopies_user_name?: string,
  client_keyad_user_name?: string,
  peer_review_user_name?: string,
  campaign_setup_user_name?: string,
  client_review_user_name?: string,
  conversion_tracking_user_name?: string,
  google_analytics_user_name?: string,
  gtm_user_name?: string,
  comment?: string
  acc_id?: number
}