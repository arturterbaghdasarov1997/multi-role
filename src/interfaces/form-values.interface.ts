export interface WorkingDay {
    index: number,
    day: string;
    startHours: string;
    endHours: string;
}
  
export interface Address {
  lat: string;
  lng: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}


export interface FormValues {
  firstName: string;
  lastName: string;
  pid: string;
  phoneNumber: string;
  email: string;
  password: string;
  profileImage?: FileList;
  address: Address;
  vehicle?: string;
  workingDays: WorkingDay[];
}