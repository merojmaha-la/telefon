export type PhoneCategoryId =
  | 'flagships'
  | 'foldables'
  | 'camera'
  | 'gaming'
  | 'rugged'
  | 'compact'
  | 'midrange'
  | 'feature'
  | 'eink'
  | 'satellite';

export interface PhoneCategoryInfo {
  id: PhoneCategoryId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  typicalSpecs: string;
  idealFor: string;
  tradeOffs: string;
  image: string;
}

export interface PhoneSpecsBody {
  dimensions: string;
  heightMm: number;
  widthMm: number;
  thicknessMm: number;
  foldedDimensions?: string;
  weightGrams: number;
  materials: string;
  protection: string;
  formFactor: string;
  colors: string[];
  sim: string;
}

export interface PhoneSpecsDisplay {
  type: string;
  sizeInches: number;
  resolution: string;
  ppi: number;
  refreshRateHz: number;
  pwmHz: string;
  peakBrightnessNits: number;
  aspectRatio: string;
  glass: string;
  secondaryDisplay?: string;
}

export interface PhoneSpecsHardware {
  chipset: string;
  processNm: string;
  cpu: string;
  gpu: string;
  ramOptions: string;
  ramGbMax: number;
  storageOptions: string;
  storageType: string;
  cardSlot: string;
  cooling: string;
  benchmarkAntutu: string;
}

export interface PhoneSpecsCamera {
  main: string;
  ultrawide: string;
  telephoto: string;
  extraSensors: string;
  videoRecording: string;
  frontCamera: string;
  opticalZoom: string;
}

export interface PhoneSpecsBattery {
  capacityMah: number;
  chemistry: string;
  wiredCharging: string;
  wiredWatts: number;
  wirelessCharging: string;
  reverseCharging: string;
  removable: boolean;
  autonomyEstimate: string;
}

export interface PhoneSpecsConnectivity {
  cellular: string;
  has5G: boolean;
  satelliteSupport: string;
  wifi: string;
  bluetooth: string;
  nfc: boolean;
  esim: boolean;
  navigation: string;
  usb: string;
  audioJack35mm: boolean;
  irPort: boolean;
}

export interface PhoneSpecsAudioSensors {
  speakers: string;
  dacAndCodecs: string;
  fingerprint: string;
  faceUnlock: string;
  sensorsList: string;
}

export interface PhoneSpecsSoftware {
  osOutOfBox: string;
  osFamily: 'Android' | 'iOS' | 'RTOS / KaiOS' | 'Satellite OS';
  uiSkin: string;
  updatePolicy: string;
  specialFeatures: string[];
}

export interface PhoneDevice {
  id: string;
  brand: string;
  model: string;
  category: PhoneCategoryId;
  releaseYear: number;
  priceUsd: number;
  priceRubApprox: string;
  image: string;
  summary: string;
  specs: {
    body: PhoneSpecsBody;
    display: PhoneSpecsDisplay;
    hardware: PhoneSpecsHardware;
    camera: PhoneSpecsCamera;
    battery: PhoneSpecsBattery;
    connectivity: PhoneSpecsConnectivity;
    audioSensors: PhoneSpecsAudioSensors;
    software: PhoneSpecsSoftware;
  };
  pros: string[];
  cons: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Дисплей' | 'Процессор и память' | 'Камера' | 'Аккумулятор' | 'Защита и связь';
  shortSummary: string;
  detailedExplanation: string;
  whyItMatters: string;
}

export interface FilterState {
  search: string;
  category: PhoneCategoryId | 'all';
  osFamily: string;
  has5G: boolean;
  hasNfc: boolean;
  hasAudioJack: boolean;
  hasCardSlot: boolean;
  hasRuggedProtection: boolean;
  minBatteryMah: number;
  sortBy: 'featured' | 'priceAsc' | 'priceDesc' | 'batteryDesc' | 'weightAsc' | 'screenDesc';
}
