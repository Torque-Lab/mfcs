

export interface VillageData {


  state_name: string;
  state_code: number;
  district_name: string;
  district_code: number;
  sub_district_name: string;
  sub_district_code: number;
  block_name: string;
  block_code: number;
  gp_name: string;
  gp_code: number;
  village_name: string;
  village_code: number;
  village_pincode: number;
  pc_code: number;
  ac_code: number;


  population: number;
  male: number;
  female: number;
  households: number;
  farm_households: number;
  non_farm_households: number;

  
  // Agriculture
  seed_centres: number;
  watershed_project: number;
  rainwater_harvesting: number;
  farmers_collective: number;
  grain_warehouse: number;
  primary_processing: number;
  custom_hiring_centre: number;
  cultivable_area_ha: number;
  sown_area_ha: number;
  soil_testing: number;
  fertilizer_shop: number;
  irrigation_source: string;
  drip_farmers: number;
  irrigated_area_ha: number;
  unirrigated_area_ha: number;


  livestock_extension: number;
  milk_centre: number;
  poultry_project: number;
  goatery_project: number;
  pigery_project: number;
  veterinary: number;
  fishery_ponds: number;
  pisciculture: number;
  aquaculture_extension: number;

 
  kuccha_households: number;
  pmay_households: number;
  housing_waitlist: number;
  state_housing_benefits: number;
  state_housing_waitlist: number;


  piped_water: number;
  all_weather_road: number;
  pucca_roads: number;
  public_transport: number;
  railway_station: number;
  electricity: number;

  saubhagya_households: number;
  msme_electricity: number;
  renewable_electricity: number;
  solar_wind_households: number;

 
  panchayat_bhawan: number;
  csc: number;
  public_info_board: number;
  common_pastures: number;
  ujjwala_households: number;

  public_library: number;
  recreation: number;

  
  banks: number;
  bc_internet: number;
  atm: number;
  jan_dhan_households: number;
  post_office: number;
  telephone: number;
  internet: number;
  pds: number;
  bpl_ration_households: number;
  primary_school: number;
  middle_school: number;
  high_school: number;
  higher_secondary: number;
  school_nonattendance: number;
  degree_college: number;
  graduates: number;
  vocational_training: number;
  skill_training: number;

 
  market: number;
  health_centre: number;
  jan_aushadhi: number;
  health_insurance: number;

  drainage: number;
  waste_disposal: number;
  clean_energy_households: number;
  biogas_recycling: number;
  anganwadi: number;
  anganwadi_early_education: number;

  children_0_3: number;
  anganwadi_children_0_3: number;
  anganwadi_children_3_6: number;

  immunized_0_3: number;
  non_stunted_children: number;
  anaemic_pregnant: number;
  anaemic_girls: number;
  underweight_children: number;
  male_children_0_6: number;
  female_children_0_6: number;
  scholarship_children: number;
  bank_loan_households: number;
  disabled_beneficiaries: number;
  large_families: number;
  mother_child_health: number;
  pension_households: number;


  shg_count: number;
  shg_households: number;
  shg_vos: number;
  pg_households: number;
  shg_bank_access: number;

  beekeeping: number;
  sericulture: number;
  handloom: number;
  handicrafts: number;

  community_forest: number;
  minor_forest: number;
  minor_forest_households: number;

  cottage_units: number;
  cottage_households: number;
  adult_education_centre: number;


  anganwadi_registered: number;
  icds_immunized_0_6: number;

  pregnant_women: number;
  icds_pregnant: number;

  lactating_mothers: number;
  icds_lactating: number;

  hospital_deliveries: number;
  icds_children: number;
  young_anaemic_children: number;

  newborns: number;
  underweight_newborns: number;
  no_latrine_households: number;

  pmmvy_eligible: number;
  pmmvy_beneficiaries: number;

  health_scheme_eligible: number;
  health_scheme_beneficiaries: number;

  nfsa_eligible: number;
  nfsa_foodgrain_households: number;

 
  pmkpy_farmers: number;
  pmkpy_18_40: number;

  farmers: number;
  pmfby_farmers: number;
  organic_farmers: number;
  soil_testing_report_farmers: number;


  elected_representatives: number;
  rgsa_oriented: number;
  rgsa_refresher_training: number;

  labour_budget: number;
  nrm_expenditure: number;

  irrigation_covered_ha: number;
  piped_water_households: number;

 
  latitude: number;
  longitude: number;
}


export type VDIData = Pick<
	VillageData,
	| "primary_school"
	| "middle_school"
	| "high_school"
	| "anganwadi_early_education"
	| "health_centre"
	| "jan_aushadhi"
	| "health_insurance"
	| "electricity"
	| "all_weather_road"
	| "piped_water"
	| "drainage"
	| "internet"
	| "banks"
	| "atm"
	| "jan_dhan_households"
	| "pmay_households"
	| "kuccha_households"
	| "bpl_ration_households"
	| "irrigated_area_ha"
	| "farmers_collective"
	| "fertilizer_shop"
	| "all_weather_road"
	| "pucca_roads"
  
>;


type ConnectivityData = Pick<
	VillageData,
	| "all_weather_road"
	| "pucca_roads"
	| "railway_station"
	| "public_transport"
	| "internet"
	| "telephone"
	| "csc"
	| "bc_internet"
>;

type EconomicData = Pick<
	VillageData,
	| "banks"
	| "atm"
	| "farmers_collective"
	| "grain_warehouse"
	| "cottage_units"
	| "non_farm_households"
	| "shg_count"
>;

type AgriculturePotentialData = Pick<
	VillageData,
	| "cultivable_area_ha"
	| "sown_area_ha"
	| "irrigated_area_ha"
	| "farmers"
	| "irrigation_covered_ha"
	| "watershed_project"
>;

type AgricultureSupportData = Pick<
	VillageData,
	| "grain_warehouse"
	| "soil_testing"
	| "fertilizer_shop"
	| "farmers_collective"
	| "custom_hiring_centre"
	| "drip_farmers"
>;

type DigitalData = Pick<
	VillageData,
	| "internet"
	| "telephone"
	| "csc"
	| "bc_internet"
>;

type FinancialData = Pick<
	VillageData,
	| "banks"
	| "atm"
	| "jan_dhan_households"
	| "post_office"
>;


type EconomicActivityData = Pick<
	VillageData,
	| "non_farm_households"
	| "cottage_units"
	| "cottage_households"
	| "market"
	| "farmers_collective"
>;

type HealthcareData = Pick<
	VillageData,
	| "health_centre"
	| "jan_aushadhi"
	| "health_insurance"
	| "hospital_deliveries"
	| "immunized_0_3"
	| "anganwadi"
>;

type VulnerabilityData = Pick<
	VillageData,
	| "underweight_children"
	| "anaemic_pregnant"
	| "anaemic_girls"
	| "school_nonattendance"
	| "no_latrine_households"
>;
