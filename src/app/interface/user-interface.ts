export interface UserInterface {
    status?:string;
  id?:number;
  email?:string;
  email_verified_at?:string;
  created_at?:string;
  updated_at?:string;
  permissions?:any[];
  token?:string;
  user_type?: string;
  task_count?: number;
}
