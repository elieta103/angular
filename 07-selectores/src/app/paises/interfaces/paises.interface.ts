export interface Pais {
  name: Name;
  cca2: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  bjz: Bjz;
  eng: Bjz;
  spa: Bjz;
}

export interface Bjz {
  official: string;
  common:   string;
}
