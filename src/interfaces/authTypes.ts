export interface LoginResponse {
    success: boolean;
    message: string;
    data: UserData;
}

export interface UserData {
    _id: string;
    name: string;
    jobProfile: string;
    employeeCode: string;
    email: string;
    image: string;
    token: string;
    role: string; 
}


// user dropdown
// types/userTypes.ts

export interface UserDropdownItem {
  _id: string;
  name: string;
  employeeCode: string;
}

export interface UsersDropdownResponse {
  success: boolean;
  message: string;
  result: UserDropdownItem[];
}
