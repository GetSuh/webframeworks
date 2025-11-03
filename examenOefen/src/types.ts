export interface PlatformDictionary {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

export interface SteamGame {
  releaseYear: number;
  minimumAge: number;
  name: string;
  description: string;
  image: string;
  developer: string;
  platforms: PlatformDictionary;
}
