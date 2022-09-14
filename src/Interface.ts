export interface IHoliday {
  _id: string;
  title?: string;
  likes?: number;
  active?: boolean;
  celebrated?: string;
}

export interface ICountry {
  _id: string;
  title: string;
  _v?: number;
}

export interface IToken {
  token?: string;
  setToken?: (param: string) => void;
  msg?: string;
}
